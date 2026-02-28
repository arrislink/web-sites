import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import WeChat from "@/lib/auth/wechat"
import QQ from "@/lib/auth/qq"
import { pool } from "@/lib/db"
import { RowDataPacket } from "mysql2"
import bcrypt from "bcryptjs"
import { verifyCode } from "@/lib/sms"

export const config: NextAuthConfig = {
    providers: [
        // Global providers
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        // China providers
        WeChat({
            clientId: process.env.WECHAT_APP_ID!,
            clientSecret: process.env.WECHAT_APP_SECRET!,
        }),
        QQ({
            clientId: process.env.QQ_APP_ID!,
            clientSecret: process.env.QQ_APP_KEY!,
        }),
        // Credentials (email/password or phone/code)
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Email / Phone", type: "text" },
                password: { label: "Password / Code", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials?.username || !credentials?.password) return null;

                const username = credentials.username as string;
                const password = credentials.password as string;

                // Check if it's email or phone
                const isEmail = username.includes('@');

                if (isEmail) {
                    // Email + password login
                    const [rows] = await pool.query<RowDataPacket[]>(
                        "SELECT id, email, name, password_hash, avatar_url FROM users WHERE email = ?",
                        [username]
                    );

                    if (rows.length === 0) return null;

                    const user = rows[0];
                    if (!user.password_hash) return null;

                    const isValid = await bcrypt.compare(password, user.password_hash);
                    if (!isValid) return null;

                    return {
                        id: user.id.toString(),
                        name: user.name || username,
                        email: user.email,
                        image: user.avatar_url,
                    };
                } else {
                    // Phone + SMS code login
                    if (!verifyCode(username, password)) return null;

                    const [rows] = await pool.query<RowDataPacket[]>(
                        "SELECT id, phone, name, avatar_url FROM users WHERE phone = ?",
                        [username]
                    );

                    if (rows.length === 0) return null;

                    const user = rows[0];
                    return {
                        id: user.id.toString(),
                        name: user.name || username,
                        email: null,
                        image: user.avatar_url,
                    };
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Only upsert for OAuth. For credentials, authorize happens before this.
            // But this callback runs for all.
            // If credentials, user.email might be null if phone login.

            if (account?.provider === 'credentials') {
                return true;
            }

            if (!user.email) return false

            try {
                // Check if user exists
                const [rows] = await pool.query<RowDataPacket[]>(
                    'SELECT * FROM users WHERE email = ?',
                    [user.email]
                )

                if (rows.length === 0) {
                    // Create new user
                    await pool.query(
                        'INSERT INTO users (email, name, auth_provider, auth_id, avatar_url, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
                        [user.email, user.name, account?.provider, account?.providerAccountId, user.image]
                    )
                } else {
                    // Update existing user (e.g. image, name if changed)
                    await pool.query(
                        'UPDATE users SET name = ?, avatar_url = ?, auth_provider = ?, auth_id = ?, updated_at = NOW() WHERE email = ?',
                        [user.name, user.image, account?.provider, account?.providerAccountId, user.email]
                    )
                }
                return true
            } catch (error) {
                console.error('Error saving user to database:', error)
                return false
            }
        },
        async session({ session, token, user }) {
            // For JWT strategy (default), user is in token?
            // NextAuth v5 defaults to jwt.
            if (session.user) {
                if (session.user.email) {
                    const [rows] = await pool.query<RowDataPacket[]>(
                        'SELECT id, region FROM users WHERE email = ?',
                        [session.user.email]
                    )

                    if (rows.length > 0) {
                        const dbUser = rows[0]
                        // session.user.id = dbUser.id // Type error potential, usually allowed
                        // session.user.role = dbUser.role
                        // session.user.region = dbUser.region
                        Object.assign(session.user, {
                            id: dbUser.id,
                            region: dbUser.region
                        })
                    }
                }
            }
            return session
        },
        async jwt({ token, user }) {
            return token;
        }
    },
    pages: {
        signIn: '/login', // Custom login page
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)

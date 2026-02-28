"use server";

import { pool } from "@/lib/db";
import { sendSmsCode, verifyCode } from "@/lib/sms";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export interface ActionResult {
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Register with email and password (Global region)
 */
export async function registerWithEmail(formData: FormData): Promise<ActionResult> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation
    if (!email || !password || !confirmPassword) {
        return { success: false, error: "All fields are required" };
    }

    if (password !== confirmPassword) {
        return { success: false, error: "Passwords do not match" };
    }

    if (password.length < 8) {
        return { success: false, error: "Password must be at least 8 characters" };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: "Invalid email format" };
    }

    try {
        // Check if user already exists
        const [existing] = await pool.query<RowDataPacket[]>(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return { success: false, error: "Email already registered" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        await pool.query(
            `INSERT INTO users (email, password_hash, auth_provider, region, created_at) 
             VALUES (?, ?, 'email', 'Global', NOW())`,
            [email, hashedPassword]
        );

        return { success: true, message: "Account created successfully" };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: "Registration failed. Please try again." };
    }
}

/**
 * Send SMS verification code (CN region)
 */
export async function sendPhoneCode(formData: FormData): Promise<ActionResult> {
    const phone = formData.get("phone") as string;

    if (!phone) {
        return { success: false, error: "Phone number is required" };
    }

    // China phone number validation
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return { success: false, error: "Invalid phone number format" };
    }

    const result = await sendSmsCode(phone);

    if (result.success) {
        return { success: true, message: "Verification code sent" };
    } else {
        return { success: false, error: result.error || "Failed to send code" };
    }
}

/**
 * Register with phone and SMS code (CN region)
 */
export async function registerWithPhone(formData: FormData): Promise<ActionResult> {
    const phone = formData.get("phone") as string;
    const code = formData.get("code") as string;

    if (!phone || !code) {
        return { success: false, error: "Phone and verification code are required" };
    }

    // Verify SMS code
    if (!verifyCode(phone, code)) {
        return { success: false, error: "Invalid or expired verification code" };
    }

    try {
        // Check if user already exists
        const [existing] = await pool.query<RowDataPacket[]>(
            "SELECT id FROM users WHERE phone = ?",
            [phone]
        );

        if (existing.length > 0) {
            return { success: false, error: "Phone number already registered" };
        }

        // Create user
        await pool.query(
            `INSERT INTO users (phone, auth_provider, region, created_at) 
             VALUES (?, 'phone', 'CN', NOW())`,
            [phone]
        );

        return { success: true, message: "Account created successfully" };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: "Registration failed. Please try again." };
    }
}

/**
 * Login with email and password
 */
export async function loginWithEmail(formData: FormData): Promise<ActionResult> {
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { success: false, error: "Email and password are required" };
    }

    try {
        // Find user
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT id, password_hash FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return { success: false, error: "Invalid email or password" };
        }

        const user = rows[0];

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return { success: false, error: "Invalid email or password" };
        }

        // Sign in via NextAuth credentials
        await signIn("credentials", { username: email, password, redirect: false });

        return { success: true, message: "Login successful" };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Login failed. Please try again." };
    }
}

/**
 * Login with phone and SMS code
 */
export async function loginWithPhone(formData: FormData): Promise<ActionResult> {
    const phone = formData.get("username") as string;
    const code = formData.get("password") as string;

    if (!phone || !code) {
        return { success: false, error: "Phone and verification code are required" };
    }

    // Verify SMS code
    if (!verifyCode(phone, code)) {
        return { success: false, error: "Invalid or expired verification code" };
    }

    try {
        // Find user
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT id FROM users WHERE phone = ?",
            [phone]
        );

        if (rows.length === 0) {
            return { success: false, error: "Phone number not registered" };
        }

        // Sign in via NextAuth credentials
        await signIn("credentials", { username: phone, password: code, redirect: false });

        return { success: true, message: "Login successful" };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Login failed. Please try again." };
    }
}

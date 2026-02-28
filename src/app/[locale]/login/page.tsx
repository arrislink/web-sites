import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { signIn } from "@/auth";
import { cookies } from "next/headers";
import { MessageSquare, Mail, Phone, Github, Globe, User } from "lucide-react";

export default async function LoginPage() {
    const t = await getTranslations("login");
    const cookieStore = await cookies();
    const region = cookieStore.get("NEXT_REGION")?.value || "Global";

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-white tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    {/* --- CHINA REGION --- */}
                    {region === 'CN' ? (
                        <>
                            {/* 1. WeChat */}
                            <form
                                action={async () => {
                                    "use server";
                                    // await signIn("wechat");
                                }}
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#07C160] hover:bg-[#06ad56] transition-all transform hover:scale-[1.01] shadow-lg shadow-[#07C160]/20">
                                    <MessageSquare className="h-5 w-5" />
                                    {t("wechat") || "微信登录"}
                                </button>
                            </form>

                            {/* 2. QQ (Mock) */}
                            <form
                                action={async () => {
                                    "use server";
                                    // await signIn("qq");
                                }}
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#12B7F5] hover:bg-[#10a1d6] transition-all transform hover:scale-[1.01] shadow-lg shadow-[#12B7F5]/20">
                                    {/* Simple QQ icon representation */}
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10 0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-2.761 0-5 2.239-5 5 0 2.228 1.459 4.108 3.5 4.766V16c0 .552.448 1 1 1h1c.552 0 1-.448 1-1v-1.234c2.041-.658 3.5-2.538 3.5-4.766 0-2.761-2.239-5-5-5z" />
                                    </svg>
                                    QQ 登录
                                </button>
                            </form>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#0f172a] text-gray-500">
                                        {t("separator") || "或"}
                                    </span>
                                </div>
                            </div>

                            {/* 3. Phone Login (Credentials) */}
                            <form
                                action={async (formData) => {
                                    "use server";
                                    await signIn("credentials", formData);
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone</label>
                                    <input
                                        id="phone"
                                        name="username"
                                        type="tel"
                                        autoComplete="tel"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder="手机号码"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="code" className="sr-only">Code</label>
                                    <input
                                        id="code"
                                        name="password"
                                        type="text"
                                        autoComplete="one-time-code"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder="验证码"
                                    />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                                    <Phone className="h-5 w-5" />
                                    {t("phoneLogin")}
                                </button>
                            </form>
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {t("noAccount")}{" "}
                                <Link href="/register" className="text-brand-accent hover:underline">
                                    {t("register")}
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* --- GLOBAL REGION --- */}
                            {/* 1. Google */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("google", { redirectTo: "/user/profile" });
                                }}
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    {t("google")}
                                </button>
                            </form>

                            {/* 2. GitHub */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("github", { redirectTo: "/user/profile" });
                                }}
                                className="mt-4"
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-[#24292e] hover:bg-[#2b3137] transition-colors">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    {t("github")}
                                </button>
                            </form>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#0f172a] text-gray-500">
                                        {t("separator")}
                                    </span>
                                </div>
                            </div>

                            {/* 3. Email (Credentials) */}
                            <form
                                action={async (formData) => {
                                    "use server";
                                    await signIn("credentials", formData);
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        name="username"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                                    <Mail className="h-5 w-5" />
                                    {t("email")}
                                </button>
                            </form>
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {t("noAccount")}{" "}
                                <Link href="/register" className="text-brand-accent hover:underline">
                                    {t("register")}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

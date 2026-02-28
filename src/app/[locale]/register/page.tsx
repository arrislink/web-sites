import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { signIn } from "@/auth";
import { cookies } from "next/headers";
import { MessageSquare, Phone, UserPlus } from "lucide-react";
import { registerWithEmail, registerWithPhone, sendPhoneCode } from "./actions";

export default async function RegisterPage() {
    const t = await getTranslations("register");
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
                            {/* WeChat Registration */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("wechat", { redirectTo: "/user/profile" });
                                }}
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#07C160] hover:bg-[#06ad56] transition-all transform hover:scale-[1.01] shadow-lg shadow-[#07C160]/20">
                                    <MessageSquare className="h-5 w-5" />
                                    {t("wechat")}
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

                            {/* Phone Registration */}
                            <form
                                action={async (formData: FormData) => {
                                    "use server";
                                    const result = await registerWithPhone(formData);
                                    // Result handling would be done via redirect or rerender
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder={t("phonePlaceholder")}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        autoComplete="one-time-code"
                                        required
                                        className="appearance-none rounded-lg relative block flex-1 px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder={t("codePlaceholder")}
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-3 border border-brand-accent/50 text-sm font-medium rounded-lg text-brand-accent bg-transparent hover:bg-brand-accent/10 transition-colors whitespace-nowrap"
                                    >
                                        {t("sendCode")}
                                    </button>
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-brand-dark bg-brand-accent hover:bg-brand-accent/90 transition-all transform hover:scale-[1.01]">
                                    <Phone className="h-5 w-5" />
                                    {t("registerWithPhone")}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            {/* --- GLOBAL REGION --- */}
                            {/* OAuth Buttons */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("google", { redirectTo: "/user/profile" });
                                }}
                            >
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 text-sm font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    {t("google")}
                                </button>
                            </form>

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

                            {/* Email Registration */}
                            <form
                                action={async (formData: FormData) => {
                                    "use server";
                                    const result = await registerWithEmail(formData);
                                    // Result handling would be done via redirect or rerender
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder={t("emailPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder={t("passwordPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm transition-colors"
                                        placeholder={t("confirmPasswordPlaceholder")}
                                    />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-brand-dark bg-brand-accent hover:bg-brand-accent/90 transition-all transform hover:scale-[1.01]">
                                    <UserPlus className="h-5 w-5" />
                                    {t("registerWithEmail")}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

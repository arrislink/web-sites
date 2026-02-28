"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { RegionSwitcher } from "./RegionSwitcher";


export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();

    const feedbackHref =
        locale === "zh"
            ? "/contact?interest=feedback&subject=%E7%BD%91%E7%AB%99%E9%97%AE%E9%A2%98%E5%8F%8D%E9%A6%88"
            : "/contact?interest=feedback&subject=Website%20feedback";

    const navItems = [
        { name: t("services"), href: "/solutions" },
        { name: t("products"), href: "/products" },
        { name: t("caseStudies"), href: "/case-studies" },
        { name: t("pricing"), href: "/pricing" },
        { name: t("about"), href: "/about" },
        { name: t("feedback"), href: feedbackHref },
    ];

    // Helper to check if nav item is active
    const isActive = (href: string) => {
        if (pathname === href) return true;
        if (pathname.startsWith(href) && href !== '/') return true;
        return false;
    };

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="relative h-8 w-8">
                                <Image src="/logo-icon.png" alt="Logo" fill sizes="32px" className="object-contain" />
                            </div>
                            <span className="text-white font-bold text-lg hidden sm:block tracking-wide">
                                {locale === "zh" ? "微棱信息" : "Arrislink"}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-brand-accent' : 'text-gray-300 hover:text-brand-accent'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <RegionSwitcher />

                            <Link
                                href="/contact"
                                className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                            >
                                {t("contact")}
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass-panel border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <div key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}

                        <div className="px-3 py-2 border-t border-white/10 mt-2">
                            <RegionSwitcher />
                        </div>

                        <Link
                            href="/contact"
                            className="text-brand-accent block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {t("contact")}
                        </Link>

                        <Link
                            href={feedbackHref}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {t("feedback")}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

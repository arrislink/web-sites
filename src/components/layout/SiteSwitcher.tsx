"use client";

import { useTransition } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export function SiteSwitcher({ currentRegion }: { currentRegion: "CN" | "Global" }) {
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();

    // Toggle Logic:
    // If currently Global (EN), switch to CN (ZH).
    // If currently CN (ZH), switch to Global (EN).
    // Note: User can technically be in Global (ZH) or CN (EN) if we allowed independent switching,
    // but the requirement is to simplify.

    // Target state
    const isGlobal = currentRegion === "Global";
    const targetRegion = isGlobal ? "CN" : "Global";
    const targetLocale = isGlobal ? "zh" : "en"; // CN uses ZH, Global uses EN by default

    function toggleSite() {
        // Set Cookies
        document.cookie = `NEXT_REGION=${targetRegion}; path=/; max-age=31536000; SameSite=Lax`;
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

        startTransition(() => {
            // We need to switch path to target locale
            // navigation.Link handles this automatically if we render a Link, 
            // but here we are doing a manual transition to sync both state + route.
            // Using `router.push` with the NEW locale prefix.
            // But `usePathname` from `next-intl` returns path WITHOUT locale.
            // So we construct the new URL.

            // Actually, simply refreshing might not update the URL if middleware doesn't enforce standard pairing.
            // Better to just Redirect to the target locale version.

            // Simplest way: use window.location to force full reload and middleware check?
            // Or just router.replace(`/${targetLocale}${pathname}`);

            // Let's use router.refresh() if middleware handles it, BUT middleware checks cookie.
            // Is middleware set up to redirect /en to /zh if Region is CN? Not strictly.
            // So we should explicit navigate.

            router.replace(`/${targetLocale}${pathname}`);
            router.refresh();
        });
    }

    return (
        <button
            onClick={toggleSite}
            disabled={isPending}
            className="flex items-center gap-2 text-gray-300 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
            title={isGlobal ? "Switch to China Site" : "Switch to Global Site"}
        >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
                {isGlobal ? "Global / EN" : "中国 / 中文"}
            </span>
            <span className="sm:hidden">
                {isGlobal ? "EN" : "CN"}
            </span>
        </button>
    );
}

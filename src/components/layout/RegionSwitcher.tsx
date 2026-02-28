"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

interface RegionOption {
    region: "CN" | "Global";
    locale: "zh" | "en";
    label: string;
    flag: string;
}

export function RegionSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<"CN" | "Global">("Global");
    const [isMounted, setIsMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const options: RegionOption[] = [
        { region: "Global", locale: "en", label: "Global / English", flag: "🌐" },
        { region: "CN", locale: "zh", label: "中国 / 中文", flag: "🇨🇳" },
    ];

    useEffect(() => {
        setIsMounted(true);
        // Read region from cookie on mount
        const match = document.cookie.match(new RegExp('(^| )NEXT_REGION=([^;]+)'));
        if (match && match[2] === 'CN') {
            setCurrentRegion('CN');
        }
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: RegionOption) => {
        // Set region cookie (expires in 1 year)
        document.cookie = `NEXT_REGION=${option.region}; path=/; max-age=31536000; SameSite=Lax`;
        setCurrentRegion(option.region);
        setIsOpen(false);

        // Navigate to the same path but with new locale
        router.push(pathname, { locale: option.locale });
    };

    const currentOption = options.find(o => o.region === currentRegion) || options[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors min-w-[120px]"
            >
                <Globe className="w-4 h-4" />
                {isMounted ? (
                    <>
                        <span className="hidden sm:inline">{currentOption.label}</span>
                        <span className="sm:hidden">{currentOption.flag}</span>
                    </>
                ) : (
                    <span className="hidden sm:inline">Loading...</span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-dark border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    {options.map((option) => (
                        <button
                            key={option.region}
                            onClick={() => handleSelect(option)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${currentRegion === option.region
                                    ? "bg-brand-accent/10 text-brand-accent"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">{option.flag}</span>
                            <span className="flex-1 text-left">{option.label}</span>
                            {currentRegion === option.region && (
                                <Check className="w-4 h-4 text-brand-accent" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


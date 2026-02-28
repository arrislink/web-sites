"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function InteractiveBookPreview() {
    const t = useTranslations("kidStoryPage.preview");
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Story 1: Space Adventure content
    const PAGES = [
        {
            id: 1,
            title: "太空历险记 / Space Adventure",
            content: "小明穿着他的蓝色宇航服，站在发射台上向爸爸妈妈挥手告别。今天是他第一次去太空探险的日子！火箭已经准备好了，闪烁着七彩的光芒。",
            image: "/images/stories/story1-page1.png"
        },
        {
            id: 2,
            title: "飞向星星 / To the Stars",
            content: "火箭升空啦！小明漂浮在这个五颜六色的驾驶舱里。透过圆圆的窗户，他看到了美丽的地球变得越来越小，周围是无数闪亮的星星。",
            image: "/images/stories/story1-page2.png"
        },
        {
            id: 3,
            title: "新朋友 / New Friends",
            content: "飞船降落在了一个彩色的星球上。小明刚走出来，就遇到了一群可爱的小外星人。他们有大大的眼睛，正在开心地欢迎这位来自地球的小客人。",
            image: "/images/stories/story1-page3.png"
        },
        {
            id: 4,
            title: "神秘的礼物 / The Surprise",
            content: "（需开通体验查看完整故事...）",
            image: "/images/kid-story-hero-zh.png" // Placeholder
        }
    ];

    const showLoginGate = currentPage === 3;

    const nextPage = () => {
        if (currentPage < PAGES.length - 1) {
            setIsFlipped(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setIsFlipped(false);
            }, 300);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setIsFlipped(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev - 1);
                setIsFlipped(false);
            }, 300);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto perspective-1000">
            <div className="bg-[#1a1f2e] border border-white/10 rounded-xl p-4 md:p-8 shadow-2xl relative">
                {/* Book Container */}
                <div className={`relative bg-[#fff9f0] rounded-lg shadow-inner min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row overflow-hidden transition-all duration-300 ${isFlipped ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>

                    {showLoginGate ? (
                        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                            <Lock className="w-16 h-16 text-brand-accent mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4">{t("gateTitle")}</h3>
                            <p className="text-gray-300 mb-8 max-w-md">{t("gateDesc")}</p>
                            <div className="flex gap-4">
                                <Link href="/contact?interest=general&subject=%E7%BB%98%E6%9C%AC%E4%BD%93%E9%AA%8C%E7%94%B3%E8%AF%B7" className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-brand-accent/90 transition-colors">
                                    {t("gateCta")}
                                </Link>
                                <button onClick={prevPage} className="text-white/70 hover:text-white underline">
                                    {t("gateBack")}
                                </button>
                            </div>
                        </div>
                    ) : null}

                    {/* Left Page (Text) */}
                    <div className={`flex-1 p-8 border-r border-gray-200 flex flex-col justify-center relative ${showLoginGate ? 'filter blur-sm' : ''}`}>
                        <div className="absolute top-4 left-4 text-gray-300 font-serif text-4xl opacity-20">
                            {currentPage + 1}
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-gray-800 mb-6 font-bold">
                            {PAGES[currentPage].title}
                        </h3>
                        <p className="font-serif text-lg text-gray-600 leading-relaxed">
                            {PAGES[currentPage].content}
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-brand-accent text-sm font-medium">
                            <BookOpen className="w-4 h-4" />
                            <span>AI 朗读 (Coming Soon)</span>
                        </div>
                    </div>

                    {/* Right Page (Illustration) */}
                    <div className={`flex-1 relative bg-gray-100 ${showLoginGate ? 'filter blur-sm' : ''}`}>
                        <Image
                            src={PAGES[currentPage].image}
                            alt={PAGES[currentPage].title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Spine Highlight */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-gray-400/20 to-transparent pointer-events-none hidden md:block" />
                </div>

                {/* Controls */}
                <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
                    <button
                        onClick={nextPage}
                        disabled={currentPage === PAGES.length - 1 && !showLoginGate}
                        className={`p-3 backdrop-blur-sm rounded-full text-white transition-all ${showLoginGate ? 'bg-brand-accent/20 cursor-not-allowed' : 'bg-brand-accent hover:bg-brand-accent/90 shadow-[0_0_15px_rgba(56,189,248,0.5)]'}`}
                    >
                        {showLoginGate ? <Lock className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {PAGES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

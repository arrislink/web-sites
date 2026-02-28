"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, User, Calendar, MapPin, Clock, ImageIcon, Languages, Sparkles } from "lucide-react";

// Bio-Prism Preview Component - Shows biography multimedia features
export function BioPrismPreview() {
    const [activeTab, setActiveTab] = useState<"story" | "timeline" | "photos">("story");
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Sample biography book pages
    const pages = [
        {
            id: 1,
            chapter: "Chapter 1",
            title: { en: "Where It All Began", zh: "一切的起点" },
            content: {
                en: "Born in a small village nestled between misty mountains, Grandfather Zhang grew up surrounded by the songs of birds and the whispers of ancient bamboo forests.",
                zh: "外公出生在一个被薄雾缭绕的群山环抱的小村庄里，伴着鸟鸣和古老竹林的低语长大。"
            },
            year: "1945",
            location: "Zhejiang"
        },
        {
            id: 2,
            chapter: "Chapter 2",
            title: { en: "Years of Learning", zh: "求学岁月" },
            content: {
                en: "At sixteen, he walked three hours each day to attend the county school. His worn leather bag held only two books, but his dreams were boundless.",
                zh: "十六岁那年，他每天步行三小时去县城上学。破旧的皮书包里只有两本书，但他的梦想却无边无际。"
            },
            year: "1961",
            location: "Hangzhou"
        },
        {
            id: 3,
            chapter: "Chapter 3",
            title: { en: "A Lifetime Together", zh: "相伴一生" },
            content: {
                en: "He met Grandmother under the old camphor tree. Fifty years later, they still hold hands on evening walks.",
                zh: "他在老樟树下遇见了外婆。五十年后，他们依然在傍晚的散步中牵着手。"
            },
            year: "1970",
            location: "Shanghai"
        }
    ];

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
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

    const tabs = [
        { id: "story" as const, label: "双语故事", icon: Languages },
        { id: "timeline" as const, label: "时间轴", icon: Clock },
        { id: "photos" as const, label: "照片修复", icon: ImageIcon },
    ];

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 p-4 bg-gray-100 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-brand-accent text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {/* Story Tab */}
                {activeTab === "story" && (
                    <div className="h-full flex items-center justify-center p-6">
                        <div className="w-full max-w-2xl relative">
                            <div className={`bg-[#faf8f5] rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isFlipped ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white/50">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {pages[currentPage].year}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {pages[currentPage].location}
                                        </span>
                                    </div>
                                    <span className="text-xs text-brand-accent font-medium bg-brand-accent/10 px-2 py-1 rounded">
                                        {pages[currentPage].chapter}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-2xl text-gray-900 font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-en)' }}>
                                            {pages[currentPage].title.en}
                                        </h3>
                                        <h4 className="text-lg text-gray-500" style={{ fontFamily: 'var(--font-serif-zh)' }}>
                                            {pages[currentPage].title.zh}
                                        </h4>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-serif-en)' }}>
                                            {pages[currentPage].content.en}
                                        </p>
                                        <p className="text-gray-600 leading-loose" style={{ fontFamily: 'var(--font-serif-zh)' }}>
                                            {pages[currentPage].content.zh}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-white/30">
                                    <span className="text-xs text-gray-400">Grandpa Zhang's Story</span>
                                    <span className="text-xs text-gray-400">Page {currentPage + 1} / {pages.length}</span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 0}
                                className="absolute top-1/2 -left-12 -translate-y-1/2 p-2 bg-white shadow-lg rounded-full disabled:opacity-30"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === pages.length - 1}
                                className="absolute top-1/2 -right-12 -translate-y-1/2 p-2 bg-brand-accent shadow-lg rounded-full disabled:opacity-30"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Timeline Tab */}
                {activeTab === "timeline" && (
                    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-medium mb-2">
                                <Sparkles className="w-4 h-4" />
                                AI 自动生成
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">人生时间轴</h3>
                        </div>
                        <div className="relative w-full max-w-xl rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                            <Image
                                src="/images/bio-prism-timeline.png"
                                alt="AI Generated Timeline"
                                width={600}
                                height={350}
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
                            根据访谈内容，AI 自动提取关键事件并生成可视化时间轴
                        </p>
                    </div>
                )}

                {/* Photos Tab */}
                {activeTab === "photos" && (
                    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
                        <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium mb-2">
                                <ImageIcon className="w-4 h-4" />
                                老照片修复
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">修复与增强对比</h3>
                        </div>
                        <div className="relative w-full max-w-xl rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                            <Image
                                src="/images/bio-prism-restored-photo.png"
                                alt="Photo Restoration Comparison"
                                width={600}
                                height={350}
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
                            AI 智能修复老旧照片：去除划痕、增强清晰度、自然上色
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

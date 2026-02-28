"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { STORY_DATA, StoryId } from "@/data/kidStories";

interface Story {
    id: StoryId;
    image: string;
    title: string;
}

export function StoryGallery() {
    const t = useTranslations("kidStoryPage.gallery");
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    const stories: Story[] = Object.keys(STORY_DATA).map(id => {
        const story = STORY_DATA[id as StoryId];
        return {
            id: id as StoryId,
            image: story.pages[0].image,
            title: story.title.zh // Default to zh for this component
        };
    });

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedStory(item)}
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-end pb-8">
                            <h3 className="text-white font-bold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-center px-4">
                                {item.title}
                            </h3>
                            <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> {t("read")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Detail Modal */}
            {selectedStory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row">
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                            <Image
                                src={selectedStory.image}
                                alt={selectedStory.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-white mb-4">{selectedStory.title}</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                {t("modalDesc", { defaultMessage: "This is a generated story showcasing our AI capabilities. Each book is unique and tailored to the child's interests." })}
                            </p>

                            <div className="space-y-4">
                                <button className="w-full bg-brand-accent text-brand-dark py-3 rounded-lg font-bold hover:bg-brand-accent/90 transition-colors">
                                    {t("readFull", { defaultMessage: "Read Full Story" })}
                                </button>
                                <p className="text-center text-sm text-gray-500">
                                    Generated in ~2 minutes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

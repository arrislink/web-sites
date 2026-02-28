"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, X, Wand2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { STORY_DATA, StoryId } from "@/data/kidStories";
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-components ---

// Story Gallery Component
function Gallery({ onSelect, t }: { onSelect: (id: StoryId) => void, t: any }) {
    const locale = useLocale() as "zh" | "en";
    const [selectedStory, setSelectedStory] = useState<{ id: StoryId, image: string, title: { zh: string, en: string } } | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const galleryItems = Object.keys(STORY_DATA).map(id => {
        const story = STORY_DATA[id as StoryId];
        return {
            id: id as StoryId,
            image: story.pages[0].image,
            title: story.title
        };
    });

    if (!isMounted) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 h-96" />;

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedStory(item)}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-brand-accent/20 transition-all duration-500"
                    >
                        <Image
                            src={item.image}
                            alt={item.title[locale]}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-10" />
                        
                        {/* Decorative glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                            <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
                        </div>

                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-8">
                            <h3 className="text-white font-bold text-xl mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4 drop-shadow-lg">
                                {item.title[locale]}
                            </h3>
                            <motion.span 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-brand-accent text-brand-dark px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 shadow-lg"
                            >
                                <BookOpen className="w-4 h-4" /> {t("gallery.read")}
                            </motion.span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1a1f2e] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="absolute top-6 right-6 z-50 p-2 bg-brand-dark/40 hover:bg-brand-dark/60 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
                                <Image
                                    src={selectedStory.image}
                                    alt={selectedStory.title[locale]}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1f2e]/20 hidden md:block" />
                            </div>

                            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-[#1a1f2e] to-[#121620]">
                                <div className="inline-flex items-center gap-2 text-brand-accent mb-4">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-widest uppercase">AI Masterpiece</span>
                                </div>
                                <h3 className="text-4xl font-black text-white mb-6 tracking-tight leading-tight">
                                    {selectedStory.title[locale]}
                                </h3>
                                <p className="text-gray-400 mb-10 text-lg leading-relaxed font-medium">
                                    {t("gallery.modalDesc")}
                                </p>

                                <div className="space-y-6">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            onSelect(selectedStory.id);
                                            setSelectedStory(null);
                                        }}
                                        className="w-full bg-brand-accent text-brand-dark py-4 rounded-xl font-black text-lg hover:bg-brand-accent/90 transition-all shadow-[0_10px_30px_-10px_rgba(56,189,248,0.5)] flex items-center justify-center gap-3"
                                    >
                                        <Wand2 className="w-6 h-6" />
                                        {t("gallery.readFull")}
                                    </motion.button>
                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Ready to Read
                                        </span>
                                        <span className="w-px h-4 bg-white/10" />
                                        <span>Generated in ~2 min</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Book Preview Component
function BookPreview({ activeStoryId }: { activeStoryId: StoryId }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const bookRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!bookRef.current) return;
        const rect = bookRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    // Get story data from our data file
    const story = STORY_DATA[activeStoryId];

    // Construct pages array
    const pages = [
        ...story.pages.map((p, i) => ({
            id: i + 1,
            title: p.title,
            content: p.content,
            image: p.image
        }))
    ];

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setDirection(1);
            setIsFlipped(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setIsFlipped(false);
            }, 300);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setIsFlipped(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev - 1);
                setIsFlipped(false);
            }, 300);
        }
    };

    if (!isMounted) return <div className="min-h-[600px] w-full bg-white/5 rounded-3xl animate-pulse" />;

    return (
        <div 
            ref={bookRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-5xl mx-auto perspective-2000"
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateX: mousePos.y * -5,
                    rotateY: mousePos.x * 5
                }}
                className="bg-[#1a1f2e]/50 border border-white/10 rounded-3xl p-4 md:p-10 shadow-3xl backdrop-blur-sm relative overflow-hidden"
            >
                {/* Decorative background light */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Book Container */}
                <div className="relative group">
                    <div className={`relative bg-[#fff9f0] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1)] min-h-[500px] md:min-h-[600px] flex flex-col md:flex-row overflow-hidden transition-all duration-500 ease-in-out ${isFlipped ? (direction > 0 ? 'rotate-y-10 -translate-x-4 opacity-50 scale-98' : '-rotate-y-10 translate-x-4 opacity-50 scale-98') : 'rotate-y-0 translate-x-0 opacity-100 scale-100'}`}
                         style={{ transformStyle: 'preserve-3d' }}>

                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentPage}
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex flex-col md:flex-row w-full h-full"
                            >
                                {/* Left Page (Text) */}
                                <div className="flex-1 p-8 md:p-14 border-r border-gray-200/50 flex flex-col justify-center relative bg-gradient-to-r from-[#fff9f0] to-[#fff5e6]">
                                    {/* Page Number with decorative circle */}
                                    <div className="absolute top-6 left-8 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border border-brand-dark/5 flex items-center justify-center font-serif text-brand-dark/20 italic text-xl">
                                            {currentPage + 1}
                                        </div>
                                        <div className="h-px w-8 bg-brand-dark/5" />
                                    </div>

                                    {/* Title - Bilingual with distinctive styling */}
                                    <div className="mb-10 mt-6">
                                        <h3 className="text-3xl md:text-4xl text-brand-dark font-black mb-3 tracking-tight leading-tight font-serif italic">
                                            {pages[currentPage].title.en}
                                        </h3>
                                        <h4 className="text-xl md:text-2xl text-gray-500 font-bold opacity-80">
                                            {pages[currentPage].title.zh}
                                        </h4>
                                    </div>

                                    {/* Content - Bilingual with visual hierarchy */}
                                    <div className="space-y-8">
                                        <p className="text-lg md:text-xl text-gray-800 leading-relaxed tracking-wide font-medium italic opacity-90 border-l-4 border-brand-accent/20 pl-6">
                                            "{pages[currentPage].content.en}"
                                        </p>
                                        <p className="text-lg md:text-xl text-gray-600 leading-loose font-bold pl-7">
                                            {pages[currentPage].content.zh}
                                        </p>
                                    </div>

                                    {/* Interactive Hint */}
                                    <div className="mt-auto pt-10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-brand-accent font-black text-sm uppercase tracking-tighter">
                                            <Sparkles className="w-4 h-4 animate-pulse" />
                                            <span>StoryCraft AI Engine</span>
                                        </div>
                                        <div className="text-gray-300 text-xs font-mono uppercase tracking-widest">
                                            {currentPage + 1} / {pages.length}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Page (Illustration) */}
                                <div className="flex-1 relative bg-[#e5e7eb] group-hover:shadow-inner transition-shadow">
                                    <Image
                                        src={pages[currentPage].image}
                                        alt={pages[currentPage].title.en}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Paper texture overlay */}
                                    <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] opacity-10 pointer-events-none mix-blend-multiply" />
                                    {/* Page shadow for depth */}
                                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Center Spine Shadow */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none hidden md:block z-10" />
                    </div>
                </div>

                {/* Controls - Floating and Glowy */}
                <div className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 z-40">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-4 bg-brand-dark/60 hover:bg-brand-accent hover:text-brand-dark backdrop-blur-xl rounded-full text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-2xl border border-white/10"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </motion.button>
                </div>
                <div className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 z-40">
                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className="p-4 bg-brand-accent text-brand-dark backdrop-blur-xl rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(56,189,248,0.4)] border border-brand-accent/20"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </motion.button>
                </div>

                {/* Modern Progress Bar */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3">
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > currentPage ? 1 : -1);
                                setCurrentPage(i);
                            }}
                            className="group p-2 focus:outline-none"
                        >
                            <motion.div
                                animate={{ 
                                    width: i === currentPage ? 32 : 8,
                                    backgroundColor: i === currentPage ? "#38bdf8" : "rgba(255,255,255,0.2)"
                                }}
                                className="h-2 rounded-full transition-all duration-300 group-hover:bg-brand-accent/50"
                            />
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// Main Interactive Component
export function KidStoryInteractive() {
    const t = useTranslations("kidStoryPage");
    const [activeStoryId, setActiveStoryId] = useState<StoryId>("story1");
    const [isMounted, setIsMounted] = useState(false);
    const [particles, setParticles] = useState<any[]>([]);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        // Generate particles only on client
        const newParticles = [...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    const handleReadStory = (id: StoryId) => {
        setActiveStoryId(id);
        // Smooth scroll to preview
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="relative">
            {/* Interactive Preview Section */}
            <section ref={previewRef} className="py-32 bg-gradient-to-b from-brand-dark to-brand-dark/80 overflow-hidden relative">
                {/* Background magic particles */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                            }}
                            className="absolute bg-brand-accent/20 rounded-full blur-xl"
                            style={{
                                left: p.left,
                                top: p.top,
                                width: p.width,
                                height: p.height,
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-black mb-6 border border-brand-accent/20">
                            <Wand2 className="w-4 h-4" />
                            <span>INTERACTIVE PREVIEW</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            {t("preview.title")}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                            {t("preview.subtitle")}
                        </p>
                    </motion.div>
                    
                    <BookPreview key={activeStoryId} activeStoryId={activeStoryId} />
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-32 relative bg-brand-dark overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                            {t("gallery.title")}
                        </h2>
                        <div className="h-1.5 w-24 bg-brand-accent mx-auto rounded-full" />
                    </motion.div>
                    
                    <Gallery onSelect={handleReadStory} t={t} />
                </div>
                
                {/* Decorative side light */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
            </section>
        </div>
    );
}

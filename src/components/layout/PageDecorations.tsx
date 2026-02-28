"use client";

import { useState, useEffect } from "react";
import { Star, Moon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function PageDecorations() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[5%] text-brand-accent/20"
            >
                <Star size={120} />
            </motion.div>
            <motion.div 
                animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[40%] right-[5%] text-brand-accent/10"
            >
                <Moon size={180} />
            </motion.div>
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] left-[10%] text-brand-accent/10"
            >
                <Sparkles size={150} />
            </motion.div>
        </div>
    );
}

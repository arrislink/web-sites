"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
}

export function AnimatedContainer({ children, ...props }: AnimatedContainerProps) {
    return (
        <motion.div {...props}>
            {children}
        </motion.div>
    );
}

interface AnimatedTextProps extends HTMLMotionProps<"span"> {
    children: ReactNode;
}

export function AnimatedText({ children, ...props }: AnimatedTextProps) {
    return (
        <motion.span {...props}>
            {children}
        </motion.span>
    );
}

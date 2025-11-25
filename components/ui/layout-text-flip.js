"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.span
        layoutId="subtext"
        className="text-xl font-semibold tracking-tight text-gray-300 font-secondary sm:text-2xl md:text-3xl">
        {text}
      </motion.span>
      <motion.span
        layout
        className="relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-3 py-1 text-xl font-bold tracking-tight text-black shadow-sm sm:text-2xl md:text-3xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap")}>
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};

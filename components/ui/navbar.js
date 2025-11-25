"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TextRoll } from "@/components/ui/textup";
import MessageButton from "@/components/ui/message-button";

const navLinks = [
  { name: "[Home]", href: "#hero" },
  { name: "[Work]", href: "#work" },
  { name: "[Experience]", href: "#experience" },
  { name: "[Skills]", href: "#skills" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/15 backdrop-blur-md">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.1px, transparent 1.1px)',
            backgroundSize: '6px 6px'
          }}
        />
        
        {/* Corner Plus Icons */}
        <Plus className="absolute -top-2 -left-2 text-white/50 w-4 h-4" />
        <Plus className="absolute -top-2 -right-2 text-white/50 w-4 h-4" />
        <Plus className="absolute -bottom-2 -left-2 text-white/50 w-4 h-4" />
        <Plus className="absolute -bottom-2 -right-2 text-white/50 w-4 h-4" />

        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="relative h-9 w-19 overflow-hidden">
               <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 mr-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="text-md font-semibold font-primary text-gray-400 hover:text-primary/80 tracking-tighter transition-colors cursor-pointer">
                   <TextRoll className="font-semibold">
                      {link.name}
                   </TextRoll>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Side - Github & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <MessageButton />
            
            <Link
              href="https://github.com/Async-NickL"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 text-gray-400 hover:text-white transition-colors rounded-full"
            >
              <motion.div
                whileHover={{ rotateY: 360, rotateZ: 20, scale: 1.2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Github className="h-5 w-5" />
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 z-50 relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#060010] flex flex-col items-center justify-center md:hidden"
          >
             {/* Background Pattern for Mobile Menu */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-30" 
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                    backgroundSize: '6px 6px'
                }}
            />

            <div className="flex flex-col gap-10 items-center z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: "easeOut" }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <div className="text-5xl font-bold font-primary text-white tracking-tight">
                        <span className="text-primary text-sm">[{index}]</span>
                        <TextRoll className="font-bold">
                            {link.name}
                        </TextRoll>
                    </div>
                  </Link>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

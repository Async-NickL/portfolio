'use client';
import React from 'react';
import { TextRoll } from "@/components/ui/textup";

export default function Footer() {
  return (
    <div 
      className='relative h-[450px]'
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='relative h-[calc(100vh+450px)] -top-[100vh]'>
        <div className='h-[500px] sticky top-[calc(100vh-500px)]'>
          <div className="bg-primary h-full w-full flex flex-col justify-between px-10 md:px-20 py-10 text-primary-foreground">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full mt-10 z-10">
              <div className="hidden md:flex flex-col gap-2">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Let&apos;s Work Together
                </h2>
                <p className="text-lg opacity-80">Creating digital experiences that matter.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-0 z-50">
                {[
                  { name: 'Github', href: 'https://github.com/Async-NickL' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-kole/' },
                  { name: 'Leetcode', href: 'https://leetcode.com/u/Nikhil-Kole/' },
                  { name: 'Resume', href: '/docs/resume.pdf', download: true }
                ].map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download={link.download}
                    className="text-sm md:text-lg font-medium hover:underline underline-offset-4 transition-all"
                  >
                    <TextRoll className="text-primary-foreground">
                      {link.name}
                    </TextRoll>
                  </a>
                ))}
              </div>
            </div>

            {/* Middle/Image Section */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
               <img 
                src="/images/me.png" 
                alt="Me" 
                className="h-[90%] w-auto object-contain mix-blend-multiply opacity-90"
              />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full z-10 relative">
              <div className="text-sm opacity-60 mt-4 md:mt-0">
                &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-center font-medium opacity-50">
                  Crafted with 🤍 using Next.js by Nikhil Kole <br/>
                  ( Built and designed from scratch )
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

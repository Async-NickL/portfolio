'use client';
import ScrollStack, { ScrollStackItem } from './ui/scroll-stack';
import { useRef } from 'react';
import { Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { TextRoll } from '@/components/ui/textup';
import Link from 'next/link';
import { BoxReveal } from "@/components/ui/box-reveal";

const projects = [
  {
    id: 1,
    title: "Prism",
    description: "A modern project management platform designed for small teams. Features include organization management, sprint planning, interactive Kanban boards, and comprehensive issue tracking.",
    type: "web",
    video: "/videos/prism.mp4",
    links: {
      github: "https://github.com/Async-NickL/Prism",
      live: "https://useprism.vercel.app/"
    },
    tags: ["Next.js 15", "React 19", "Tailwind CSS 4", "Prisma", "Clerk", "Framer Motion"]
  },
  {
    id: 2,
    title: "District E-Library",
    description: "A comprehensive digital platform for Maharashtra's district libraries. Features include a mobile app for users to access books/courses and a centralized admin panel for library management.",
    type: "mobile",
    isNDA: true,
    video: "/videos/elib.mp4",
    links: {
      github: "https://github.com",
      live: "https://example.com"
    },
    tags: ["React Native", "Expo", "Node.js", "Express", "MySQL", "Drizzle ORM"]
  }
];

export default function ProjectShowcase() {
  return (
    <div className="w-full relative z-10">
      <ScrollStack 
        useWindowScroll={true} 
        itemDistance={200} 
        stackPosition="15%"
        itemScale={0.05}
        baseScale={0.9}
      >
        {projects.map((project) => (
          <ScrollStackItem key={project.id} itemClassName="bg-[#060010] border-[1.5px] !rounded-3xl border-white/20 !p-0 overflow-hidden h-[600px]">
            <div className="flex flex-col-reverse justify-end lg:justify-normal lg:flex-row w-full h-full relative">
              {/* NDA Ribbon */}
              {project.isNDA && (
                <div className="absolute top-5 -right-12 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-15 rotate-45 z-50 shadow-lg tracking-widest border border-white/10 select-none">
                  NDA
                </div>
              )}

              {/* Left Side: Content */}
              <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-start lg:justify-center space-y-6 lg:space-y-8 pt-4 lg:pt-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <BoxReveal boxColor="#58ccfe" duration={0.5}>
                      <span className="text-primary text-sm font-medium tracking-wider uppercase">{project.type === 'web' ? 'Web Application' : 'Mobile Application'}</span>
                    </BoxReveal>
                    
                    {/* Project Links */}
                    <div className="flex items-center gap-4">
                      {project.isNDA ? (
                        <>
                          <div className="relative group cursor-not-allowed">
                            <div className="text-gray-600 transition-colors">
                              <Github className="h-5 w-5" />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-red-500/90 backdrop-blur-md border border-white/10 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
                              Under NDA
                            </div>
                          </div>
                          <div className="relative group cursor-not-allowed">
                            <div className="text-gray-600 transition-colors">
                              <Globe className="h-5 w-5" />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-red-500/90 backdrop-blur-md border border-white/10 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
                              Under NDA
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <motion.div
                              whileHover={{ rotateY: 360, rotateZ: 20, scale: 1.2 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                              <Github className="h-5 w-5" />
                            </motion.div>
                          </Link>
                          <Link
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <motion.div
                              whileHover={{ rotateY: 360, rotateZ: 20, scale: 1.2 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                              <Globe className="h-5 w-5" />
                            </motion.div>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <BoxReveal boxColor="#58ccfe" duration={0.5}>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white font-primary">{project.title}</h3>
                  </BoxReveal>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  {project.description}
                </p>
                
                <div className="pt-4 hidden lg:flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Video Preview */}
              <div className={`w-full lg:w-1/2 bg-black/20 flex items-start lg:items-center justify-center px-6 lg:p-12 relative overflow-hidden lg:min-h-full ${project.type === 'web' ? 'pt-12 pb-0' : 'pt-20 pb-0'}`}>
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-50" />
                
                {project.type === 'web' ? (
                  /* Laptop Frame */
                  <div className="relative w-[85%] sm:w-[75%] md:w-[70%] lg:w-full lg:max-w-lg mx-auto">
                    <div className="relative bg-[#1a1a1a] rounded-t-xl border-4 md:border-10 border-[#2a2a2a] shadow-2xl aspect-video overflow-hidden">
                      <video 
                        src={project.video} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-2 md:h-4 bg-[#2a2a2a] rounded-b-xl w-[110%] -ml-[5%] shadow-xl relative z-10">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 md:w-16 h-1 bg-[#1a1a1a] rounded-b-md" />
                    </div>
                  </div>
                ) : (
                  /* Mobile Frame */
                  <div className="relative w-[50%] sm:w-[40%] md:w-[35%] lg:w-auto lg:h-full lg:max-h-[500px] aspect-9/19 mx-auto">
                    <div className="absolute inset-0 bg-[#1a1a1a] rounded-[1.5rem] md:rounded-[2.5rem] border-4 md:border-8 border-[#2a2a2a] shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-6 bg-[#2a2a2a] rounded-b-xl z-20" />
                      <video 
                        src={project.video} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

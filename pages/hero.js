"use client";

import { useRef, useState, useEffect } from "react";
import { LaserFlow } from "@/components/ui/laser-flow";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { MapPin } from "lucide-react";
import ShinyText from "@/components/ui/shiny-text";
import { BoxReveal } from "@/components/ui/box-reveal";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)`;
  const [laserConfig, setLaserConfig] = useState({
    horizontalSizing: 3,
    verticalSizing: 3,
    horizontalBeamOffset: 0.3,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLaserConfig({
          horizontalSizing: 6,
          verticalSizing: 5,
          horizontalBeamOffset: 0.3,
        });
      } else {
        setLaserConfig({
          horizontalSizing: 3,
          verticalSizing: 3,
          horizontalBeamOffset: 0.3,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-[#060010]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="absolute h-screen w-screen z-1 pointer-events-none hidden xl:block">
        <LaserFlow
          color="#58ccfe"
          horizontalSizing={laserConfig.horizontalSizing}
          verticalSizing={laserConfig.verticalSizing}
          horizontalBeamOffset={laserConfig.horizontalBeamOffset}
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center xl:justify-start pointer-events-none p-4 xl:pl-32">
        <div className="flex flex-col items-center xl:items-start justify-center max-w-5xl text-center xl:text-left">
          <div className="mb-4 flex items-center gap-2 backdrop-blur-2xl bg-white/5 px-2 py-1 rounded-sm">
            <MapPin className="h-6 w-6 text-gray-500 " />
            <ShinyText text="Kolhapur" disabled={false} speed={3} className="text-xl opacity-70 font-semibold font-secondary" />
          </div>
          <h1 className="flex flex-col font-bold text-white font-primary leading-none items-center xl:items-start">
            <BoxReveal boxColor={"#58ccfe"} duration={0.5}>
              <span className="text-4xl sm:text-5xl xl:text-5xl mb-2">Hi, I'm</span>
            </BoxReveal>
            <BoxReveal boxColor={"#58ccfe"} duration={0.5}>
              <span className="relative z-10 bg-clip-text text-transparent bg-linear-to-b from-white to-primary text-6xl sm:text-8xl xl:text-[7rem] tracking-tighter font-primary xl:-ml-2">Nikhil Kole</span>
            </BoxReveal>
          </h1>
          <div className="mt-6">
            <LayoutTextFlip
              text="I'm a"
              words={['Full Stack Developer', 'Engineer', 'Problem Solver', 'Creative Thinker']}
            />
          </div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-lighten hidden xl:block"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" }
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.playbackRate = 2;
            }
          }}
          className="h-full w-full object-cover"
        >
          <source src="/videos/loopbg.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 z-0 block xl:hidden">
        <video
          autoPlay
          loop
          ref={(videoElement) => {
            if (videoElement) {
              videoElement.playbackRate = 2;
            }
          }}
          muted
          playsInline
          className="h-full w-full object-cover blur-3xl opacity-50"
        >
          <source src="/videos/loopbg.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
}

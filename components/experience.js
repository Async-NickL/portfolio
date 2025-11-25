'use client';
import { motion } from 'framer-motion';
import { BoxReveal } from "@/components/ui/box-reveal";
import { Tooltip } from "@/components/ui/tooltip-card";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    year: "2025",
    duration: "June - Sept",
    role: "Software Developer Intern",
    company: "Appwizer Solutions",
    link: "https://appwizersolutions.com/",
    companyLogo: "/images/as_logo.png",
    companyIntro: "Empowering businesses with custom software development, asset management optimization, and deep technology consultation.",
    description: "Contributed to the active development of flagship products. Gained hands-on experience with NodeJS, React Native, and MySQL. Collaborated using GitHub and Jira in an agile environment to deliver high-quality software solutions.",
    tech: ["NodeJS", "React Native", "MySQL", "GitHub", "Jira"]
  }
];

export default function ExperienceList() {
  return (
    <div className="w-full max-w-[85rem] mx-auto px-4 md:px-8 pb-20">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 py-12 md:py-20"
        >
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
                {/* Year */}
                <div className="w-full md:w-1/4">
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-medium text-gray-500 font-primary">
                            {exp.year}
                        </span>
                        <span className="text-sm font-medium text-gray-600 font-primary">
                            {exp.duration}
                        </span>
                    </div>
                </div>

                {/* Role & Company */}
                <div className="w-full md:w-1/3">
                    <BoxReveal boxColor="#58ccfe" duration={0.5}>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-primary">
                          {exp.role}
                      </h3>
                    </BoxReveal>
                    {exp.company === "Appwizer Solutions" ? (
                      <Tooltip
                        content={
                          <div className="flex flex-col items-center gap-4 p-4 w-[320px]">
                             <div className="relative w-full h-16 flex items-center justify-center bg-white/5 rounded-lg p-2">
                                <Image
                                  src={exp.companyLogo}
                                  alt={exp.company}
                                  width={80}
                                  height={30}
                                  className="object-contain"
                                />
                             </div>
                             <p className="text-center text-sm text-gray-400 leading-relaxed">
                               {exp.companyIntro}
                             </p>
                          </div>
                        }
                      >
                        <BoxReveal boxColor="#58ccfe" duration={0.5}>
                          <a 
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-gray-400 cursor-pointer hover:text-primary transition-colors inline-block"
                          >
                              {exp.company}
                          </a>
                        </BoxReveal>
                      </Tooltip>
                    ) : (
                      <BoxReveal boxColor="#58ccfe" duration={0.5}>
                        <p className="text-lg text-gray-400">
                            {exp.company}
                        </p>
                      </BoxReveal>
                    )}
                </div>

                {/* Description */}
                <div className="w-full md:w-5/12 md:pl-8">
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, i) => (
                            <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-primary border border-white/10">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
      ))}
      <div className="border-t border-white/10" />
    </div>
  );
}

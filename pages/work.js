import ScrollVelocity from "@/components/ui/scroll-velocity";
import ProjectShowcase from "@/components/project-showcase";
import { Briefcase } from "lucide-react";

export default function Work() {
  return (
    <section className="dark relative bg-transparent min-h-screen">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-[#060010] to-transparent z-10" />
      <ScrollVelocity
        texts={[
          "My Work | "
        ]}
        className="relative z-10 bg-clip-text text-transparent bg-linear-to-b from-primary to-gray-400 text-4xl sm:text-5xl xl:text-[3.5rem] tracking-tighter font-primary xl:-ml-2 mt-7 mb-10"
      />
      <ProjectShowcase />
    </section>
  );
}

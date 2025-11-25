import ScrollVelocity from "@/components/ui/scroll-velocity";
import ExperienceList from "@/components/experience";

export default function Experience() {
  return (
    <section className="dark py-4 relative bg-transparent min-h-[50vh]">
      <ScrollVelocity
        texts={["Experience | "]}
        velocity={-100}
        className="relative z-10 bg-clip-text text-transparent bg-linear-to-b from-primary to-gray-400 text-4xl sm:text-5xl xl:text-[3.5rem] tracking-tighter font-primary xl:-ml-2 mb-20"
      />
      <ExperienceList />
    </section>
  );
}

import Hero from "@/pages/hero";
import Work from "@/pages/work";
import Experience from "@/pages/experience";
import Skills from "@/pages/skills";

export default function Home() {
  return (
    <>
      <div className="select-none" id="hero">
        <Hero />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <Skills />
      </div>
    </>
  );
}

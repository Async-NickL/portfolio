import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandFramer,
  IconBrandNodejs,
  IconBrandMysql,
  IconBrandGithub,
  IconBrandFigma,
  IconBrandVercel,
} from "@tabler/icons-react";
import ScrollVelocity from "@/components/ui/scroll-velocity";

export default function Skills() {
  const skills = {
    frontend: [
      { title: "React", description: "Building interactive, component-based UIs for scalable web applications.", icon: <IconBrandReact className="w-8 h-8" /> },
      { title: "React Native", description: "Developing cross-platform mobile applications with native performance.", icon: <IconBrandReact className="w-8 h-8" /> },
      { title: "Next.js", description: "Creating full-stack web apps with server-side rendering and static generation.", icon: <IconBrandNextjs className="w-8 h-8" /> },
      { title: "Tailwind CSS", description: "Rapidly styling responsive designs with a utility-first approach.", icon: <IconBrandTailwind className="w-8 h-8" /> },
      { title: "Framer Motion", description: "Adding complex animations and gestures to enhance user experience.", icon: <IconBrandFramer className="w-8 h-8" /> },
      { title: "GSAP", description: "Crafting high-performance, professional-grade web animations.", icon: <img src="/svgs/gsap.svg" alt="GSAP" className="w-8 h-8 brightness-0 invert opacity-60" /> },
    ],
    backend: [
      { title: "Node.js", description: "Building scalable, high-performance network applications.", icon: <IconBrandNodejs className="w-8 h-8" /> },
      { title: "Express", description: "Developing robust RESTful APIs and web servers.", icon: <img src="/svgs/express.svg" alt="Express" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "FastAPI", description: "Building high-performance Python APIs with automatic documentation.", icon: <img src="/svgs/fastapi.svg" alt="FastAPI" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "MySQL", description: "Managing structured data with complex relational queries.", icon: <IconBrandMysql className="w-8 h-8" /> },
      { title: "PostgreSQL", description: "Advanced open-source relational database with powerful features.", icon: <img src="/svgs/postgresql.svg" alt="PostgreSQL" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "MongoDB", description: "Flexible NoSQL database for modern application development.", icon: <img src="/svgs/mongodb.svg" alt="MongoDB" className="w-8 h-8 brightness-0 invert opacity-60" /> },
    ],
    cloud: [
      { title: "Vercel", description: "Deploying and hosting web applications with zero configuration.", icon: <IconBrandVercel className="w-8 h-8" /> },
      { title: "AWS EC2", description: "Scalable cloud computing with virtual servers for various workloads.", icon: <img src="/svgs/ec2.svg" alt="AWS EC2" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "AWS S3", description: "Object storage service for secure and scalable data storage.", icon: <img src="/svgs/s3.svg" alt="AWS S3" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "GitHub Workflow", description: "Automating CI/CD pipelines for AWS deployments.", icon: <IconBrandGithub className="w-8 h-8" /> },
    ],
    tools: [
      { title: "GitHub", description: "Collaborating on code and managing version history effectively.", icon: <IconBrandGithub className="w-8 h-8" /> },
      { title: "Figma", description: "Designing intuitive interfaces and prototyping user experiences.", icon: <IconBrandFigma className="w-8 h-8" /> },
      { title: "Jira", description: "Managing agile projects and tracking development workflows.", icon: <img src="/svgs/jira.svg" alt="Jira" className="w-8 h-8 brightness-0 invert opacity-60" /> },
      { title: "Postman", description: "Testing and documenting APIs with automated workflows.", icon: <img src="/svgs/postman.svg" alt="Postman" className="w-8 h-8 brightness-0 invert opacity-60" /> },
    ]
  };

  return (
    <section className="dark relative bg-transparent py-20 min-h-[50vh]">
       <ScrollVelocity
        texts={["Skills & Tech Stack | "]}
        className="relative z-10 bg-clip-text text-transparent bg-linear-to-b from-primary to-gray-400 text-4xl sm:text-5xl xl:text-[3.5rem] tracking-tighter font-primary xl:-ml-2 mb-20"
      />
      
      <div className="w-full max-w-340 mx-auto px-4">
        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto">
            <TabsList variant="underline" className="bg-transparent justify-start md:justify-center gap-1 md:gap-2" style={{ "--primary": "#58ccfe" }}>
              <TabsTab value="frontend" className="text-sm md:text-xl px-3 py-1.5 md:px-8 md:py-3 data-selected:text-[#58ccfe]">Frontend</TabsTab>
              <TabsTab value="backend" className="text-sm md:text-xl px-3 py-1.5 md:px-8 md:py-3 data-selected:text-[#58ccfe]">Backend</TabsTab>
              <TabsTab value="cloud" className="text-sm md:text-xl px-3 py-1.5 md:px-8 md:py-3 data-selected:text-[#58ccfe]">Cloud</TabsTab>
              <TabsTab value="tools" className="text-sm md:text-xl px-3 py-1.5 md:px-8 md:py-3 data-selected:text-[#58ccfe]">Tools</TabsTab>
            </TabsList>
          </div>

          {Object.entries(skills).map(([category, items]) => (
            <TabsPanel key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 mx-auto">
                {items.map((feature, index) => (
                  <Feature key={feature.title} {...feature} index={index} total={items.length} />
                ))}
              </div>
            </TabsPanel>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  total
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-20 lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index % 3 === 0) && "lg:border-l dark:border-neutral-800",
        (index < total - (total % 3 || 3)) && "lg:border-b dark:border-neutral-800"
      )}>
      <div
        className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-[#58ccfe]/10 to-transparent pointer-events-none" />
      <div
        className="mb-4 relative z-10 px-10 text-neutral-400 transition-colors duration-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#58ccfe] transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-300 w-full md:max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

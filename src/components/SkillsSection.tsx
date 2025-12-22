"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code2,
  Palette,
  Repeat,
  Plug,
  Radio,
  GitBranch,
  Server,
  Database,
  Leaf,
  Lock,
  MonitorPlay,
  FigmaIcon,
  FileCode2,
  Braces,
  Atom,
  FileText,
  Paintbrush,
  Send,
  Boxes,
  Bot,
  Triangle,
  Globe,
  Cpu,
  Layers,
  Network,
  Terminal,
} from "lucide-react"



/* -------------------- DATA -------------------- */
const coreSkills=  [
  { name: "React.js",  icon: Code2 },
  { name: "TypeScript", icon: Braces },
  { name: "JavaScript",  icon: FileCode2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Redux",  icon: Repeat },
  { name: "Bootstrap", icon: Palette },
  { name: "Java (Core)", icon: Terminal },
  { name: "Java Spring Boot (MVC)", icon: Layers },
  { name: "Node.js", icon: Cpu },
  { name: "Express.js", icon: Network },
  { name: "REST APIs", icon: Boxes },
  { name: "Databases", icon: Database },
]

const techStack = [

  { name: "Redux Toolkit", icon: Repeat },
  { name: "Node", icon: Server },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "MongoDB", icon: Leaf },
  { name: "PostgrelSQL", icon: Database },
  { name: "HTML5", icon: FileText },
  { name: "CSS3", icon: Paintbrush },
  { name: "VS Code", icon: MonitorPlay },
  { name: "Postman", icon: Send   }, 
  { name: "Eclipse", icon: Boxes },
  { name: "ChatGPT", icon: Bot },
  { name: "Vercel", icon: Triangle },
  { name: "Netlify", icon: Globe },

]
const additionalExpertise = [
  "JWT Authentication",
  "Protected Routes",
  "Role-Based Access Control (RBAC)",
  "Accessibility",
  "Custom Hooks",
  "Higher-Order Components (HOCs)",
  "React Shared Component Implementation",
  "WebSockets",
  "Real-time Features",
  "Responsive Design",
  "Proctoring Systems",
  "Agile / SDLC",
  "EdTech Platforms",
  "Event Management",
]


/* -------------------- COMPONENT -------------------- */
export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-16">
      <div className="container mx-auto px-6">

        {/* -------------------- HEADER -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Skills & Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            What I Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, production-ready applications
          </p>
        </motion.div>

        {/* -------------------- CORE + TECH -------------------- */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">

          {/* Core Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-8">
              Core Coding Skills
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {coreSkills.map((skill, index) => {
                const Icon = skill.icon!
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-center shadow-sm gap-4 p-4 rounded-xl border bg-card hover:bg-muted/40 transition"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold mb-8">
              Tech Stack
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {techStack.map((tool, index) => {
                const Icon = tool.icon!
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="flex flex-col shadow-sm items-center text-center justify-center gap-2 p-4 rounded-xl border bg-card">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-center">{tool.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* -------------------- ADDITIONAL EXPERTISE -------------------- */}
        <div className="p-2">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Additional Expertise
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {additionalExpertise.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 shadow-md rounded-full border text-sm text-muted-foreground hover:text-primary transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

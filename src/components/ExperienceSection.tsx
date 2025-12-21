import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Building2, Calendar, MapPin, ChevronRight } from "lucide-react"

const experiences = [
  {
    id: 1,
    role: "Associate Software Engineer",
    company: "ExcelSoft Technologies Ltd",
    location: "Mysore",
    period: "May 2024 – Present",
    description:
      "Building enterprise-scale React.js applications for EdTech platforms, including projects such as Saras Standard Platform, Owlbot (a web-based platform for discovering, generating, and managing copyright-compliant content for websites), and SVKM Platform.",
    highlights: [
      "Developed React.js SPAs with optimized UI responsiveness and load performance",
      "Created and maintained shared reusable React component library",
      "Implemented secure JWT-based authentication with refresh token handling",
      "Built real-time features using WebSockets including live proctoring",
      "Managed complex state using Redux Toolkit across multiple modules",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Software Development Intern",
    company: "Kodnest Technologies Pvt. Ltd.",
    location: "Remote",
    period: "August 2023 – April 2024",
    description:
      "Full-stack development training with hands-on project experience",
    highlights: [
      "Completed Java Full Stack training covering Core Java, JDBC, Servlets, SQL",
      "Built and tested full-stack modules with real-world applications",
      "Collaborated using Git/GitHub following version control best practices",
      "Gained end-to-end software development workflow understanding",
    ],
    current: false,
  },
]

const ExperienceSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="relative py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-orb gradient-orb-accent w-64 h-64 top-1/2 -left-32 opacity-30" />
      </div>

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Building impactful solutions at industry-leading companies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Left card */}
                <div className="md:text-right md:pr-8 mb-6 md:mb-0">
                  <div className="glass-card p-6 rounded-2xl border border-border/60 shadow-md shadow-black/5 dark:shadow-none">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/50 mb-4">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 md:justify-end mb-2">
                      <Building2 className="w-5 h-5 md:order-2 text-primary" />
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                    </div>

                    <p className="gradient-text font-medium">{exp.role}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground md:justify-end">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-muted-foreground mt-3 text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Right card */}
                <div className="md:pl-8">
                  <div className="glass-card p-6 rounded-2xl border border-border/60 shadow-md shadow-black/5 dark:shadow-none">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Highlights
                    </h4>

                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? 20 : -20,
                          }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl bg-muted/40 border border-border/50 shadow-sm"
                        >
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection

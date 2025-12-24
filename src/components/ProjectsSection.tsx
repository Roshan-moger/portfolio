import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import carRentImage from "../../public/car_rent.gif";
import expenseTracker from "../../public/expense_tracker.gif";
import portFolio from "../../public/Harish_portFolio.gif";
import eventManage from "../../public/Event.gif";
import quiz from "../../public/quiz.gif"


interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  links?: {
    github?: string;
    demo?: string;
  };
}

const projects: Project[] = [

   {
    id: 1,
    title: "Event Management Platform",
    description:
      "A Progressive Web Application designed for creating, booking, and managing events with role-based access, real-time updates, and a seamless user experience across devices.",
    image: eventManage,
    tech: ["React.js", "PWA", "QR Code" , "Scanning", "Redux", "JWT", "Map Integration", "Seat Booking"],
    category: "Front End",
    links: {
      github: "https://github.com/Roshan-moger/booking-event",
      demo: "https://spotfront.app.codevicesolution.in/",
    },
  },
 
  {
    id: 2,
    title: "Real-time Expense Tracker",
    description:
      "A full-stack MERN application that helps users track income and expenses in real time, featuring secure authentication, automated data processing, and insightful monthly summaries.",
    image: expenseTracker,
    tech: ["MongoDB", "Express", "React.js", "Node.js", "IMAP" , "Redux Toolkit" , "JWT"],
    category: "Full Stack",
    links: {
      github: "https://github.com/Roshan-moger/track-expense",
      demo: "https://spendvault.netlify.app/",
    },
  },
  {
    id: 3,
    title: "Renting Car Application",
    description:
      "A modern and user-friendly car rental platform that enables users to browse vehicles, check availability, and rent cars on a daily or weekly basis with a smooth booking experience.",
    image: carRentImage,
    tech: ["React.js", "Tailwind CSS"],
    category: "Front End",
    links: {
      github: "https://github.com/Roshan-moger/Car-rent",
      demo: "https://roshan-car-rent-app.netlify.app/",
    },
  },
  {
    id: 4,
    title: "Freelancer Portfolio Website",
    description:
      "A clean and responsive portfolio website built for freelancers and professionals to showcase their skills, projects, and experience with a customizable and reusable layout.",
    image: portFolio,
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Front End",
    links: {
      github: "https://github.com/Roshan-moger/Harish",
      demo: "https://harishmoger.netlify.app/",
    },
  }, {
    id: 5,
    title: "Quiz App",
    description:
      "An interactive and responsive quiz application designed for  students, featuring topic-wise quizzes in Python, Java, and Aptitude. The app provides a smooth user experience with real-time question navigation, score tracking, and a clean, modern UI.",
    image: quiz,
    tech: ["React JS", "Tailwind CSS", "Axios"],
    category: "Front End",
    links: {
      github: "https://github.com/Roshan-moger/Quiz-App",
      demo: "https://quiz-app-seven-phi-63.vercel.app",
    },
  }
];


const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Projects That <span className="gradient-text">Define</span> Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of enterprise applications and personal projects
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 shadow-lg rounded-full text-sm font-medium transition-all ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "glass-card border border-border/40 shadow-sm dark:border-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="
    glass-card
    rounded-2xl
    overflow-hidden
    group
    border border-border/40
    shadow-lg
    dark:border-white/10
    dark:shadow-none
    h-[500px]
    flex
    flex-col
  "
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-card/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs bg-primary/20 text-primary backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons - always bottom */}
                  <div className="pt-4 mt-auto">
                    <div className="flex gap-4">
                      {project.links?.github && (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </motion.a>
                      )}

                      {project.links?.demo && (
                        <motion.a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

            ))}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
};

export default ProjectsSection;

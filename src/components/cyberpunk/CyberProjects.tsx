import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Saras Standard Platform',
    category: 'Enterprise',
    description: 'Enterprise EdTech product with Admin, Item Bank, Test Bank, Scheduling, and Test Player modules.',
    longDescription: 'Enterprise EdTech product enabling administrators to manage users, create diverse question types, assemble assessments, schedule online exams, and conduct secure formative and summative tests with proctoring support.',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    color: 'primary',
  },
  {
    id: 2,
    title: 'SVKM Platform',
    category: 'Education',
    description: 'University-level examination system with question paper creation and online result processing.',
    longDescription: 'University-level examination system enabling question paper creation, exam scheduling, answer sheet scanning, and online result processing for large-scale academic institutions.',
    tech: ['React.js', 'Redux', 'REST APIs', 'JWT Auth', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'OwlBot',
    category: 'Compliance',
    description: 'Compliance-focused platform detecting copyright infringements on websites.',
    longDescription: 'Compliance-focused platform that detects copyright infringements on websites and generates automated violation reports with detailed analytics and tracking.',
    tech: ['React.js', 'TypeScript', 'WebSockets', 'Real-time Reporting'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    color: 'accent',
  },
  {
    id: 4,
    title: 'Real-time Expense Tracker',
    category: 'Personal',
    description: 'MERN Stack application for tracking monthly income and expenses.',
    longDescription: 'A real-time web application for tracking monthly income and expenses through secure email data processing with JWT authentication and protected routes.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'JWT'],
    github: 'https://github.com/Roshan-moger',
    color: 'primary',
  },
  {
    id: 5,
    title: 'Event Management Platform',
    category: 'PWA',
    description: 'Role-based Progressive Web Application for event creation and booking.',
    longDescription: 'Role-based Progressive Web Application for event creation, booking, and management with real-time ticket generation and QR-based check-in functionality.',
    tech: ['React.js', 'PWA', 'Redux', 'Tailwind', 'QR Generation'],
    github: 'https://github.com/Roshan-moger',
    color: 'secondary',
  },
];

const categories = ['All', 'Enterprise', 'Education', 'Personal', 'PWA', 'Compliance'];

const CyberProjects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-50" />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm tracking-widest">{'// PORTFOLIO'}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-background'
                    : 'cyber-glass text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div
                  className="cyber-glass rounded-2xl overflow-hidden group cursor-pointer h-full"
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br from-${project.color} to-${project.color}/50`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 cyber-glass rounded-full text-xs font-mono text-primary">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="cyber-glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Image */}
                {selectedProject.image && (
                  <div className="relative h-64">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 cyber-glass rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-8">
                  <span className="text-primary font-mono text-sm">{selectedProject.category}</span>
                  <h3 className="font-display text-3xl font-bold mt-2 mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedProject.longDescription}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 cyber-glass rounded-full text-sm text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-btn-outline flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CyberProjects;
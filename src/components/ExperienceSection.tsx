import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'ExcelSoft Technologies Ltd',
    location: 'Mysore',
    period: 'May 2024 – Present',
    description: 'Building enterprise-scale React.js applications for EdTech platforms',
    highlights: [
      'Developed React.js SPAs with optimized UI responsiveness and load performance',
      'Created and maintained shared reusable React component library',
      'Implemented secure JWT-based authentication with refresh token handling',
      'Built real-time features using WebSockets including live proctoring',
      'Managed complex state using Redux Toolkit across multiple modules',
    ],
    current: true,
  },
  {
    id: 2,
    role: 'Software Development Intern',
    company: 'Kodnest Technologies Pvt. Ltd.',
    location: 'Remote',
    period: 'August 2023 – April 2024',
    description: 'Full-stack development training with hands-on project experience',
    highlights: [
      'Completed Java Full Stack training covering Core Java, JDBC, Servlets, SQL',
      'Built and tested full-stack modules with real-world applications',
      'Collaborated using Git/GitHub following version control best practices',
      'Gained end-to-end software development workflow understanding',
    ],
    current: false,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">{'// Career Journey'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building impactful solutions at industry-leading companies
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                >
                  {exp.current && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content card */}
                <motion.div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  } pl-8 md:pl-0`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="glass-card p-6 rounded-2xl hover-glow">
                    {exp.current && (
                      <motion.span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Current Role
                      </motion.span>
                    )}
                    
                    <h3 className="text-xl font-bold gradient-text mb-1">{exp.role}</h3>
                    
                    <div className={`flex items-center gap-2 mb-2 text-muted-foreground ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                    
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

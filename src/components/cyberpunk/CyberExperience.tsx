import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Associate Software Engineer',
    company: 'Excelsoft Technologies Ltd',
    location: 'Mysore, India',
    period: 'May 2024 – Present',
    type: 'Full-time',
    description: [
      'Developed React.js SPAs with improved UI responsiveness and optimized load performance',
      'Refactored legacy frontend modules into reusable React components',
      'Implemented secure JWT-based authentication with refresh token handling',
      'Built real-time features using WebSockets, including live proctoring and reporting',
      'Created and maintained shared reusable React components for UI consistency',
    ],
    color: 'primary',
  },
  {
    title: 'Software Development Intern',
    company: 'Kodnest Technologies Pvt. Ltd.',
    location: 'Remote',
    period: 'August 2023 – April 2024',
    type: 'Internship',
    description: [
      'Completed hands-on training in Java Full Stack development',
      'Built and tested full-stack modules with real-world application exposure',
      'Collaborated in remote development environment using Git/GitHub',
      'Gained understanding of end-to-end software development workflows',
    ],
    color: 'secondary',
  },
];

const education = {
  degree: 'Bachelor of Engineering',
  field: 'Electrical and Electronics Engineering',
  institution: 'NIE Institute of Technology, Mysore',
  period: '2019 – 2023',
  cgpa: '7.8',
};

const CyberExperience = () => {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm tracking-widest">{'// JOURNEY'}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              <span className="text-gradient">Experience</span> & Education
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="left">
              <h3 className="font-display text-2xl font-bold mb-8 text-gradient flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Work Experience
              </h3>
            </ScrollReveal>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

              {experiences.map((exp, index) => (
                <ScrollReveal key={exp.title} direction="left" delay={index * 0.2}>
                  <motion.div
                    className="relative pl-8 md:pl-20 pb-12 last:pb-0"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-${exp.color}`}
                      whileHover={{ scale: 1.5 }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-${exp.color} animate-ping opacity-20`} />
                    </motion.div>

                    <div className="cyber-glass p-6 rounded-2xl">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono bg-${exp.color}/20 text-${exp.color}`}>
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>

                      <h4 className="font-display text-xl font-bold mb-1">{exp.title}</h4>
                      <p className="text-primary font-semibold mb-4">{exp.company}</p>

                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <ScrollReveal direction="right">
              <h3 className="font-display text-2xl font-bold mb-8 text-gradient">
                🎓 Education
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.div
                className="cyber-glass p-8 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full cyber-glass flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-4xl">🎓</span>
                  </motion.div>

                  <h4 className="font-display text-xl font-bold mb-2">
                    {education.degree}
                  </h4>
                  <p className="text-primary font-semibold mb-4">
                    {education.field}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    {education.institution}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    {education.period}
                  </p>

                  <div className="cyber-glass p-4 rounded-xl">
                    <span className="text-muted-foreground text-sm">CGPA</span>
                    <div className="font-display text-3xl font-black text-gradient">
                      {education.cgpa}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Soft Skills */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="mt-8 cyber-glass p-6 rounded-2xl">
                <h4 className="font-display text-lg font-bold mb-4 text-gradient">
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Problem Solving', 'Self-learning', 'Adaptability', 'Team Collaboration', 'Communication'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 cyber-glass rounded-full text-sm text-muted-foreground"
                      whileHover={{ scale: 1.1, color: 'hsl(var(--primary))' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberExperience;
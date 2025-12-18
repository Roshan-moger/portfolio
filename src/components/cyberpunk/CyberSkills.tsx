import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const skills = [
  { name: 'React.js', level: 95, color: 'primary' },
  { name: 'TypeScript', level: 90, color: 'secondary' },
  { name: 'JavaScript', level: 92, color: 'primary' },
  { name: 'Tailwind CSS', level: 88, color: 'accent' },
  { name: 'Redux Toolkit', level: 85, color: 'secondary' },
  { name: 'REST APIs', level: 88, color: 'primary' },
  { name: 'WebSockets', level: 80, color: 'accent' },
  { name: 'Git & GitHub', level: 90, color: 'secondary' },
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Redux', icon: '🔄' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'HTML5', icon: '📄' },
  { name: 'CSS3', icon: '🎭' },
  { name: 'Git', icon: '📦' },
  { name: 'VS Code', icon: '💻' },
];

const CyberSkills = () => {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm tracking-widest">{'// TECH STACK'}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              <span className="text-gradient">Skills</span> & Expertise
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Progress Bars */}
          <div className="space-y-6">
            <ScrollReveal direction="left">
              <h3 className="font-display text-2xl font-bold mb-8 text-gradient">
                Core Competencies
              </h3>
            </ScrollReveal>

            {skills.map((skill, index) => (
              <ScrollReveal key={skill.name} direction="left" delay={index * 0.1}>
                <div className="group">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full relative ${
                        skill.color === 'primary' 
                          ? 'bg-gradient-to-r from-primary to-primary/60'
                          : skill.color === 'secondary'
                          ? 'bg-gradient-to-r from-secondary to-secondary/60'
                          : 'bg-gradient-to-r from-accent to-accent/60'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-50"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Floating Tech Icons */}
          <div className="relative">
            <ScrollReveal direction="right">
              <h3 className="font-display text-2xl font-bold mb-8 text-gradient">
                Technologies I Use
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <ScrollReveal key={tech.name} direction="scale" delay={index * 0.05}>
                  <motion.div
                    className="cyber-glass p-4 rounded-xl text-center group cursor-pointer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay: index * 0.2 },
                    }}
                  >
                    <span className="text-3xl block mb-2">{tech.icon}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{ background: 'hsl(var(--primary))' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Additional Skills */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 cyber-glass p-8 rounded-2xl">
            <h3 className="font-display text-xl font-bold mb-6 text-center text-gradient">
              Additional Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'JWT Authentication',
                'Protected Routes',
                'Custom Hooks',
                'HOCs',
                'REST APIs',
                'WebSockets',
                'Responsive Design',
                'Cross-browser Compatibility',
                'Agile/SDLC',
                'EdTech Platforms',
                'Event Management',
                'Real-time Features',
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 cyber-glass rounded-full text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CyberSkills;
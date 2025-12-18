import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React.js', level: 95, color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
  { name: 'TypeScript', level: 88, color: 'from-blue-400 to-indigo-500', icon: '📘' },
  { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-orange-500', icon: '🟨' },
  { name: 'Tailwind CSS', level: 90, color: 'from-teal-400 to-cyan-500', icon: '🎨' },
  { name: 'Redux Toolkit', level: 85, color: 'from-purple-400 to-violet-500', icon: '🔄' },
  { name: 'REST APIs', level: 88, color: 'from-green-400 to-emerald-500', icon: '🔗' },
  { name: 'WebSocket', level: 80, color: 'from-pink-400 to-rose-500', icon: '📡' },
  { name: 'Git/GitHub', level: 85, color: 'from-gray-400 to-zinc-500', icon: '🔀' },
];

const tools = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Redux', icon: '🔄' },
  { name: 'JWT', icon: '🔐' },
  { name: 'WebSocket', icon: '📡' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Git', icon: '🔀' },
  { name: 'Figma', icon: '🎭' },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--gradient-primary)' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">{'// Technical Skills'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technologies I <span className="gradient-text">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Constantly learning and evolving with the latest tech stack
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill Bars */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-xl font-semibold mb-8"
            >
              Core Proficiencies
            </motion.h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Tech Icons */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-xl font-semibold mb-8"
            >
              Tech Stack
            </motion.h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 40px rgba(0, 217, 255, 0.2)",
                  }}
                  className="glass-card p-4 rounded-xl text-center cursor-default group"
                >
                  <motion.span
                    className="text-3xl block mb-2"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {tool.icon}
                  </motion.span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

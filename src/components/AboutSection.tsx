import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: '2+', label: 'Years Experience', icon: Briefcase },
    { value: '10+', label: 'Projects Delivered', icon: Code2 },
    { value: '7.8', label: 'CGPA', icon: GraduationCap },
    { value: '∞', label: 'Learning Appetite', icon: Sparkles },
  ];

  return (
    <section id="about" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
 <span className="text-primary text-sm font-medium tracking-wider uppercase">
            About Me
          </span>          <h2 className="text-3xl sm:text-4xl font-bold mt-4">
            Crafting <span className="gradient-text">Digital</span> Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Transforming complex problems into elegant, user-centric solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Frontend Developer with over 2 years of experience 
              crafting intuitive and performant web applications. My expertise lies 
              in building scalable solutions using <span className="text-foreground font-medium">React.js</span>, 
              <span className="text-foreground font-medium"> Redux Toolkit</span>, and 
              <span className="text-foreground font-medium"> Tailwind CSS</span>.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I've worked extensively in <span className="text-foreground font-medium">EdTech</span> and 
              <span className="text-foreground font-medium"> Event Management</span> domains, 
              developing component libraries, authentication systems, and real-time 
              collaborative features.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My focus is on delivering enterprise-grade user interfaces that 
              combine exceptional user experience with clean, maintainable code 
              architecture.
            </p>
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">B.E. in Electrical & Electronics Engineering</h4>
                  <p className="text-muted-foreground text-sm">NIE Institute of Technology, Mysore • 2019-2023</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 rounded-2xl text-center hover-glow cursor-default group"
              >
                <motion.div
                  className="inline-block p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 group-hover:scale-110 transition-transform"
                >
                  <stat.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div
                  className="text-4xl font-bold gradient-text mb-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Code, Zap, Palette, Globe } from 'lucide-react';

const stats = [
  { number: '2+', label: 'Years Experience', icon: Zap },
  { number: '10+', label: 'Projects Delivered', icon: Code },
  { number: '5+', label: 'Tech Stacks', icon: Globe },
  { number: '100%', label: 'Dedication', icon: Palette },
];

const CyberAbout = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hex-pattern" />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
        style={{ background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm tracking-widest">{'// ABOUT ME'}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              <span className="text-gradient">Who</span> I Am
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Description */}
          <ScrollReveal direction="left">
            <div className="cyber-glass p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold mb-6 text-gradient">
                Frontend Developer & UI Enthusiast
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate <span className="text-primary font-semibold">Frontend Developer</span> with 
                  over 2 years of professional experience building enterprise-scale Single Page Applications 
                  using <span className="text-secondary font-semibold">React.js</span>.
                </p>
                <p>
                  I specialize in developing and maintaining shared React component libraries, enabling UI 
                  consistency and reuse across multiple teams. My expertise includes advanced state management 
                  using <span className="text-accent font-semibold">Redux Toolkit</span> for large-scale, 
                  multi-module applications.
                </p>
                <p>
                  Currently working at <span className="text-primary font-semibold">Excelsoft Technologies Ltd</span>, 
                  I've delivered interactive workflows including seat booking, scheduling, notifications, and 
                  email-based systems with real-time features using WebSockets.
                </p>
              </div>

              {/* Quick Info */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="cyber-glass p-4 rounded-lg">
                  <span className="text-muted-foreground text-sm">Location</span>
                  <p className="text-foreground font-semibold">Mysore, India</p>
                </div>
                <div className="cyber-glass p-4 rounded-lg">
                  <span className="text-muted-foreground text-sm">Education</span>
                  <p className="text-foreground font-semibold">B.E. in EEE</p>
                </div>
                <div className="cyber-glass p-4 rounded-lg">
                  <span className="text-muted-foreground text-sm">Company</span>
                  <p className="text-foreground font-semibold">Excelsoft Tech</p>
                </div>
                <div className="cyber-glass p-4 rounded-lg">
                  <span className="text-muted-foreground text-sm">Focus</span>
                  <p className="text-foreground font-semibold">React & UI/UX</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="scale" delay={index * 0.1}>
                <motion.div
                  className="cyber-glass p-6 rounded-2xl text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-xl cyber-glass flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                  </motion.div>
                  <div className="font-display text-4xl font-black text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberAbout;
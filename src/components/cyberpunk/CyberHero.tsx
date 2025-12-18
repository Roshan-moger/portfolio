import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronDown, Download } from 'lucide-react';
import profileImage from '@/assets/roshan-profile.jpg';

const CyberHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const socials = [
    { icon: Github, href: 'https://github.com/Roshan-moger', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/roshan-moger', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@roshanmoger.dev', label: 'Email' },
    { icon: Phone, href: 'tel:+918970035508', label: 'Phone' },
  ];

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-lines opacity-30" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))' }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Glitch Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="font-mono text-primary text-sm md:text-base tracking-widest">
                {'<'} HELLO WORLD {'/>'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="block text-foreground">I'M</span>
              <span 
                className="text-gradient glitch block" 
                data-text="ROSHAN"
              >
                ROSHAN
              </span>
              <span className="text-gradient-hot block">MOGER</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xl md:text-2xl">
                <span className="text-muted-foreground font-medium">
                  Associate Software Engineer
                </span>
                <motion.span
                  className="w-0.5 h-6 bg-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto lg:mx-0">
                Frontend Developer with <span className="text-primary font-semibold">2+ years</span> crafting 
                enterprise-scale SPAs. Passionate about creating <span className="text-secondary font-semibold">beautiful</span>, 
                interactive experiences.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-10"
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 cyber-glass rounded-xl group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="cyber-btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="cyber-btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-shrink-0 relative"
          >
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 -m-8 rounded-full border border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 -m-16 rounded-full border border-secondary/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 -m-24 rounded-full border border-accent/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent blur-3xl opacity-30 animate-pulse" />
            
            {/* Profile image container */}
            <div className="cyber-frame">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src={profileImage}
                  alt="Roshan Moger"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 cyber-glass px-4 py-2 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-primary font-mono text-sm">React.js</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 cyber-glass px-4 py-2 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-secondary font-mono text-sm">TypeScript</span>
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-8 cyber-glass px-4 py-2 rounded-full"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <span className="text-accent font-mono text-sm">UI/UX</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm font-mono">SCROLL</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CyberHero;
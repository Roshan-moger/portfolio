import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CyberLoader from '@/components/cyberpunk/CyberLoader';
import ParticleField from '@/components/ParticleField';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { GameSection } from '@/components/GameSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  if (isLoading) {
    return <CyberLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background Effects */}
      <ParticleField />

      <div className="scanlines" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
                <ProjectsSection />
  <GameSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
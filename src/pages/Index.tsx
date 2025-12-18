import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/cyberpunk/MatrixRain';
import CyberCursor from '@/components/cyberpunk/CyberCursor';
import CyberNav from '@/components/cyberpunk/CyberNav';
import CyberHero from '@/components/cyberpunk/CyberHero';
import CyberAbout from '@/components/cyberpunk/CyberAbout';
import CyberSkills from '@/components/cyberpunk/CyberSkills';
import CyberProjects from '@/components/cyberpunk/CyberProjects';
import CyberExperience from '@/components/cyberpunk/CyberExperience';
import CyberContact from '@/components/cyberpunk/CyberContact';
import CyberFooter from '@/components/cyberpunk/CyberFooter';
import CyberLoader from '@/components/cyberpunk/CyberLoader';

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
      <MatrixRain />
      <div className="scanlines" />
      
      {/* Custom Cursor */}
      <CyberCursor />
      
      {/* Navigation */}
      <CyberNav isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <CyberHero />
        <CyberAbout />
        <CyberSkills />
        <CyberProjects />
        <CyberExperience />
        <CyberContact />
      </main>
      
      <CyberFooter />
    </motion.div>
  );
};

export default Index;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberLoaderProps {
  onComplete: () => void;
}

const CyberLoader = ({ onComplete }: CyberLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING');

  useEffect(() => {
    const texts = [
      'INITIALIZING',
      'LOADING ASSETS',
      'CONFIGURING UI',
      'ESTABLISHING CONNECTION',
      'SYSTEM READY',
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        
        // Update text based on progress
        if (newProgress < 20) setText(texts[0]);
        else if (newProgress < 40) setText(texts[1]);
        else if (newProgress < 60) setText(texts[2]);
        else if (newProgress < 80) setText(texts[3]);
        else setText(texts[4]);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid-lines opacity-20" />

        {/* Central Loading UI */}
        <div className="relative text-center">
          {/* Animated Rings */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 border-2 border-secondary/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-8 border-2 border-accent/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-display text-4xl font-black text-gradient"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                RM
              </motion.span>
            </div>

            {/* Scanning Line */}
            <motion.div
              className="absolute inset-0 border-t-2 border-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-primary text-sm tracking-widest mb-4"
          >
            {text}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs text-muted-foreground">0%</span>
              <span className="font-mono text-xs text-primary">{Math.round(progress)}%</span>
              <span className="font-mono text-xs text-muted-foreground">100%</span>
            </div>
          </div>

          {/* Decorative Code Lines */}
          <div className="mt-8 font-mono text-xs text-muted-foreground/50 space-y-1">
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {'> system.boot()'}
            </motion.p>
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {'> loading_modules...'}
            </motion.p>
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {'> render_portfolio()'}
            </motion.p>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 font-mono text-xs text-primary/50">
          {'<CYBER_PORTFOLIO>'}
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-xs text-primary/50">
          {'</CYBER_PORTFOLIO>'}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CyberLoader;
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

const CyberFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <motion.span
              className="font-display text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.1 }}
            >
              RM<span className="text-accent">.</span>
            </motion.span>
            <span className="text-muted-foreground text-sm">
              © 2025 Roshan Moger. All rights reserved.
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            Made with
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-accent fill-accent" />
            </motion.div>
            using React & Framer Motion
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 cyber-glass rounded-full group"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default CyberFooter;
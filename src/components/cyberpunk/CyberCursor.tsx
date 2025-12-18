import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, [data-hover]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div 
          className={`w-5 h-5 rounded-full border-2 border-primary transition-all duration-200 ${
            isHovering ? 'bg-primary/30' : 'bg-transparent'
          }`}
        />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary blur-md" />
      </motion.div>

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          initial={{ x: position.x - 25, y: position.y - 25, scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[50px] h-[50px] rounded-full border border-primary" />
        </motion.div>
      )}
    </>
  );
};

export default CyberCursor;
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target } from "lucide-react";
import { BasketballSlingshotGame } from "./BasketballSlingshotGame";

export function GameSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-4 relative" ref={ref}>
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Take a Break
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-primary" />
            Basketball Slingshot
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the ball back on the slingshot, aim at the hoop, and release to shoot!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <BasketballSlingshotGame />
        </motion.div>
      </div>
    </section>
  );
}

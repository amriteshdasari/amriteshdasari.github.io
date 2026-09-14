"use client";
import { motion, useScroll, useSpring } from 'motion/react';

// Thin amber reading-progress bar along the top edge.
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-60 h-[2px] origin-left bg-linear-to-r from-accent-secondary via-accent-primary to-accent-primary"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  );
};

export default ReadingProgress;

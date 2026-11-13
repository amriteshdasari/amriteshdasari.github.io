"use client";
import { motion, useMotionValue, useSpring } from 'motion/react';

const MAX_TILT = 7; // degrees
const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };

// Leans its children toward the mouse pointer. Touch and pen input are
// ignored, and MotionConfig switches the movement off for reduced motion.
const Tilt = ({ children, className }) => {
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    rotateX.set((0.5 - y) * 2 * MAX_TILT);
    rotateY.set((x - 0.5) * 2 * MAX_TILT);
    event.currentTarget.style.setProperty('--glare-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--glare-y', `${y * 100}%`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
};

export default Tilt;

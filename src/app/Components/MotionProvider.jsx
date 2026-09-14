"use client";
import { MotionConfig } from 'motion/react';

// Every Motion animation follows the visitor's reduced-motion setting.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";
import React from 'react';
import { motion } from 'motion/react';
import { maskUp, stagger } from '../lib/animations';

// Word-by-word masked reveal for section headings. The animated words are
// hidden from assistive tech; a visually hidden copy carries the text.
export const WordReveal = ({ text, delay = 0, amount = 0.5 }) => {
  const words = text.split(' ');

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={stagger(0.06, delay)}
      >
        {words.map((word, wi) => (
          <React.Fragment key={`${word}-${wi}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.1em] mb-[-0.1em]">
              <motion.span variants={maskUp} className="inline-block">
                {word}
              </motion.span>
            </span>
            {wi < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </motion.span>
    </>
  );
};

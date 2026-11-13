"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';

const LINES = [
  'Hi!',
  'Hello again.',
  'Still waving.',
  'You found the easter egg.',
  'My arm is getting tired.',
  'The email button is right there ↓',
];

// The contact memoji waves back when poked, with a new line each time.
const WavingMemoji = () => {
  const [pokes, setPokes] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setPokes(pokes + 1)}
      className="group relative block cursor-pointer rounded-full"
      aria-label="Wave at Amritesh"
    >
      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border-subtle bg-background-secondary transition-colors duration-300 group-hover:border-accent-primary/40 sm:h-48 sm:w-48">
        {/* Re-keyed on every poke so the CSS wave restarts */}
        <div key={pokes} className={`absolute inset-0 ${pokes ? 'memoji-wave' : ''}`}>
          <Image
            src="/images/Himemoji.png"
            alt="Memoji of Amritesh waving"
            fill
            sizes="192px"
            className="object-contain"
          />
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {pokes > 0 && LINES[(pokes - 1) % LINES.length]}
      </span>
      <AnimatePresence mode="wait">
        {pokes > 0 && (
          <motion.span
            key={pokes}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute left-[68%] top-0 w-max max-w-[9.5rem] -translate-y-1/3 rounded-xl rounded-bl-sm border border-border bg-background-tertiary px-3.5 py-2 text-left font-mono text-xs text-text-primary shadow-lg sm:left-full sm:top-2 sm:ml-1 sm:max-w-[16rem] sm:translate-y-0"
          >
            {LINES[(pokes - 1) % LINES.length]}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default WavingMemoji;

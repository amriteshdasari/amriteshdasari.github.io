"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE } from '../lib/animations';
import { SKILLS } from '../lib/content';

// The motto, made literal: a queue of everything in the skills list that a
// visitor can consume one message at a time. Five messages make a level.

const ALL = SKILLS.flatMap((group) =>
  [...group.core, ...group.more].map((payload) => ({ payload, topic: group.label }))
);

// Fixed-seed shuffle, so the server render and the browser agree on the order.
const MESSAGES = (() => {
  const items = [...ALL];
  let seed = 20240201;
  for (let i = items.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items.map((item, offset) => ({ ...item, offset }));
})();

const VISIBLE = 5;
const PER_LEVEL = 5;

const KafkaQueue = () => {
  const [offset, setOffset] = useState(0);
  const total = MESSAGES.length;
  const lag = total - offset;
  const last = offset > 0 ? MESSAGES[offset - 1] : null;
  const level = Math.floor(offset / PER_LEVEL) + 1;
  const xp = offset % PER_LEVEL;
  const done = lag === 0;

  return (
    <div className="rounded-xl border border-border-subtle bg-background-secondary p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-xs text-text-tertiary">
        <span>
          <span className="text-accent-primary">topic:</span> experience
        </span>
        <span>
          offset {offset} · lag {lag}
        </span>
      </div>

      {/* The queue — the consumer reads from the left */}
      <div className="mt-4 flex h-11 items-center gap-2 overflow-hidden" aria-hidden="true">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-primary/40 bg-accent-subtle font-mono text-sm text-accent-primary">
          {done ? '✓' : '⇤'}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          {MESSAGES.slice(offset, offset + VISIBLE).map((message, index) => (
            <motion.span
              key={message.offset}
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: index === 0 ? 1 : 0.75 - index * 0.13, x: 0 }}
              exit={{ opacity: 0, x: -28, scale: 0.8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`h-9 w-12 shrink-0 items-center justify-center rounded-md border font-mono text-xs ${
                index > 2 ? 'hidden sm:flex' : 'flex'
              } ${
                index === 0
                  ? 'border-accent-primary/50 text-accent-primary'
                  : 'border-border text-text-tertiary'
              }`}
            >
              {String(message.offset).padStart(2, '0')}
            </motion.span>
          ))}
        </AnimatePresence>
        {lag > 3 && (
          <span className="shrink-0 font-mono text-xs text-text-tertiary">
            <span className="sm:hidden">+{lag - 3}</span>
            {lag > VISIBLE && <span className="hidden sm:inline">+{lag - VISIBLE}</span>}
          </span>
        )}
      </div>

      <p className="mt-4 min-h-10 font-mono text-xs leading-relaxed text-text-secondary" aria-live="polite">
        {done ? (
          <>
            <span className="text-accent-primary">caught up.</span> Queue drained — the producer
            is still writing.
          </>
        ) : last ? (
          <>
            <span className="text-text-tertiary">consumed #{String(last.offset).padStart(2, '0')} →</span>{' '}
            <span className="text-text-primary">{last.payload}</span>{' '}
            <span className="text-text-tertiary">({last.topic.toLowerCase()})</span>
          </>
        ) : (
          <span className="text-text-tertiary">
            {total} messages waiting. Go on, consume one.
          </span>
        )}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOffset(done ? 0 : offset + 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 font-mono text-xs text-text-primary transition-colors duration-300 hover:border-accent-primary/50 hover:bg-background-hover active:bg-background-tertiary"
        >
          <span className="text-accent-primary" aria-hidden="true">
            {done ? '↺' : '▸'}
          </span>
          {done ? 'replay from offset 0' : 'consume()'}
        </button>

        <div className="flex items-center gap-3 font-mono text-xs text-text-tertiary">
          <span>
            level <span className="text-text-primary">{level}</span>
          </span>
          <span className="flex gap-1" aria-hidden="true">
            {Array.from({ length: PER_LEVEL }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full transition-colors duration-300 ${
                  i < xp ? 'bg-accent-primary' : 'bg-background-hover'
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KafkaQueue;

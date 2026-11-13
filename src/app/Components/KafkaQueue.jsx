"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE } from '../lib/animations';
import { SKILLS, STACK_COUNTS } from '../lib/content';

// The motto, made literal: a queue of everything in the skills list that a
// visitor can consume one message at a time. Each poll shows the request that
// was sent and the record that came back as pretty-printed JSON. Five
// messages make a level.

const ALL = SKILLS.flatMap((group) =>
  [...group.core, ...group.more].map((skill) => ({
    skill,
    key: group.label.toLowerCase(),
    dailyDriver: group.core.includes(skill),
  }))
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

const TOPIC = 'experience';
const GROUP = 'visitors';

// Pretty-prints a plain value as syntax-coloured JSON, two spaces per level.
const Json = ({ value, depth = 0 }) => {
  if (typeof value === 'string') return <span className="text-accent-primary">&quot;{value}&quot;</span>;
  if (typeof value === 'number') return <span className="text-sky-300">{value}</span>;
  if (typeof value === 'boolean') return <span className="text-violet-300">{String(value)}</span>;

  const entries = Object.entries(value);
  const indent = '  '.repeat(depth + 1);
  return (
    <>
      <span className="text-text-tertiary">{'{'}</span>
      {entries.map(([key, child], index) => (
        <React.Fragment key={key}>
          {'\n'}
          {indent}
          <span className="text-text-primary">&quot;{key}&quot;</span>
          <span className="text-text-tertiary">: </span>
          <Json value={child} depth={depth + 1} />
          {index < entries.length - 1 && <span className="text-text-tertiary">,</span>}
        </React.Fragment>
      ))}
      {'\n'}
      {'  '.repeat(depth)}
      <span className="text-text-tertiary">{'}'}</span>
    </>
  );
};

const PanelLabel = ({ children, aside }) => (
  <div className="flex items-center justify-between border-b border-border-subtle px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
    <span>{children}</span>
    {aside}
  </div>
);

const KafkaQueue = () => {
  const [offset, setOffset] = useState(0);
  const total = MESSAGES.length;
  const lag = total - offset;
  const last = offset > 0 ? MESSAGES[offset - 1] : null;
  const level = Math.floor(offset / PER_LEVEL) + 1;
  const xp = offset % PER_LEVEL;
  const done = lag === 0;

  // Before the first poll the panel previews the request that is about to go out.
  const requestOffset = last ? last.offset : 0;
  const record = last && {
    topic: TOPIC,
    partition: 0,
    offset: last.offset,
    key: last.key,
    value: {
      skill: last.skill,
      daily_driver: last.dailyDriver,
      projects: STACK_COUNTS[last.skill] ?? 0,
    },
    consumer: { group: GROUP, lag, level },
  };

  return (
    <div className="rounded-xl border border-border-subtle bg-background-secondary p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-xs text-text-tertiary">
        <span>
          <span className="text-accent-primary">topic:</span> {TOPIC}
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

      {/* Request */}
      <div className="mt-4 overflow-hidden rounded-lg border border-border-subtle bg-background-primary">
        <PanelLabel>request</PanelLabel>
        <pre className="whitespace-pre-wrap break-all px-3 py-2.5 font-mono text-xs leading-relaxed text-text-secondary">
          <span className="font-medium text-emerald-300">GET</span>{' '}
          <span className="text-text-primary">/topics/{TOPIC}/partitions/0/records</span>
          <span className="text-text-tertiary">?</span>offset
          <span className="text-text-tertiary">=</span>
          <span className="text-sky-300">{requestOffset}</span>
          <span className="text-text-tertiary">&amp;</span>count
          <span className="text-text-tertiary">=</span>
          <span className="text-sky-300">1</span>
          {'\n'}
          <span className="text-text-tertiary">Accept:</span> application/vnd.kafka.json.v2+json
          {'\n'}
          <span className="text-text-tertiary">X-Consumer-Group:</span> {GROUP}
        </pre>
      </div>

      {/* Response — a fixed height, so the page never jumps between records */}
      <div className="mt-2 overflow-hidden rounded-lg border border-border-subtle bg-background-primary">
        <PanelLabel
          aside={
            record ? (
              <span className="normal-case tracking-normal text-emerald-300">
                200 OK{done && <span className="text-text-tertiary"> · end of partition</span>}
              </span>
            ) : (
              <span className="normal-case tracking-normal">not sent yet</span>
            )
          }
        >
          response
        </PanelLabel>
        <div className="h-[21rem] overflow-auto px-3 py-2.5" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {record ? (
              <motion.pre
                key={record.offset}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-xs leading-relaxed text-text-secondary"
              >
                <Json value={record} />
              </motion.pre>
            ) : (
              <motion.p
                key="empty"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-xs leading-relaxed text-text-tertiary"
              >
                {'// '}
                {total} records waiting on this partition.
                <br />
                {'// '}Send the request to consume the first one.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOffset(done ? 0 : offset + 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 font-mono text-xs text-text-primary transition-colors duration-300 hover:border-accent-primary/50 hover:bg-background-hover active:bg-background-tertiary"
        >
          <span className="text-accent-primary" aria-hidden="true">
            {done ? '↺' : '▸'}
          </span>
          {done ? 'seek to offset 0' : last ? 'poll next record' : 'send request'}
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

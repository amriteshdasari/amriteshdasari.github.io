"use client";
import React, { useEffect, useState } from 'react';
import { EMAIL } from '../lib/content';

// Copies the address for visitors whose mail link does nothing useful.
const CopyEmail = () => {
  const [state, setState] = useState('idle'); // idle | copied | failed

  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 font-mono text-xs text-text-secondary transition-colors duration-300 hover:border-accent-primary/40 hover:text-text-primary"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {state === 'copied' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        )}
      </svg>
      <span aria-live="polite">
        {state === 'copied' ? 'copied' : state === 'failed' ? 'copy blocked by browser' : 'copy address'}
      </span>
    </button>
  );
};

export default CopyEmail;

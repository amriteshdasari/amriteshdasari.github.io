"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { EASE } from '../lib/animations';
import {
  ARCHIVE,
  CAREER_START,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PROJECT_COUNT,
  RESUME_URL,
  SKILLS,
  TIMELINE,
} from '../lib/content';

// A toy shell over the site's own content. Every answer is read from
// lib/content.js, so the terminal never drifts from the pages.

const PROJECTS = ARCHIVE.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title }))
);

const SECTIONS = {
  home: '/#home',
  about: '/#about',
  skills: '/#skills',
  experience: '/#experience',
  projects: '/#projects',
  contact: '/#contact',
  archive: '/projects/',
};

const HELP = [
  ['whoami', 'who you are talking to'],
  ['ls', `list all ${PROJECT_COUNT} projects`],
  ['cat <n>', 'print a project, e.g. cat 3'],
  ['open <n>', 'jump to a project in the archive'],
  ['skills', 'languages, frameworks, infrastructure'],
  ['experience', 'the timeline so far'],
  ['goto <section>', Object.keys(SECTIONS).join(' · ')],
  ['email', 'copy the email address'],
  ['resume · github · linkedin', 'open in a new tab'],
  ['uptime', 'time in production'],
  ['clear · exit', 'tidy up, or leave'],
];

const COMPLETIONS = [
  'help', 'whoami', 'ls', 'cat', 'open', 'skills', 'experience', 'goto', 'email',
  'resume', 'github', 'linkedin', 'uptime', 'clear', 'exit', 'sudo',
];

const SUGGESTIONS = ['help', 'whoami', 'ls', 'skills', 'experience', 'sudo hire amritesh'];

const Hi = ({ children }) => <span className="text-accent-primary">{children}</span>;
const Dim = ({ children }) => <span className="text-text-tertiary">{children}</span>;
const Strong = ({ children }) => <span className="text-text-primary">{children}</span>;

const pad = (n) => String(n).padStart(2, '0');

const findProject = (query) => {
  if (!query) return null;
  const n = Number(query);
  if (Number.isInteger(n) && n >= 1 && n <= PROJECTS.length) return PROJECTS[n - 1];
  const q = query.toLowerCase();
  return (
    PROJECTS.find((p) => p.id === q) ||
    PROJECTS.find((p) => p.id.includes(q) || p.name.toLowerCase().includes(q)) ||
    null
  );
};

const uptime = () => {
  const now = new Date();
  let months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 + now.getMonth() - CAREER_START.getMonth();
  if (now.getDate() < CAREER_START.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'}, ${months % 12} month${months % 12 === 1 ? '' : 's'}`;
};

// Returns { lines, effect }. `effect` runs after the output is printed.
const run = (input, { navigate, close, clear }) => {
  const [name, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(' ');
  const command = name.toLowerCase();

  switch (command) {
    case 'help':
    case '?':
      return {
        lines: HELP.map(([usage, desc]) => (
          <span key={usage} className="flex flex-wrap gap-x-3">
            <span className="w-52 shrink-0 text-accent-primary">{usage}</span>
            <Dim>{desc}</Dim>
          </span>
        )),
      };

    case 'whoami':
      return {
        lines: [
          <Strong key="n">Mohan Amritesh Dasari</Strong>,
          'Software Engineer · Backend & Applied AI',
          <Dim key="c">Currently · SDE @ Princeton IT Services</Dim>,
        ],
      };

    case 'ls':
    case 'projects':
      return {
        lines: [
          ...PROJECTS.map((project, index) => (
            <span key={project.id} className="flex gap-3">
              <Hi>{pad(index + 1)}</Hi>
              <span>
                {project.name} <Dim>· {project.group}</Dim>
              </span>
            </span>
          )),
          <Dim key="hint">cat &lt;n&gt; to read one · open &lt;n&gt; to jump to it</Dim>,
        ],
      };

    case 'cat':
    case 'open': {
      const project = findProject(arg);
      if (!project) {
        return {
          lines: [
            arg
              ? `${command}: no project matches "${arg}". Try ls.`
              : `usage: ${command} <number or name>, e.g. ${command} 1`,
          ],
        };
      }
      if (command === 'open') {
        return {
          lines: [<span key="o">opening <Hi>{project.name}</Hi>…</span>],
          effect: () => {
            navigate(`/projects/#${project.id}`);
            close();
          },
        };
      }
      return {
        lines: [
          <Strong key="n">{project.name}</Strong>,
          <Dim key="c">
            {project.context}
            {project.period ? ` · ${project.period}` : ''}
          </Dim>,
          <Hi key="s">{project.stack.join(' · ')}</Hi>,
          ...project.bullets.map((bullet) => (
            <span key={bullet} className="flex gap-2">
              <Hi>›</Hi>
              <span>{bullet}</span>
            </span>
          )),
        ],
      };
    }

    case 'skills':
      return {
        lines: SKILLS.flatMap((group) => [
          <Hi key={group.label}>{group.label.toLowerCase()}/</Hi>,
          <span key={`${group.label}-items`} className="pl-4">
            <Strong>{group.core.join(', ')}</Strong>
            <Dim>, {group.more.join(', ')}</Dim>
          </span>,
        ]),
      };

    case 'experience':
    case 'history':
      return {
        lines: TIMELINE.map((entry) => (
          <span key={entry.title} className="flex flex-wrap gap-x-3">
            <span className="w-44 shrink-0 text-accent-primary">{entry.period}</span>
            <span>
              <Strong>{entry.title}</Strong> <Dim>· {entry.subtitle}</Dim>
            </span>
          </span>
        )),
      };

    case 'goto':
    case 'cd': {
      const target = SECTIONS[arg.toLowerCase().replace(/^[#/~]+/, '') || 'home'];
      if (!target) {
        return { lines: [`${command}: no such section. Try: ${Object.keys(SECTIONS).join(', ')}`] };
      }
      return {
        lines: [<Dim key="g">→ {target}</Dim>],
        effect: () => {
          navigate(target);
          close();
        },
      };
    }

    case 'email':
    case 'contact':
      return {
        lines: [
          <a key="m" href={`mailto:${EMAIL}`} className="text-accent-primary underline underline-offset-4">
            {EMAIL}
          </a>,
          <Dim key="c">copied to your clipboard, if your browser allowed it</Dim>,
        ],
        effect: () => navigator.clipboard?.writeText(EMAIL).catch(() => {}),
      };

    case 'resume':
    case 'github':
    case 'linkedin': {
      const url = { resume: RESUME_URL, github: GITHUB_URL, linkedin: LINKEDIN_URL }[command];
      return {
        lines: [
          <span key="l">
            opening{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent-primary underline underline-offset-4">
              {command}
            </a>{' '}
            in a new tab…
          </span>,
        ],
        effect: () => window.open(url, '_blank', 'noopener,noreferrer'),
      };
    }

    case 'uptime':
      return {
        lines: [
          <span key="u">
            up <Hi>{uptime()}</Hi> in production · {PROJECT_COUNT} projects shipped · 0 regrets logged
          </span>,
        ],
      };

    case 'sudo':
      if (/^hire\b/i.test(arg)) {
        return {
          lines: [
            <Hi key="a">Access granted. Excellent decision.</Hi>,
            <span key="b">
              Next step:{' '}
              <a href={`mailto:${EMAIL}`} className="text-accent-primary underline underline-offset-4">
                {EMAIL}
              </a>
            </span>,
          ],
        };
      }
      return {
        lines: [
          'visitor is not in the sudoers file. This incident will be reported.',
          <Dim key="h">(there is exactly one sudo command that works here)</Dim>,
        ],
      };

    case 'clear':
      return { lines: [], effect: clear };

    case 'exit':
    case 'quit':
    case 'q':
      return { lines: [<Dim key="b">bye.</Dim>], effect: close };

    case 'pwd':
      return { lines: ['/home/visitor/amriteshdasari.github.io'] };

    case 'echo':
      return { lines: [arg] };

    case 'rm':
      return { lines: ['Nice try. The backups are fault-tolerant.'] };

    default:
      return {
        lines: [
          <span key="e">
            command not found: {name}. Type <Hi>help</Hi> to see what works.
          </span>,
        ],
      };
  }
};

const WELCOME = {
  id: 0,
  lines: [
    <span key="w">
      Welcome to <Hi>mad-sh</Hi>. Type <Hi>help</Hi>, or tap a suggestion below.
    </span>,
  ],
};

const Terminal = ({ onClose }) => {
  const router = useRouter();
  const [entries, setEntries] = useState([WELCOME]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(1);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const panelRef = useRef(null);

  // Lock page scroll while the terminal is open and give focus back afterwards.
  useEffect(() => {
    const previous = document.activeElement;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      root.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  const submit = (raw) => {
    const input = raw.trim();
    setValue('');
    setCursor(-1);
    if (!input) return;
    setHistory((items) => [input, ...items]);

    const { lines, effect } = run(input, {
      navigate: (href) => router.push(href),
      close: onClose,
      clear: () => setEntries([]),
    });
    const id = nextId.current++;
    setEntries((items) => [...items, { id, input, lines }]);
    effect?.();
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit(value);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : '');
    } else if (event.key === 'Tab' && !event.shiftKey && value && !value.includes(' ')) {
      // Complete a command name; an empty prompt lets Tab move focus as usual.
      const match = COMPLETIONS.find((name) => name.startsWith(value.toLowerCase()));
      if (match) {
        event.preventDefault();
        event.stopPropagation();
        setValue(match === value ? value : `${match} `);
      }
    }
  };

  // Escape closes; Tab stays inside the dialog.
  const onPanelKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = panelRef.current?.querySelectorAll('button, input, a[href]');
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-70 flex items-start justify-center bg-background-primary/70 px-3 pt-[9dvh] backdrop-blur-sm sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onKeyDown={onPanelKeyDown}
        className="flex h-[min(34rem,72dvh)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-background-secondary shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="flex items-center justify-between border-b border-border-subtle bg-background-tertiary/60 py-1 pl-4 pr-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-tertiary">visitor@mad: ~</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center gap-2 rounded-md px-3 font-mono text-xs text-text-tertiary transition-colors duration-300 hover:text-text-primary"
          >
            <span className="hidden rounded border border-border px-1.5 py-0.5 sm:inline" aria-hidden="true">
              esc
            </span>
            close
          </button>
        </div>

        <div
          ref={logRef}
          className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[13px] leading-relaxed text-text-secondary"
          aria-live="polite"
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus();
          }}
        >
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.input && (
                <p className="text-text-primary">
                  <Hi>❯</Hi> {entry.input}
                </p>
              )}
              <div className="mt-1 space-y-1">
                {entry.lines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ul className="flex gap-1.5 overflow-x-auto border-t border-border-subtle px-4 py-2.5" aria-label="Suggested commands">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  submit(suggestion);
                  inputRef.current?.focus({ preventScroll: true });
                }}
                className="rounded-md border border-border-subtle bg-background-tertiary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-300 hover:border-accent-primary/40 hover:text-accent-primary"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>

        <label className="flex items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono">
          <span className="text-accent-primary" aria-hidden="true">
            ❯
          </span>
          <span className="sr-only">Command</span>
          {/* 16px on phones stops iOS from zooming the page on focus */}
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onInputKeyDown}
            className="terminal-input w-full bg-transparent text-base text-text-primary caret-accent-primary outline-none placeholder:text-text-tertiary sm:text-sm"
            placeholder="type a command…"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
          />
        </label>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;

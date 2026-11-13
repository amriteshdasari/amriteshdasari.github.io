"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { EASE, stagger } from '../lib/animations';

// Loaded on first open, so the terminal costs nothing until someone asks for it.
const Terminal = dynamic(() => import('./Terminal'), { ssr: false });

const NAV_ITEMS = [
  { title: 'About', num: '01', href: '/#about', id: 'about' },
  { title: 'Skills', num: '02', href: '/#skills', id: 'skills' },
  { title: 'Experience', num: '03', href: '/#experience', id: 'experience' },
  { title: 'Projects', num: '04', href: '/#projects', id: 'projects' },
  { title: 'Contact', num: '05', href: '/#contact', id: 'contact' },
  { title: 'Archive', num: '++', href: '/projects/', id: null },
];

// The hero is observed too, so scrolling back to the top clears the highlight.
const OBSERVED_IDS = ['home', ...NAV_ITEMS.filter((item) => item.id).map((item) => item.id)];

const normalize = (path) => path.replace(/\/$/, '') || '/';

const mobileItem = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

const NavBar = () => {
  const pathname = usePathname();
  const isHome = normalize(pathname) === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [terminalOpen, setTerminalOpen] = useState(false);

  // ⌘K / Ctrl+K toggles the terminal; "/" opens it when nothing is being typed.
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setTerminalOpen((open) => !open);
      } else if (
        event.key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '')
      ) {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' }
    );
    OBSERVED_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const isItemActive = (item) => {
    if (!item.id) return normalize(pathname) === normalize(item.href);
    return isHome && activeSection === item.id;
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
        scrolled || menuOpen
          ? 'border-border-subtle bg-background-primary/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link
          href="/"
          className="group font-display text-2xl font-semibold tracking-tight text-text-primary transition-colors duration-300 hover:text-accent-primary"
          aria-label="Mohan Amritesh Dasari — home"
        >
          MAD
          <span className="inline-block text-accent-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            .
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="ml-auto hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <li key={item.title} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? 'location' : undefined}
                  className={`group flex items-baseline gap-1.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      active ? 'text-accent-primary' : 'text-text-tertiary group-hover:text-accent-primary'
                    }`}
                  >
                    {item.num}
                  </span>
                  {item.title}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 md:ml-6">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setTerminalOpen(true);
          }}
          className="group flex h-11 items-center gap-2 rounded-lg px-2 font-mono text-xs text-text-secondary transition-colors duration-300 hover:text-text-primary"
          aria-label="Open terminal"
          aria-haspopup="dialog"
        >
          <span className="rounded-md border border-border px-2 py-1.5 transition-colors duration-300 group-hover:border-accent-primary/50 group-hover:text-accent-primary">
            <span className="text-accent-primary">&gt;</span>_
          </span>
          <kbd className="hidden font-mono text-text-tertiary lg:inline" aria-hidden="true">
            ⌘K
          </kbd>
        </button>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-text-secondary transition-colors duration-300 hover:text-text-primary md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-border-subtle md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1 px-6 py-4"
              variants={stagger(0.05)}
              initial="hidden"
              animate="visible"
            >
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <motion.li key={item.title} variants={mobileItem}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'location' : undefined}
                      className={`flex items-baseline gap-3 border-l-2 py-2.5 pl-4 transition-colors duration-300 ${
                        active
                          ? 'border-accent-primary text-text-primary'
                          : 'border-transparent text-text-secondary hover:border-border-hover hover:text-text-primary'
                      }`}
                    >
                      <span className="font-mono text-xs text-accent-primary">{item.num}</span>
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Outside the header: its backdrop blur would trap a fixed overlay. */}
    <AnimatePresence>
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
    </AnimatePresence>
    </>
  );
};

export default NavBar;

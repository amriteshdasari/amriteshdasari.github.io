import Image from 'next/image';
import { WordReveal } from './TextReveal';
import { EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/content';

const LINKS = [
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Résumé', href: RESUME_URL },
];

const ContactSection = () => (
  <section id="contact" className="relative scroll-mt-24 overflow-x-clip pt-24 lg:pt-32">
    <span
      className="text-ghost pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 select-none font-display text-[22vw] italic leading-none lg:text-[16rem]"
      aria-hidden="true"
    >
      fin
    </span>

    <div className="relative mx-auto w-full max-w-4xl px-6 lg:px-12">
      <div className="flex w-full flex-col items-center gap-7 text-center">
        <p className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-accent-primary/60" aria-hidden="true" />
          <span className="text-accent-primary">05</span>
          <span className="text-text-tertiary">Contact</span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-accent-primary/60" aria-hidden="true" />
        </p>

        <div className="relative">
          <div
            className="absolute -inset-5 rounded-full bg-linear-to-br from-accent-primary/20 via-accent-primary/5 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border-subtle bg-background-secondary sm:h-48 sm:w-48">
            <Image
              src="/images/Himemoji.png"
              alt="Memoji of Amritesh waving"
              fill
              sizes="192px"
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="font-display text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-6xl">
          <WordReveal text="The next chapter is unwritten." />
        </h2>

        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
          I&rsquo;m open to new opportunities. Whether you have a role in mind, a question, or an
          idea worth building — let&rsquo;s talk.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-3 rounded-lg bg-accent-primary px-7 py-3.5 text-base font-semibold text-background-primary shadow-[0_10px_30px_-12px_rgba(245,158,11,0.5)] transition-colors duration-300 hover:bg-accent-secondary"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {EMAIL}
        </a>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-sm">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors duration-300 hover:text-accent-primary"
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-24 border-t border-border-subtle py-8">
        <div className="flex flex-col items-center justify-between gap-3 font-mono text-xs text-text-tertiary sm:flex-row">
          <span>© {new Date().getFullYear()} Mohan Amritesh Dasari</span>
          <span className="italic">
            — fin<span className="text-accent-primary">.</span> (for now) —
          </span>
          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>
    </div>
  </section>
);

export default ContactSection;

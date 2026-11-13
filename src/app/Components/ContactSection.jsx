import CopyEmail from './CopyEmail';
import WavingMemoji from './WavingMemoji';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../lib/content';

const LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Résumé', href: RESUME_URL },
];

const ContactSection = () => (
  <section id="contact" className="relative scroll-mt-24 overflow-x-clip pt-20 lg:pt-28">
    <div className="relative mx-auto w-full max-w-4xl px-6 lg:px-12">
      <div className="flex w-full flex-col items-center gap-7 text-center">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
          <span className="text-accent-primary">05</span>
          <span className="text-text-tertiary">Contact</span>
        </p>

        <div className="relative">
          <WavingMemoji />
        </div>

        <h2 className="font-display text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl">
          The next chapter is unwritten.
        </h2>

        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
          I&rsquo;m open to new opportunities. Whether you have a role in mind, a question, or an
          idea worth building — let&rsquo;s talk.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-3 rounded-lg bg-accent-primary px-7 py-3.5 text-base font-semibold text-background-primary transition-colors duration-300 hover:bg-accent-secondary"
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

        <div className="-mt-3">
          <CopyEmail />
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-mono text-sm">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-2 text-text-secondary transition-colors duration-300 hover:text-accent-primary"
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

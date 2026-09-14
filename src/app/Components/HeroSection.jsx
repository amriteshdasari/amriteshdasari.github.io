import Image from 'next/image';
import { EMAIL, PROJECT_COUNT, RESUME_URL } from '../lib/content';

const FACTS = [
  { value: '2+', label: 'years in production' },
  { value: String(PROJECT_COUNT), label: 'projects shipped' },
  { value: 'M.S.', label: 'Computer Science, UIUC' },
];

// Staggers the CSS entrance animations (.enter-rise / .enter-mask in globals.css).
const delay = (ms) => ({ '--delay': `${ms}ms` });

const HeroSection = () => (
  <section
    id="home"
    className="relative flex min-h-svh items-center pt-24 pb-16 scroll-mt-24 lg:pt-32"
  >
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Copy */}
        <div className="space-y-7 lg:col-span-7">
          <p
            className="enter-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary"
            style={delay(0)}
          >
            <span className="h-px w-10 bg-accent-primary/60" aria-hidden="true" />
            <span>
              Software Engineer <span className="text-accent-primary">·</span> Distributed Systems
            </span>
          </p>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl xl:text-7xl">
            <span className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
              <span className="enter-mask" style={delay(80)}>
                Mohan Amritesh
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
              <span className="enter-mask" style={delay(180)}>
                Dasari<span className="text-accent-primary">.</span>
              </span>
            </span>
          </h1>

          <p
            className="enter-rise max-w-xl text-xl font-medium leading-snug text-balance text-text-primary sm:text-2xl"
            style={delay(320)}
          >
            I build reliable services, tighten feedback loops with automation, and keep latency
            predictable at scale.
          </p>

          <p
            className="enter-rise max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            style={delay(420)}
          >
            Backend, data, and platform engineering — from enterprise AI chatbots to Snowflake
            pipelines and fault-tolerant distributed systems.
          </p>

          <div className="enter-rise flex flex-wrap items-center gap-3 pt-1" style={delay(520)}>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-lg bg-accent-primary px-6 py-3 text-base font-semibold text-background-primary shadow-[0_10px_30px_-12px_rgba(245,158,11,0.45)] transition-colors duration-300 hover:bg-accent-secondary"
            >
              Get in touch
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold text-text-primary transition-colors duration-300 hover:border-border-hover hover:bg-background-hover"
            >
              Résumé
              <span className="text-text-tertiary" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <dl
            className="enter-rise grid max-w-xl grid-cols-3 gap-4 border-t border-border-subtle pt-6"
            style={delay(620)}
          >
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-xs leading-snug text-text-tertiary">
                  {fact.label}
                </dt>
                <dd className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait — first on phones so the face and name share the opening screen */}
        <div
          className="enter-rise order-first flex flex-col items-start lg:order-none lg:col-span-5 lg:items-end"
          style={delay(200)}
        >
          <div className="group relative w-48 sm:w-60 lg:w-full lg:max-w-[420px]">
            <div
              className="absolute -inset-3 rounded-3xl bg-linear-to-br from-accent-primary/25 via-accent-primary/5 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <span
              className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-accent-primary/70 transition-all duration-500 group-hover:-top-4 group-hover:-left-4"
              aria-hidden="true"
            />
            <span
              className="absolute -right-3 -bottom-3 h-8 w-8 border-r-2 border-b-2 border-accent-primary/70 transition-all duration-500 group-hover:-right-4 group-hover:-bottom-4"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-2xl border border-border-subtle">
              <Image
                src="/images/amritesh-portrait.webp"
                alt="Mohan Amritesh Dasari standing under autumn maple leaves"
                width={720}
                height={900}
                preload
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <p className="absolute -bottom-4 left-1/2 hidden w-max -translate-x-1/2 items-center gap-2 rounded-full border border-border-subtle bg-background-secondary px-4 py-2 lg:flex">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(245,158,11,0.7)]"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-text-secondary">
                Currently · SDE @ Princeton IT Services
              </span>
            </p>
          </div>

          <p className="mt-5 flex items-center gap-2 font-mono text-xs text-text-secondary lg:hidden">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(245,158,11,0.7)]"
              aria-hidden="true"
            />
            Currently · SDE @ Princeton IT Services
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;

import { WordReveal } from './TextReveal';

// Section opener: a ghost numeral beside a mono kicker and a serif title
// that reveals word by word. Everything except the title words is static.
const ChapterHeading = ({ number, kicker, title, lead }) => (
  <div className="relative mb-12 lg:mb-16">
    <div className="relative">
      {/* The ghost numeral sits clear of the kicker: above it on phones, level with it on desktop. */}
      <div className="relative mb-4">
        <span
          className="text-ghost pointer-events-none absolute right-0 bottom-[0.12em] select-none font-display text-[6rem] font-bold leading-none sm:text-[8rem] lg:bottom-[-0.22em] lg:text-[13rem]"
          aria-hidden="true"
        >
          {number}
        </span>
        <p className="relative flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]">
          <span className="text-accent-primary">{number}</span>
          <span className="h-px w-12 bg-linear-to-r from-accent-primary/60 to-transparent" aria-hidden="true" />
          <span className="text-text-tertiary">{kicker}</span>
        </p>
      </div>

      <h2 className="relative font-display text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-6xl">
        <WordReveal text={title} />
      </h2>

      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{lead}</p>
      )}
    </div>
  </div>
);

export default ChapterHeading;

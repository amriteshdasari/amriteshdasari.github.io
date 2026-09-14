import { WordReveal } from './TextReveal';

// Section opener: a ghost numeral behind a mono kicker and a serif title
// that reveals word by word. Everything except the title words is static.
const ChapterHeading = ({ number, kicker, title, lead }) => (
  <div className="relative mb-12 lg:mb-16">
    <span
      className="text-ghost pointer-events-none absolute -top-14 -left-3 select-none font-display text-[8rem] font-bold leading-none lg:-top-20 lg:text-[12rem]"
      aria-hidden="true"
    >
      {number}
    </span>

    <div className="relative">
      <p className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]">
        <span className="text-accent-primary">{number}</span>
        <span className="h-px w-12 bg-linear-to-r from-accent-primary/60 to-transparent" aria-hidden="true" />
        <span className="text-text-tertiary">{kicker}</span>
      </p>

      <h2 className="font-display text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl lg:text-6xl">
        <WordReveal text={title} />
      </h2>

      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{lead}</p>
      )}
    </div>
  </div>
);

export default ChapterHeading;

// Section opener: a numbered mono kicker, a serif title, and an optional lead.
const ChapterHeading = ({ number, kicker, title, lead }) => (
  <div className="mb-10 lg:mb-14">
    <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
      <span className="text-accent-primary">{number}</span>
      <span className="h-px w-8 bg-border-hover" aria-hidden="true" />
      <span className="text-text-tertiary">{kicker}</span>
    </p>

    <h2 className="font-display text-4xl font-semibold tracking-tight text-balance text-text-primary sm:text-5xl">
      {title}
    </h2>

    {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">{lead}</p>}
  </div>
);

export default ChapterHeading;

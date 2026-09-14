// Atmosphere layer: a warm amber glow from the top of the page and a static
// film grain. Pure CSS — nothing animates and nothing waits on JavaScript.
const BackgroundFX = () => (
  <>
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(245, 158, 11, 0.07) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
    <div className="grain pointer-events-none fixed inset-0 z-0 opacity-[0.045]" aria-hidden="true" />
  </>
);

export default BackgroundFX;

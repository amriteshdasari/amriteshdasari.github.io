// Shared Motion vocabulary. The site keeps a deliberately small set of moves:
// masked heading reveals, the self-drawing timeline, and one signature ease.

export const EASE = [0.22, 1, 0.36, 1];

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
});

// Masked reveal — pair with an `overflow-hidden` wrapper span.
export const maskUp = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE }
  }
};

// Shared Motion vocabulary: one ease and a stagger helper.

export const EASE = [0.22, 1, 0.36, 1];

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
});

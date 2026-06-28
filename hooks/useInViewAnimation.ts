import { useInView } from 'framer-motion';
import { useRef } from 'react';

export interface InViewAnimationOptions {
  once?: boolean;
  threshold?: number;
  margin?: string;
}

export function useInViewAnimation(options: InViewAnimationOptions = {}) {
  const { once = true, threshold = 0.15, margin = '0px 0px -50px 0px' } = options;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  return { ref, isInView };
}

// ─── Reusable animation variants ──────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

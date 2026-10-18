import Lenis from 'lenis';
import { mountScrollWorld } from './scroll-world/scrub-engine.js';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initWorld() {
  const container = document.querySelector<HTMLElement>('[data-world]');
  if (!container?.dataset.config) return;

  // Scroll suave salvo que se pida menos movimiento. El motor lee window.scrollY, que Lenis mantiene.
  const lenis = prefersReducedMotion() ? null : new Lenis({ anchors: true, lerp: 0.1, autoRaf: true });

  const config = JSON.parse(container.dataset.config);
  mountScrollWorld(container, {
    ...config,
    scrollTo: (y: number) => (lenis ? lenis.scrollTo(y) : window.scrollTo({ top: y })),
  });
}

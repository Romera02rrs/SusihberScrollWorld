/** Aparición suave de los bloques marcados con [data-reveal] al entrar en pantalla. */
export function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  items.forEach((item) => observer.observe(item));
}

/** Tagline: cada palabra se activa al cruzar una línea al 60% de la pantalla, en orden de lectura. */
export function initTagline() {
  const words = document.querySelectorAll<HTMLElement>('[data-word]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Activa si está por encima de la línea, también cuando ya ha salido por arriba.
        const on = entry.isIntersecting || entry.boundingClientRect.top < 0;
        entry.target.classList.toggle('is-on', on);
      });
    },
    { rootMargin: '0px 0px -40% 0px' },
  );
  words.forEach((word) => observer.observe(word));
}

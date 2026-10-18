import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type NetworkInformation = { saveData?: boolean };

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll suave con Lenis, sincronizado con ScrollTrigger. */
function initSmoothScroll() {
  if (prefersReducedMotion()) return;
  const lenis = new Lenis({ anchors: true, lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function initWorld() {
  const section = document.querySelector<HTMLElement>('[data-world]');
  if (!section) return;

  const stops = [...section.querySelectorAll<HTMLElement>('[data-stop]')];
  const posters = [...section.querySelectorAll<HTMLElement>('[data-poster]')];
  const rail = [...section.querySelectorAll<HTMLElement>('[data-rail]')];
  const video = section.querySelector<HTMLVideoElement>('[data-world-video]');
  const times = stops.map((stop) => Number(stop.dataset.time));

  initSmoothScroll();

  // Parada activa: la que cruza la línea central de la pantalla.
  let active = -1;
  const setActive = (index: number) => {
    if (index === active) return;
    active = index;
    stops.forEach((stop, i) => stop.toggleAttribute('data-active', i === index));
    rail.forEach((item, i) => item.toggleAttribute('data-active', i === index));
    posters.forEach((poster, i) => {
      poster.classList.toggle('opacity-100', i === index);
      poster.classList.toggle('opacity-0', i !== index);
    });
  };

  const stopObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(stops.indexOf(entry.target as HTMLElement));
      });
    },
    { rootMargin: '-49% 0px -49% 0px' },
  );
  stops.forEach((stop) => stopObserver.observe(stop));
  setActive(0);

  // Sin vídeo si el usuario pide menos movimiento o ahorro de datos: quedan los fundidos entre pósters.
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!video || prefersReducedMotion() || connection?.saveData) return;

  // Posición de scroll en la que el centro de cada parada pasa por el centro de la pantalla.
  let points: number[] = [];
  const measure = () => {
    const viewport = window.innerHeight;
    points = stops.map((stop) => {
      const rect = stop.getBoundingClientRect();
      return rect.top + window.scrollY + rect.height / 2 - viewport / 2;
    });
  };

  // Interpolación lineal por tramos entre paradas: cada parada cae en su fotograma clave.
  const timeAt = (scroll: number) => {
    if (!points.length || scroll <= points[0]) return times[0];
    for (let i = 1; i < points.length; i++) {
      if (scroll <= points[i]) {
        const progress = (scroll - points[i - 1]) / (points[i] - points[i - 1]);
        return times[i - 1] + progress * (times[i] - times[i - 1]);
      }
    }
    return times[times.length - 1];
  };

  // Nunca se encola una búsqueda mientras el decodificador sigue buscando: evita que se congele.
  let ready = false;
  let target = 0;
  const seek = () => {
    if (!ready || video.seeking) return;
    if (Math.abs(video.currentTime - target) < 1 / 48) return;
    video.currentTime = target;
  };
  video.addEventListener('seeked', seek);

  measure();
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    onRefresh: measure,
    onUpdate: (self) => {
      target = timeAt(self.scroll());
      seek();
    },
  });

  video.addEventListener(
    'loadeddata',
    async () => {
      // Prepara el primer fotograma (iOS no pinta el vídeo hasta reproducirlo una vez).
      try {
        await video.play();
      } catch {
        // Si el navegador bloquea la reproducción, la búsqueda sigue funcionando.
      }
      video.pause();
      ready = true;
      target = timeAt(window.scrollY);
      video.currentTime = target;
      video.classList.replace('opacity-0', 'opacity-100');
    },
    { once: true },
  );

  // Se descarga entero como Blob: así siempre se puede buscar, aunque el servidor no admita rangos.
  const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
  const src = portrait ? video.dataset.srcMobile : video.dataset.src;
  if (!src) return;

  const load = () =>
    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`No se pudo cargar el vídeo (${response.status})`);
        return response.blob();
      })
      .then((blob) => {
        video.src = URL.createObjectURL(blob);
        video.load();
      })
      .catch(() => {
        // Sin vídeo, el recorrido sigue con los pósters de cada parada.
      });

  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1500 });
  else setTimeout(load, 300);
}

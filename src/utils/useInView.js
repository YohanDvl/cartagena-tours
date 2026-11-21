import { useEffect, useRef, useState } from 'react';

/**
 * Devuelve [ref, inView]. `inView` pasa a true cuando el elemento está cerca de
 * la pantalla (margen configurable) y se queda en true. Sirve para cargar fotos
 * solo cuando hacen falta, sin depender del lazy-loading nativo del navegador.
 */
export function useInView(rootMargin = '400px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (inView || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}

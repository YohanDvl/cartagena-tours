import { useEffect } from 'react';

export const SITE_URL = 'https://youtourscartagena.vercel.app';
const DEFAULT_TITLE = 'YouTours Cartagena | Tours, Pasadías e Islas del Rosario';

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function toAbsolute(src) {
  if (!src) return `${SITE_URL}/images/islas_del_rosario.png`;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}/${src.replace(/^\.?\//, '')}`;
}

/**
 * Actualiza título, descripción, canonical, Open Graph y datos estructurados
 * de cada página para que Google indexe cada tour/apartamento por separado.
 */
export default function Seo({ title, description, path = '/', image, noindex = false, jsonLd }) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;
  useEffect(() => {
    const fullTitle = title ? `${title} | YouTours Cartagena` : DEFAULT_TITLE;
    const url = `${SITE_URL}${path}`;
    const img = toAbsolute(image);

    document.title = fullTitle;
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', img);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let script = null;
    if (ld) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'page';
      script.textContent = ld;
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, image, noindex, ld]);

  return null;
}

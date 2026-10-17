import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCountry } from '../../context/country';
export default function Seo() {
  const m = useCountry();
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const page = parts[1] || 'home';
    const project = parts[2] && m.projects.find(p => p.slug === parts[2]);
    const missing = !['home', 'about', 'portfolio', 'contact'].includes(page) || parts.length > 2 && !project;
    document.title = (missing ? 'Page not found' : project?.title || m.seo[page]?.title || m.seo.home.title) + ' | Nova Development';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = missing ? 'This page is unavailable.' : project?.description || m.seo[page]?.description || m.seo.home.description;
    document.documentElement.lang = m.locale;
  }, [m, pathname]);
  return null;
}

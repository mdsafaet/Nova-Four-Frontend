import PageHeading from '../components/common/PageHeading';
import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountry } from '../context/country';
import NotFound from './NotFound';
const PropertyGallery = lazy(() => import('../components/common/PropertyGallery'));
export default function ProjectDetails() {
  const m = useCountry();
  const {
    slug
  } = useParams();
  const p = m.projects.find(p => p.slug === slug);
  if (!p) return <NotFound country={m.id} />;
  return <section className="nvx-shell nvx-section nvx-page"><Link className="text-link" to={'/' + m.id + '/portfolio'}>← Back to collection</Link><PageHeading label={p.location + " / " + p.type} title={p.title} /><p className="disclosure">Illustrative project. Gallery images are visual references, not photographs of this listing.</p><Suspense fallback={<p role="status">Loading gallery…</p>}><PropertyGallery images={p.images} /></Suspense><div className="detail-grid"><div><h2>A closer look.</h2><p>{p.description}</p></div><dl>{[['Market', m.name], ['Location', p.location], ['Currency', m.currency], ['Price', 'Not provided'], ['Area & bedrooms', 'To be confirmed'], ['Availability', 'To be confirmed']].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div><Link className="button" to={'/' + m.id + '/contact?project=' + encodeURIComponent(p.slug)}>Enquire about this project</Link></section>;
}

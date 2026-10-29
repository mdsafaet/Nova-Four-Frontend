import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { useCountry } from '../context/country';
import NotFound from './NotFound';
import PropertyCard from '../components/common/PropertyCard';
import '../styles/portfolio-country.css';

export default function ProjectDetails() {
  const market = useCountry();
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const project = (market.projects || []).find((item) => item.slug === slug);

  useEffect(() => setActiveImage(0), [slug]);

  if (market.projectsLoading) return <section className="nvp4-detail nvx-shell"><p role="status">Loading project…</p></section>;
  if (market.projectsError) return <section className="nvp4-detail nvx-shell"><p role="alert">Project details could not be loaded. Please try again.</p></section>;
  if (!project) return <NotFound country={market.id} />;

  const images = project.images || [];
  const facts = [
    ...(project.location ? [{ label: 'Location', value: project.location }] : []),
    ...(project.type ? [{ label: 'Typology', value: project.type }] : []),
    ...(Array.isArray(project.facts) ? project.facts.filter((fact) => fact?.label && fact?.value && !['location', 'typology'].includes(fact.label.toLowerCase())) : []),
  ];
  const related = (market.projects || []).filter((item) => item.slug !== project.slug).slice(0, 3);

  return <div className="nvp4-page">
    <section className="nvp4-hero nvp4-detail-hero" aria-labelledby="nvp4-project-title">
      {images[0] && <img className="nvp4-hero-image" src={images[0].src} alt="" fetchPriority="high" />}
      <div className="nvp4-hero-shade" />
      <div className="nvx-shell nvp4-hero-content">
        <nav className="nvp4-breadcrumb" aria-label="Breadcrumb"><Link to={`/${market.id}`}>Home</Link><span>/</span><Link to={`/${market.id}/portfolio`}>Portfolio</Link><span>/</span><span>{project.title}</span></nav>
        <p className="nvp4-eyebrow">{market.name} / {project.type || 'Project'}</p>
        <h1 id="nvp4-project-title">{project.title}</h1>
        {project.location && <p className="nvp4-hero-location"><MapPin size={17} aria-hidden="true" />{project.location}</p>}
      </div>
    </section>

    <section className="nvp4-detail nvx-shell" aria-labelledby="nvp4-overview-title">
      <div className="nvp4-detail-head"><div><p className="nvp4-eyebrow">Project overview</p><h2 id="nvp4-overview-title">A closer look.</h2></div><Link className="nvp4-outline" to={`/${market.id}/portfolio`}><ArrowLeft size={17} aria-hidden="true" /> Back to portfolio</Link></div>
      <div className="nvp4-detail-layout">
        <div>
          {images.length > 0 && <div className="nvp4-gallery"><div className="nvp4-featured"><img src={images[activeImage]?.src} alt={images[activeImage]?.alt || project.title} /></div>{images.length > 1 && <div className="nvp4-thumbs" aria-label="Project images">{images.map((image, index) => <button key={`${image.src}-${index}`} type="button" className={index === activeImage ? 'is-active' : ''} aria-label={`Show image ${index + 1}`} aria-pressed={index === activeImage} onClick={() => setActiveImage(index)}><img src={image.src} alt="" loading="lazy" /></button>)}</div>}</div>}
          {project.description && <div className="nvp4-description"><h3>About this project</h3><p>{project.description}</p></div>}
        </div>
        <aside className="nvp4-detail-side">
          {facts.length > 0 && <div className="nvp4-facts"><h3>Project facts</h3><dl>{facts.map((fact, index) => <div key={`${fact.label}-${index}`}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></div>}
          <div className="nvp4-enquire"><h3>Interested in this project?</h3><Link to={`/${market.id}/contact?project=${encodeURIComponent(project.slug)}`}>Enquire about this project <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </aside>
      </div>
    </section>

    {related.length > 0 && <section className="nvp4-related nvx-shell" aria-labelledby="nvp4-related-title"><div className="nvp4-section-heading"><p className="nvp4-eyebrow">More projects</p><h2 id="nvp4-related-title">Explore the collection.</h2></div><div className="nvp4-grid">{related.map((item) => <PropertyCard key={item.slug} project={item} />)}</div></section>}
  </div>;
}

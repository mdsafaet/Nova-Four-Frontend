import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useCountry } from '../context/country';
import PropertyCard from '../components/common/PropertyCard';
import '../styles/portfolio-country.css';

export default function Portfolio() {
  const market = useCountry();
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');
  const allProjects = market.projects || [];
  const types = useMemo(() => ['All', ...new Set(allProjects.map((project) => project.type).filter(Boolean))], [allProjects]);
  const projects = useMemo(() => allProjects.filter((project) => {
    const matchesType = type === 'All' || project.type === type;
    const text = `${project.title || ''} ${project.location || ''}`.toLowerCase();
    return matchesType && text.includes(query.trim().toLowerCase());
  }), [allProjects, type, query]);
  // const heroImage = allProjects.find((project) => project.images?.[0]?.src)?.images[0];

  return (
    <div className="nvp4-page">
<section className="nvp4-hero" aria-labelledby="nvp4-title">
  <div className="nvx-shell nvp4-hero-content">
    <nav className="nvp4-breadcrumb" aria-label="Breadcrumb">
      <Link to={`/${market.id}`}>Home</Link>
      <span>/</span>
      <span>Portfolio</span>
    </nav>

    <p className="nvp4-eyebrow">{market.name} / Portfolio</p>
    <h1 id="nvp4-title">
      Places designed<br />
      <span>for possibility.</span>
    </h1>
    <p>Explore projects in {market.name}.</p>
    <a className="nvp4-hero-link" href="#nvp4-projects">
      Explore projects ↓
    </a>
  </div>
</section>

      <section id="nvp4-projects" className="nvp4-archive nvx-shell" aria-labelledby="nvp4-archive-title">
        <div className="nvp4-section-heading"><p className="nvp4-eyebrow">Project archive</p><h2 id="nvp4-archive-title">The collection.</h2></div>
        {market.projectsLoading ? <p role="status">Loading projects…</p> : market.projectsError ? <p role="alert">Projects could not be loaded. Please try again.</p> : <>
          <div className="nvp4-controls">
            <div className="nvp4-filter" aria-label="Filter projects by type"><SlidersHorizontal size={18} aria-hidden="true" />{types.map((item) => <button key={item} type="button" aria-pressed={type === item} onClick={() => setType(item)}>{item}<span>{item === 'All' ? allProjects.length : allProjects.filter((project) => project.type === item).length}</span></button>)}</div>
            <label className="nvp4-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search projects</span><input type="search" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          </div>
          <p className="nvp4-count" role="status">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
          {projects.length ? <div className="nvp4-grid">{projects.map((project) => <PropertyCard key={project.slug} project={project} />)}</div> : <div className="nvp4-empty"><h3>No projects found.</h3>{(type !== 'All' || query) && <button type="button" onClick={() => { setType('All'); setQuery(''); }}><RotateCcw size={17} aria-hidden="true" /> Clear filters</button>}</div>}
        </>}
      </section>
    </div>
  );
}

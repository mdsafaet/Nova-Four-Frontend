import PageHeading from '../components/common/PageHeading';
import { useState } from 'react';
import { useCountry } from '../context/country';
import PropertyCard from '../components/common/PropertyCard';
export default function Portfolio() {
  const m = useCountry();
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');
  const projects = m.projects.filter(p => (type === 'All' || p.type === type) && (p.title + ' ' + p.location).toLowerCase().includes(query.toLowerCase()));
  return <section className="nvx-shell nvx-section nvx-page"><PageHeading label={"Portfolio / " + m.name} title={"Find a place to belong."} /><p className="disclosure">Illustrative listings only. Images do not depict actual properties for sale.</p><div className="filters"><div className="filter-buttons" aria-label="Property type">{['All', ...new Set(m.projects.map(p => p.type))].map(t => <button key={t} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}</div><label>Search collection<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Project or location" /></label></div><p role="status">{projects.length} illustrative {projects.length === 1 ? 'project' : 'projects'}</p><div className="nvx-property-grid">{projects.map(p => <PropertyCard key={p.slug} project={p} />)}</div>{!projects.length && <div className="empty"><h2>No matching projects.</h2><button className="button" onClick={() => {
        setQuery('');
        setType('All');
      }}>Clear filters</button></div>}</section>;
}

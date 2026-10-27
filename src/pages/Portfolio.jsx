import { useState } from 'react';
import PageHeading from '../components/common/PageHeading';
import PropertyCard from '../components/common/PropertyCard';
import { useCountry } from '../context/country';

export default function Portfolio() {
  const market = useCountry();
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');

  const allProjects = market.projects || [];
  const types = ['All', ...new Set(allProjects.map((project) => project.type).filter(Boolean))];

  const projects = allProjects.filter((project) => {
    const matchesType = type === 'All' || project.type === type;
    const searchText = `${project.title || ''} ${project.location || ''}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());

    return matchesType && matchesQuery;
  });

  return (
    <section className="nvx-shell nvx-section nvx-page">
      <PageHeading
        label={`Portfolio / ${market.name}`}
        title="Find a place to belong."
      />

      {market.id !== 'bangladesh' && (
        <p className="disclosure">
          Illustrative listings only. Images do not depict actual properties for sale.
        </p>
      )}

      {market.projectsLoading ? (
        <p role="status">Loading projects…</p>
      ) : market.projectsError ? (
        <p role="alert">Projects could not be loaded. Please try again.</p>
      ) : (
        <>
          <div className="filters">
            <div className="filter-buttons" aria-label="Property type">
              {types.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={type === item}
                  onClick={() => setType(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label>
              Search collection
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Project or location"
              />
            </label>
          </div>

          <p role="status">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>

          <div className="nvx-property-grid">
            {projects.map((project, index) => (
              <PropertyCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="empty">
              <h2>No matching projects.</h2>
              {(type !== 'All' || query) && (
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    setType('All');
                    setQuery('');
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
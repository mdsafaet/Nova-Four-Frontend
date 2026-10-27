import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeading from '../components/common/PageHeading';
import { useCountry } from '../context/country';
import NotFound from './NotFound';

const PropertyGallery = lazy(
  () => import('../components/common/PropertyGallery')
);

export default function ProjectDetails() {
  const market = useCountry();
  const { slug } = useParams();

  if (market.projectsLoading) {
    return (
      <section className="nvx-shell nvx-section nvx-page">
        <p role="status">Loading project…</p>
      </section>
    );
  }

  if (market.projectsError) {
    return (
      <section className="nvx-shell nvx-section nvx-page">
        <p role="alert">
          Project details could not be loaded. Please try again.
        </p>
      </section>
    );
  }

  const project = (market.projects || []).find(
    (item) => item.slug === slug
  );

  if (!project) {
    return <NotFound country={market.id} />;
  }

  const extraFacts = Array.isArray(project.facts)
    ? project.facts.filter((fact) => fact?.label && fact?.value)
    : [];

  const facts = [
    ...(project.location
      ? [{ label: 'Location', value: project.location }]
      : []),

    ...(project.type
      ? [{ label: 'Typology', value: project.type }]
      : []),

    ...extraFacts,
  ];

  return (
    <section className="nvx-shell nvx-section nvx-page">
      <Link
        className="text-link"
        to={`/${market.id}/portfolio`}
      >
        ← Back to collection
      </Link>

      <PageHeading
        label={market.name}
        title={project.title}
      />

      {project.images?.length > 0 && (
        <Suspense fallback={<p role="status">Loading gallery…</p>}>
          <PropertyGallery images={project.images} />
        </Suspense>
      )}

      <div className="detail-grid">
        <div>
          <h2>A closer look.</h2>
          {project.description && <p>{project.description}</p>}
        </div>

        {facts.length > 0 && (
          <dl>
            {facts.map((fact, index) => (
              <div key={`${fact.label}-${index}`}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <Link
        className="button"
        to={`/${market.id}/contact?project=${encodeURIComponent(project.slug)}`}
      >
        Enquire about this project
      </Link>
    </section>
  );
}
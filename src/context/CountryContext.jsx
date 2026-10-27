import { useEffect, useState } from 'react';
import { CountryContext } from './country';
import { countries } from '../countries';
import { getData } from '../api/api';
import NotFound from '../pages/NotFound';

export default function CountryProvider({ country, children }) {
  const market = countries[country];
  const isBangladesh = country === 'bangladesh';

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(isBangladesh);
  const [projectsError, setProjectsError] = useState(false);

  useEffect(() => {
    if (!isBangladesh) return;

    const controller = new AbortController();

    getData('/bangladesh/projects', {}, { signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return;

        setProjects(Array.isArray(response?.data) ? response.data : []);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        console.error('Could not load Bangladesh projects:', error);
        setProjectsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setProjectsLoading(false);
        }
      });

    return () => controller.abort();
  }, [isBangladesh]);

  if (!market) return <NotFound />;

  const value = isBangladesh
    ? { ...market, projects, projectsLoading, projectsError }
    : market;

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}
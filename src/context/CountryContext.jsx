import { useEffect, useState } from 'react';
import { CountryContext } from './country';
import { countries } from '../countries';
import { getData } from '../api/api';
import NotFound from '../pages/NotFound';

export default function CountryProvider({ country, children }) {
  const market = countries[country];
 const usesCmsProjects = ['bangladesh', 'dubai', 'usa'].includes(country);

  const [projectState, setProjectState] = useState({
    country: null,
    projects: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    if (!usesCmsProjects) return;

    const controller = new AbortController();

    setProjectState({
      country,
      projects: [],
      loading: true,
      error: false,
    });

    getData(`/${country}/projects`, {}, { signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return;

        setProjectState({
          country,
          projects: Array.isArray(response?.data) ? response.data : [],
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        console.error(`Could not load ${country} projects:`, error);

        setProjectState({
          country,
          projects: [],
          loading: false,
          error: true,
        });
      });

    return () => controller.abort();
  }, [country, usesCmsProjects]);

  if (!market) return <NotFound />;

  const currentProjects =
    projectState.country === country
      ? projectState.projects
      : [];

  const value = usesCmsProjects
    ? {
        ...market,
        projects: currentProjects,
        projectsLoading:
          projectState.country !== country || projectState.loading,
        projectsError:
          projectState.country === country && projectState.error,
      }
    : market;

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}
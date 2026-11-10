import { createBrowserRouter } from 'react-router-dom';

import CountryProvider from '../../context/CountryContext';
import MainLayouts from '../../layouts/MainLayouts';

import Home from '../../pages/Home';
import About from '../../pages/About';
import Portfolio from '../../pages/Portfolio';
import ProjectDetails from '../../pages/ProjectDetails';
import Contact from '../../pages/Contact';
import NotFound from '../../pages/NotFound';

// Country selection based on the website domain
const countryDomains = {
  'novadevelopment.bd': 'bangladesh',
  'www.novadevelopment.bd': 'bangladesh',

  'novadevelopment.ae': 'dubai',
  'www.novadevelopment.ae': 'dubai',

  'novadevelopment.us': 'usa',
  'www.novadevelopment.us': 'usa',

  'novadevelopment.uk': 'uk',
  'www.novadevelopment.uk': 'uk',
};

// Select the correct country for the homepage
const hostname = window.location.hostname.toLowerCase();

const defaultCountry =
  countryDomains[hostname] || 'bangladesh';

const routes = createBrowserRouter([
  // Domain-specific homepage
  {
    path: '/',
    element: (
      <CountryProvider country={defaultCountry}>
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country={defaultCountry} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound country={defaultCountry} /> },
    ],
  },

  // Existing Bangladesh routes
  {
    path: '/bangladesh',
    element: (
      <CountryProvider country="bangladesh">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="bangladesh" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound country="bangladesh" /> },
    ],
  },

  // Existing USA routes
  {
    path: '/usa',
    element: (
      <CountryProvider country="usa">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="usa" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound country="usa" /> },
    ],
  },

  // Existing UK routes
  {
    path: '/uk',
    element: (
      <CountryProvider country="uk">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="uk" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound country="uk" /> },
    ],
  },

  // Existing Dubai routes
  {
    path: '/dubai',
    element: (
      <CountryProvider country="dubai">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="dubai" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:slug', element: <ProjectDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound country="dubai" /> },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
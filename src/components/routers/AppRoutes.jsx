import { createBrowserRouter } from 'react-router-dom';
import CountryProvider from '../../context/CountryContext';
import MainLayouts from '../../layouts/MainLayouts';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Portfolio from '../../pages/Portfolio';
import ProjectDetails from '../../pages/ProjectDetails';
import Contact from '../../pages/Contact';
import NotFound from '../../pages/NotFound';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <CountryProvider country="bangladesh">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="bangladesh" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/bangladesh',
    element: (
      <CountryProvider country="bangladesh">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="bangladesh" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'portfolio/:slug',
        element: <ProjectDetails />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound country="bangladesh" />,
      },
    ],
  },
  {
    path: '/usa',
    element: (
      <CountryProvider country="usa">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="usa" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'portfolio/:slug',
        element: <ProjectDetails />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound country="usa" />,
      },
    ],
  },
  {
    path: '/uk',
    element: (
      <CountryProvider country="uk">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="uk" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'portfolio/:slug',
        element: <ProjectDetails />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound country="uk" />,
      },
    ],
  },
  {
    path: '/dubai',
    element: (
      <CountryProvider country="dubai">
        <MainLayouts />
      </CountryProvider>
    ),
    errorElement: <NotFound country="dubai" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'portfolio/:slug',
        element: <ProjectDetails />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound country="dubai" />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
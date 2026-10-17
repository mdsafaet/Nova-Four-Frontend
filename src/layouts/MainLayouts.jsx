import { useCountry } from '../context/country';
import '../styles/country-themes.css';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Seo from '../components/common/Seo';
export default function MainLayouts() {
  const market = useCountry();
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({
      preventScroll: true
    });
  }, [pathname]);
  return <div className="nvx-site" data-country={market.id}><a className="skip-link" href="#main">Skip to content</a><Header key={pathname} /><Seo /><main id="main" tabIndex={-1}><Outlet key={pathname.split('/')[1]} /></main><Footer /></div>;
}

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useCountry } from '../context/country';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Seo from '../components/common/Seo';
import '../styles/country-themes.css';

export default function MainLayouts() {
  const market = useCountry();
  const { pathname } = useLocation();
  const isArabic = market.id === 'dubai';

  useEffect(() => {
    document.documentElement.lang = market.locale;
    document.documentElement.dir = 'ltr';
  }, [market.locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="nvx-site" data-country={market.id}>
      <a className="skip-link" href="#main">
        {isArabic ? 'انتقل إلى المحتوى' : 'Skip to content'}
      </a>

      <Header key={pathname} />
      <Seo />

      <main id="main" tabIndex={-1}>
        <Outlet key={pathname.split('/')[1]} />
      </main>

      <Footer />
    </div>
  );
}
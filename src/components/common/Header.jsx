import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useCountry } from '../../context/country';
import { getData } from '../../api/api';


export default function Header() {
  const market = useCountry();
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState(null);
  const toggle = useRef(null);

  useEffect(() => {
    setHeader(null);

    if (market.id !== 'bangladesh') return;

    const controller = new AbortController();

    getData('/bangladesh/header', {}, { signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setHeader(response?.data ?? null);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error('Could not load Bangladesh header:', error);
        }
      });

    return () => controller.abort();
  }, [market.id]);

  const navigation = [
    ['', 'Home'],
    ['about', 'About'],
    ['portfolio', 'Portfolio'],
    ['contact', 'Contact'],
  ];

  const links = navigation.map(([to, label]) => (
    <NavLink
      end
      key={to}
      onClick={() => setOpen(false)}
      to={'/' + market.id + (to ? '/' + to : '')}
    >
      {label}
    </NavLink>
  ));

  const fallbackLogo =
    market.id === 'dubai'
      ? '/images/nova-dubai-logo.svg'
      : '/images/nova-logo.svg';

  const logo = header?.logoUrl || fallbackLogo;
  const ctaText = header?.ctaText?.trim() || 'Enquire';

  return (
    <header className="nvx-header">
      <div className="nvx-shell nvx-header-main">
        <Link
          className="nvx-brand"
          to={'/' + market.id}
          aria-label="Nova Development home"
        >
          <img
            src={logo}
            alt="Nova Development"
            width="160"
            height="60"
          />
        </Link>

        <nav className="nvx-desktop-nav" aria-label="Main navigation">
          {links}
        </nav>

        <div className="nvx-header-actions">
          <Link
            className="nvx-button nvx-header-cta"
            to={'/' + market.id + '/contact'}
          >
            {ctaText}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>

          <button
            ref={toggle}
            className="nvx-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nvx-mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="nvx-mobile-nav"
          className="nvx-mobile-nav nvx-shell"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links}
        </nav>
      )}
    </header>
  );
}
import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useCountry } from '../../context/country';

export default function Header() {
  const market = useCountry();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const navigation = [['', 'Home'], ['about', 'About'], ['portfolio', 'Portfolio'], ['contact', 'Contact']];
  const links = navigation.map(([to, label]) => (
    <NavLink end key={to} onClick={() => setOpen(false)} to={'/' + market.id + (to ? '/' + to : '')}>{label}</NavLink>
  ));
  return (
    <header className="nvx-header">
      <div className="nvx-shell nvx-header-main">
        <Link className="nvx-brand" to={'/' + market.id} aria-label="Nova Development home">
          <img src="/images/nova-logo.svg" alt="Nova Development" width="160" height="60" />
        </Link>
        <nav className="nvx-desktop-nav" aria-label="Main navigation">{links}</nav>
        <div className="nvx-header-actions">
          <Link className="nvx-button nvx-header-cta" to={'/' + market.id + '/contact'}>Enquire <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <button ref={toggle} className="nvx-menu-toggle" aria-expanded={open} aria-controls="nvx-mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>
      {open && <nav id="nvx-mobile-nav" className="nvx-mobile-nav nvx-shell" aria-label="Mobile navigation" onKeyDown={event => {if(event.key === 'Escape'){setOpen(false);toggle.current?.focus();}}}>{links}</nav>}
    </header>
  );
}

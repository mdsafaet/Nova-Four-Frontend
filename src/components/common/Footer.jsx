import { Link } from 'react-router-dom';
import { useCountry } from '../../context/country';
import { countryOptions } from '../../countries';

export default function Footer() {
  const m = useCountry();
  return (
    <footer className="nvx-footer nvx-dark">
      <div className="nvx-shell nvx-footer-grid">
        <div><Link className="nvx-brand" to={'/' + m.id}><img src="/images/nova-logo-white.svg" alt="Nova Development" width="190" height="54" /></Link><p>Distinct places. A considered perspective.</p><small>Illustrative content only.</small></div>
        <div><h3>Explore {m.name}</h3>{[['', 'Home'], ['about', 'About'], ['portfolio', 'Portfolio'], ['contact', 'Contact']].map(([p, l]) => <Link key={p} to={'/' + m.id + (p ? '/' + p : '')}>{l}</Link>)}</div>
        <div><h3>Our markets</h3>{countryOptions.map(c => <Link key={c.id} to={'/' + c.id}>{c.name}</Link>)}</div>
        <div><h3>Contact</h3><p>{m.contact.office}</p><p>{m.contact.email || 'Email to be confirmed'}</p><p>{m.contact.phone || 'Phone to be confirmed'}</p></div>
      </div>
      <div className="nvx-shell nvx-footer-bottom"><span>© {new Date().getFullYear()} Nova Development.All rights reserved.</span><span>{m.name} </span></div>
    </footer>
  );
}

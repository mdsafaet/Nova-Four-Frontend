import { Link } from 'react-router-dom';
import { useCountry } from '../../context/country';
import { countryOptions } from '../../countries';

const contact = {
  office: 'Rupayan Shopping Square, 10th Floor, Unit-A & B, Plot No. C-2, Block-G, Sayem Sobhan Anvir Road, Bashundhara Residential Area, Dhaka-1229, Bangladesh',
  email: 'info@novadevelopmentglobal.com',
  phone: '+880 9606 707 707',
};

export default function Footer() {
  const m = useCountry();
  return (
    <footer className="nvx-footer nvx-dark">
      <div className="nvx-shell nvx-footer-grid">
        <div><Link className="nvx-brand" to={'/' + m.id}><img src="/images/nova-logo-white.svg" alt="Nova Development" width="190" height="54" /></Link><p>Distinct places. A considered perspective.</p><small>Illustrative content only.</small></div>
        <div><h3>Explore {m.name}</h3>{[['', 'Home'], ['about', 'About'], ['portfolio', 'Portfolio'], ['contact', 'Contact']].map(([p, l]) => <Link key={p} to={'/' + m.id + (p ? '/' + p : '')}>{l}</Link>)}</div>
        <div><h3>Our markets</h3>{countryOptions.map(c => <Link key={c.id} to={'/' + c.id}>{c.name}</Link>)}</div>
        <div>
          <h3>Contact</h3>
          <p>{contact.office}</p>
          <p><a href={'mailto:' + contact.email}>{contact.email}</a></p>
          <p><a href={'tel:' + contact.phone.replace(/\s/g, '')}>{contact.phone}</a></p>
        </div>
      </div>
      <div className="nvx-shell nvx-footer-bottom"><span>© {new Date().getFullYear()} Nova Development. All rights reserved.</span><span>{m.name}</span></div>
    </footer>
  );
}

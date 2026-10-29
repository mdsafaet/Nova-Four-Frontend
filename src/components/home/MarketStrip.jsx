import '../../styles/hero.css';
import { Link } from 'react-router-dom';
import { ReactCountryFlag } from 'react-country-flag';
import { Reveal } from '../company-profile/Float';

const markets = [
  { code: 'AE', path: '/dubai', name: 'UAE', city: 'Dubai', status: 'Operating' },
  { code: 'BD', path: '/bangladesh', name: 'Bangladesh', city: 'Dhaka', status: 'Operating' },
  { code: 'US', path: '/usa', name: 'USA', city: 'New York', status: 'Expanding' },
  { code: 'GB', path: '/uk', name: 'UK', city: 'London', status: 'Operating' },
];

export default function MarketStrip() {
  return (
    <nav id="global-presence" className="nvh-market-strip" aria-label="Explore our markets">
      <div className="nvx-shell">
        <ul className="nvh-market-grid">
          {markets.map((market, index) => (
            <li key={market.code}>
              <Reveal delay={index * 0.1}>
                <Link className="nvh-market-link" to={market.path}>
                  <span className="nvh-market-identity">
                    <span className="nvh-flag" style={{ animationDelay: index * 0.5 + 's' }}>
                      <ReactCountryFlag
                        countryCode={market.code}
                        svg
                        aria-hidden="true"
                        style={{ width: '2.4rem', height: '1.6rem', borderRadius: '3px', objectFit: 'cover', display: 'block', background: 'transparent', boxShadow: '0 0 0 1px rgba(255,255,255,.25)' }}
                      />
                    </span>
                    <span><span className="nvh-market-name">{market.name}</span><span className="nvh-market-city">{market.city}</span></span>
                  </span>
                  <span className="nvh-status"><span className="nvh-status-dot" aria-hidden="true" />{market.status}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

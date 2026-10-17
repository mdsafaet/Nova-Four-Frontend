import { Link } from 'react-router-dom';
import { ReactCountryFlag } from 'react-country-flag';
import { LuArrowUpRight } from 'react-icons/lu';
import { countryOptions } from '../../countries';
import Float, { Reveal } from '../company-profile/Float';
import SectionHeading from '../common/SectionHeading';

// ISO codes are only used to draw the SVG flag; they are never rendered as text.
const FLAG_CODE = { bangladesh: 'BD', usa: 'US', uk: 'GB', dubai: 'AE' };

export default function GlobalPresence() {
  return (
    <section id="global-presence" className="nvx-section nvx-light nvx-markets" aria-labelledby="nvx-markets-title">
      <div className="nvx-shell">
        <Reveal>
          <div className="nvx-heading-row">
            <SectionHeading label="A wider perspective" title="Four markets." accent="New possibilities." id="nvx-markets-title" />
            <p className="nvx-body-copy">Explore each market’s dedicated collection.</p>
          </div>
        </Reveal>
        <ul className="nvx-market-grid" aria-label="Markets">
          {countryOptions.map((market, index) => (
            <li key={market.id} className="nvx-market-item">
              <Float index={index}>
                <article className="nvx-market-card nvx-glass">
                  <div className="nvx-market-card-top">
                    <span className="nvx-flag-box">
                      <ReactCountryFlag svg countryCode={FLAG_CODE[market.id]} aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </span>
                    <span className="nvx-market-currency">{market.currency}</span>
                  </div>
                  <h3>{market.name}</h3>
                  <div className="nvx-market-card-bottom">
                    
                    <Link className="nvx-button nvx-outline nvx-market-link" to={'/' + market.id} aria-label={'Explore the ' + market.name + ' collection'}>
                      Explore <LuArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Float>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

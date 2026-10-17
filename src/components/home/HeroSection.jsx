import { Link } from 'react-router-dom';
import { LuArrowUpRight } from 'react-icons/lu';
import { useCountry } from '../../context/country';
import MarketStrip from './MarketStrip';
import '../../styles/country-hero.css';

export default function HeroSection() {
  const market = useCountry();
  const home = market.home;
  return (
    <>
      <section className="nvc-hero" aria-labelledby="nvc-title">
        <div className="nvc-hero-inner nvx-shell">
          <div className="nvc-copy">
            <p className="nvc-label">{home.heroLabel}</p>
            <h1 id="nvc-title">{home.headline}<span>{home.heroAccent}</span></h1>
            <p className="nvc-intro">{home.intro}</p>
            <div className="nvc-actions">
              <Link className="nvc-primary" to={'/' + market.id + '/portfolio'}>{home.heroCta}<LuArrowUpRight aria-hidden="true" /></Link>
              <Link className="nvc-secondary" to={'/' + market.id + '/contact'}>Speak with our team</Link>
            </div>
            <p className="nvc-note">{home.heroNote}</p>
          </div>
          <figure className="nvc-image">
            <img src={home.heroImage} alt={home.heroAlt} fetchPriority="high" />
            <figcaption>Illustrative architecture · {market.name}</figcaption>
          </figure>
        </div>
      </section>
      <MarketStrip />
    </>
  );
}

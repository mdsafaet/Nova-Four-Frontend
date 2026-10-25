import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';
import { useCountry } from '../../context/country';
import MarketStrip from './MarketStrip';
import '../../styles/country-hero.css';

export default function HeroSection() {
  const market = useCountry();
  const home = market.home;
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const isBangladesh = market.id === 'bangladesh';

  return (
    <>
      <section
        className={`nvc-hero${isBangladesh ? ' nvc-hero--video' : ''}`}
        aria-labelledby="nvc-title"
      >
        {isBangladesh && (
          <div className="nvc-hero-background" aria-hidden="true">
            <img src={home.heroImage} alt="" fetchPriority="high" />

            {!reduceMotion && !videoFailed && home.heroVideo && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={home.heroImage}
                onError={() => setVideoFailed(true)}
              >
                <source src={home.heroVideo} type="video/mp4" />
              </video>
            )}
          </div>
        )}

        <div className="nvc-hero-inner nvx-shell">
          {/* <div className="nvc-copy">
            <p className="nvc-label">{home.heroLabel}</p>

            <h1 id="nvc-title">
              {home.headline}
              <span>{home.heroAccent}</span>
            </h1>

            <p className="nvc-intro">{home.intro}</p>

            <div className="nvc-actions">
              <Link
                className="nvc-primary"
                to={`/${market.id}/portfolio`}
              >
                {home.heroCta}
                <LuArrowUpRight aria-hidden="true" />
              </Link>

              <Link
                className="nvc-secondary"
                to={`/${market.id}/contact`}
              >
                Speak with our team
              </Link>
            </div>

            <p className="nvc-note">{home.heroNote}</p>
          </div> */}

          {!isBangladesh && (
            <figure className="nvc-image">
              <img
                src={home.heroImage}
                alt={home.heroAlt}
                fetchPriority="high"
              />
            </figure>
          )}
        </div>

        {isBangladesh && <MarketStrip />}
      </section>

      {!isBangladesh && <MarketStrip />}
    </>
  );
}

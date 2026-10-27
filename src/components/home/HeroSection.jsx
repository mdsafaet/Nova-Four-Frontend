import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useCountry } from '../../context/country';
import { getData } from '../../api/api';
import MarketStrip from './MarketStrip';
import '../../styles/country-hero.css';

export default function HeroSection() {
  const market = useCountry();
  const home = market.home;
  const reduceMotion = useReducedMotion();
  const isBangladesh = market.id === 'bangladesh';

  const [cmsHero, setCmsHero] = useState(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setCmsHero(null);
    setVideoFailed(false);

    if (!isBangladesh) return;

    const controller = new AbortController();

    getData('/bangladesh/hero', {}, { signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setCmsHero(response?.data ?? null);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error('Could not load Bangladesh hero:', error);
        }
      });

    return () => controller.abort();
  }, [isBangladesh]);

  const backgroundImage = cmsHero?.images?.[0] ?? null;
  const videoUrl = cmsHero?.video ?? null;

  return (
    <>
      <section
        className={`nvc-hero${isBangladesh ? ' nvc-hero--video' : ''}`}
        aria-label={`${market.name} homepage hero`}
      >
        {isBangladesh && (
          <div className="nvc-hero-background" aria-hidden="true">
            {backgroundImage && (reduceMotion || videoFailed || !videoUrl) && (
              <img
                src={backgroundImage}
                alt=""
                fetchPriority="high"
              />
            )}

            {!reduceMotion && !videoFailed && videoUrl && (
              <video
                key={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        )}

        <div className="nvc-hero-inner nvx-shell">
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
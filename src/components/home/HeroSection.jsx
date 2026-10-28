import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { useCountry } from '../../context/country';
import { getData } from '../../api/api';
import MarketStrip from './MarketStrip';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/country-hero.css';

const cmsCountries = ['bangladesh', 'dubai', 'usa'];

function HeroMedia({ hero, reducedMotion, background = false }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const images = hero?.images || [];
  const video = !reducedMotion && !videoFailed ? hero?.video : null;
  const slides = [
    ...(video ? [{ type: 'video', src: video }] : []),
    ...images.map((src) => ({ type: 'image', src })),
  ];

  if (slides.length === 0) return null;

  const content = slides.length === 1
    ? slides.map((slide) => (
        slide.type === 'video' ? (
          <video
            key={slide.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          >
            <source src={slide.src} type="video/mp4" />
          </video>
        ) : (
          <img
            key={slide.src}
            src={slide.src}
            alt={background ? '' : hero?.heroAlt || ''}
            fetchPriority="high"
          />
        )
      ))
    : (
      <Swiper
        modules={[A11y, Autoplay, Keyboard, Pagination]}
        slidesPerView={1}
        loop
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={reducedMotion ? false : {
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={reducedMotion ? 0 : 500}
        onSlideChange={(swiper) => {
          swiper.slides.forEach((slide) => {
            const element = slide.querySelector('video');
            if (!element) return;

            if (slide === swiper.slides[swiper.activeIndex]) {
              element.play().catch(() => {});
            } else {
              element.pause();
            }
          });
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.type}-${slide.src}-${index}`}>
            {slide.type === 'video' ? (
              <video
                muted
                playsInline
                loop
                preload="metadata"
                onError={() => setVideoFailed(true)}
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={slide.src}
                alt={background ? '' : hero?.heroAlt || ''}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );

  return background ? (
    <div className="nvc-hero-background">{content}</div>
  ) : (
    <figure className="nvc-image">{content}</figure>
  );
}

export default function HeroSection() {
  const market = useCountry();
  const reducedMotion = useReducedMotion();
  const isBangladesh = market.id === 'bangladesh';
  const usesCms = cmsCountries.includes(market.id);

  const [heroState, setHeroState] = useState({
    country: null,
    data: null,
  });

  useEffect(() => {
    if (!usesCms) return;

    const controller = new AbortController();

    getData(`/${market.id}/hero`, {}, { signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setHeroState({
            country: market.id,
            data: response?.data ?? null,
          });
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error(`Could not load ${market.id} hero:`, error);
          setHeroState({ country: market.id, data: null });
        }
      });

    return () => controller.abort();
  }, [market.id, usesCms]);

  const cmsHero = heroState.country === market.id
    ? heroState.data
    : null;

  return (
    <>
      <section
        className={`nvc-hero${isBangladesh ? ' nvc-hero--video' : ''}`}
        aria-label={`${market.name} homepage hero`}
      >
        {isBangladesh && cmsHero && (
          <HeroMedia
            key={`${market.id}-${cmsHero.video || cmsHero.images?.[0]}`}
            hero={cmsHero}
            reducedMotion={reducedMotion}
            background
          />
        )}

        <div className="nvc-hero-inner nvx-shell">
          {!isBangladesh && (
            usesCms ? (
              cmsHero && (
                <HeroMedia
                  key={`${market.id}-${cmsHero.video || cmsHero.images?.[0]}`}
                  hero={cmsHero}
                  reducedMotion={reducedMotion}
                />
              )
            ) : (
              <figure className="nvc-image">
                <img
                  src={market.home.heroImage}
                  alt={market.home.heroAlt}
                  fetchPriority="high"
                />
              </figure>
            )
          )}
        </div>

        {isBangladesh && <MarketStrip />}
      </section>

      {!isBangladesh && <MarketStrip />}
    </>
  );
}
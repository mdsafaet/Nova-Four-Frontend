import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Pause, Play } from 'lucide-react';
import { useCountry } from '../../context/country';
import '../../styles/lifestyle-section.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VIDEO_SRC = '/videos/lifestyle.mp4';

const PHOTOS = [
  {
    src: '/images/lifestyle-1.jpg',
    alt: 'Sandstone residence with a glass facade',
    tag: 'Residences',
  },
  {
    src: '/images/lifestyle-2.jpg',
    alt: 'Engineers reviewing plans on site',
    tag: 'Construction',
  },
  {
    src: '/images/lifestyle-3.jpg',
    alt: 'Glass and stone detail of a residence',
    tag: 'Architecture',
  },
];

const EASE = [0.16, 1, 0.3, 1];
const STILL = { hidden: { opacity: 1 }, show: { opacity: 1 } };

function buildVariants(reduce) {
  if (reduce) {
    return {
      container: STILL,
      top: STILL,
      bottom: STILL,
      lineTop: STILL,
      lineBottom: STILL,
    };
  }

  return {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.14 } },
    },
    top: {
      hidden: { opacity: 0, y: -48 },
      show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
    },
    bottom: {
      hidden: { opacity: 0, y: 48 },
      show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
    },
    lineTop: {
      hidden: { y: '-115%' },
      show: { y: '0%', transition: { duration: 1, ease: EASE } },
    },
    lineBottom: {
      hidden: { y: '115%' },
      show: { y: '0%', transition: { duration: 1, ease: EASE } },
    },
  };
}

function splitTitle(title = '') {
  const match = title.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [title, ''];
}

export default function LifestyleSection() {
  const market = useCountry();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  const variants = buildVariants(reduceMotion);
  const [firstLine, secondLine] = splitTitle(market.home.aboutTitle);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const video = q('.nvl-video')[0];
        const photos = q('.nvl-photo');

        gsap.fromTo(
          video,
          {
            clipPath: 'inset(14% 10% 14% 10% round 28px)',
            scale: 0.92,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: 'power4.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: { trigger: video, start: 'top 88%', once: true },
          }
        );

        gsap.from(photos, {
          y: 130,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.16,
          scrollTrigger: {
            trigger: q('.nvl-photos')[0],
            start: 'top 90%',
            once: true,
          },
        });

        photos.forEach((photo) => {
          const img = photo.querySelector('img');
          if (!img) return;

          gsap.fromTo(
            img,
            { yPercent: -9 },
            {
              yPercent: 9,
              ease: 'none',
              scrollTrigger: {
                trigger: photo,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="nvl-section"
      aria-labelledby="nvl-title"
    >
      <div className="nvl-container">
        <motion.div
          className="nvl-content"
          variants={variants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="nvl-label" variants={variants.top}>
            Nova Development · {market.name}
          </motion.p>

          <h2 id="nvl-title" className="nvl-title">
            <span className="nvl-line">
              <motion.span
                className="nvl-line-inner nvl-ink"
                variants={variants.lineTop}
              >
                {firstLine}
              </motion.span>
            </span>

            {secondLine && (
              <span className="nvl-line">
                <motion.span
                  className="nvl-line-inner nvl-grad"
                  variants={variants.lineBottom}
                >
                  {secondLine}
                </motion.span>
              </span>
            )}
          </h2>

          <motion.p className="nvl-description" variants={variants.bottom}>
            {market.home.aboutText}
          </motion.p>

          <motion.div variants={variants.bottom}>
            <Link to={`/${market.id}/portfolio`} className="nvl-link">
              <span aria-hidden="true" />
              Discover more
            </Link>
          </motion.div>
        </motion.div>

        <div
          className="nvl-gallery"
          role="group"
          aria-label="Lifestyle and architectural inspiration"
        >
          <figure className="nvl-card nvl-video">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              autoPlay={!reduceMotion}
              aria-label="Life in a Nova community"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            <span className="nvl-badge">
              <i aria-hidden="true" />
              Life in {market.name}
            </span>

            <button
              type="button"
              className="nvl-toggle"
              onClick={toggleVideo}
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              {playing ? (
                <Pause size={16} aria-hidden="true" />
              ) : (
                <Play size={16} aria-hidden="true" />
              )}
            </button>
          </figure>

          <div className="nvl-photos">
            {PHOTOS.map((photo) => (
              <figure className="nvl-card nvl-photo" key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width="1000"
                  height="1250"
                />
                <figcaption>{photo.tag}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

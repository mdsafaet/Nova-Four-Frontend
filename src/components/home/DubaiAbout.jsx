import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountry } from '../../context/country';
import '../../styles/dubai-about.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DubaiAbout() {
  const market = useCountry();
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion) return;

    gsap.from('.dba-reveal', {
      autoAlpha: 0,
      y: 36,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
      },
    });
  }, { scope: sectionRef, dependencies: [reduceMotion] });

  return (
    <section
      ref={sectionRef}
      id="nvx-perspective"
      className="dba-section"
      aria-labelledby="nvx-perspective-title"
    >
      <div className="nvx-shell dba-layout">
        <div className="dba-content">
          <p className="dba-label dba-reveal">{market.name}</p>

          <h2 id="nvx-perspective-title" className="dba-title dba-reveal">
            {market.home.aboutTitle}
          </h2>

          <p className="dba-description dba-reveal">
            {market.home.aboutText}
          </p>

          <Link
            className="dba-link dba-reveal"
            to={`/${market.id}/about`}
          >
            اكتشف نهجنا
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>

        <figure className="dba-visual dba-reveal">
          <img
            src={market.home.aboutImage}
            alt="صورة معمارية توضيحية لمجموعة دبي"
            loading="lazy"
          />
          <figcaption>صورة معمارية توضيحية</figcaption>
        </figure>
      </div>
    </section>
  );
}
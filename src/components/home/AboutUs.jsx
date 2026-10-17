import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCountry } from '../../context/country';
import { Reveal } from '../company-profile/Float';
import SectionHeading from '../common/SectionHeading';

export default function AboutUs() {
  const m = useCountry();
  const sentences = m.home.aboutTitle.split('. ');
  const words = m.home.aboutTitle.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const title = sentences.length > 1 ? sentences[0] + '.' : words.slice(0, midpoint).join(' ');
  const accent = sentences.length > 1 ? sentences.slice(1).join('. ') : words.slice(midpoint).join(' ');
  return (
    <section id="nvx-perspective" className="nvx-section nvx-light" aria-labelledby="nvx-perspective-title">
      <div className="nvx-shell nvx-about-grid">
        <Reveal className="nvx-about-visual"><img src={m.home.aboutImage} alt="Illustrative residential architecture" loading="lazy" /><span className="nvx-photo-note">Illustrative architecture</span></Reveal>
        <Reveal>
          <SectionHeading number="02" label="The perspective" kicker="Nova Development" title={title} accent={accent} id="nvx-perspective-title" />
          <p className="nvx-body-copy">{m.home.aboutText}</p>
          <Link className="nvx-button nvx-outline" to={'/' + m.id + '/about'}>Discover our approach <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

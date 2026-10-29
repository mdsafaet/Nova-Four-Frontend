import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard } from 'swiper/modules';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useCountry } from '../../context/country';
import PropertyCard from '../common/PropertyCard';
import 'swiper/css';
import '../../styles/portfolio-country.css';

export default function OurProjects() {
  const market = useCountry();
  const reducedMotion = useReducedMotion();
  const projects = market.projects || [];

  return <section className="nvp4-home" aria-labelledby="nvp4-home-title"><div className="nvx-shell nvp4-home-head"><div><p className="nvp4-eyebrow">{market.name} / Portfolio</p><h2 id="nvp4-home-title">Selected <span>developments.</span></h2></div><Link className="nvp4-outline" to={`/${market.id}/portfolio`}>View complete portfolio <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    {market.projectsLoading ? <p className="nvx-shell" role="status">Loading projects…</p> : market.projectsError ? <p className="nvx-shell" role="alert">Projects could not be loaded. Please try again.</p> : projects.length > 0 ? <div className="nvp4-carousel"><Swiper modules={[A11y, Autoplay, Keyboard]} slidesPerView={1.08} spaceBetween={16} keyboard={{ enabled: true }} grabCursor={projects.length > 1} loop={projects.length > 4} autoplay={!reducedMotion && projects.length > 1 ? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true } : false} speed={reducedMotion ? 0 : 600} breakpoints={{ 480: { slidesPerView: 1.25, spaceBetween: 18 }, 700: { slidesPerView: 2, spaceBetween: 20 }, 1000: { slidesPerView: 2.7, spaceBetween: 24 }, 1200: { slidesPerView: 3.3, spaceBetween: 26 } }}>{projects.map((project) => <SwiperSlide key={project.slug}><PropertyCard project={project} /></SwiperSlide>)}</Swiper></div> : <p className="nvx-shell">No projects published yet.</p>}
  </section>;
}

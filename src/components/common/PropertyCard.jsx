import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useCountry } from '../../context/country';
import '../../styles/portfolio-country.css';

export default function PropertyCard({ project }) {
  const market = useCountry();
  const reducedMotion = useReducedMotion();
  const image = project.images?.[0];

  return (
    <motion.article
      className="nvp4-card"
      whileHover={reducedMotion ? undefined : { y: -8 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      <Link className="nvp4-card-link" to={`/${market.id}/portfolio/${project.slug}`} aria-label={`View ${project.title}`}>
        <div className="nvp4-card-image">
          {image && <img src={image.src} alt={image.alt || project.title} loading="lazy" />}
          {project.type && <span className="nvp4-card-badge">{project.type}</span>}
        </div>
        <div className="nvp4-card-body">
          <span className="nvp4-card-market"><MapPin size={15} aria-hidden="true" />{project.location || market.name}</span>
          <h3>{project.title}<ArrowUpRight size={21} aria-hidden="true" /></h3>
          {project.description && <p>{project.description}</p>}
          <span className="nvp4-card-more">View project <ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
      </Link>
    </motion.article>
  );
}

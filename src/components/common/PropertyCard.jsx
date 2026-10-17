import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { useCountry } from "../../context/country";
import { Float } from "./Reveal";

export default function PropertyCard({
  project,
  index = 0,
}) {
  const market = useCountry();

  const image = project.images?.[0];

  return (
    <Float index={index}>
      <article className="nvx-property-card nvx-glass">
        <Link
          className="nvx-property-card-link"
          to={`/${market.id}/portfolio/${project.slug}`}
        >
          <div className="nvx-property-image">
            {image && (
              <img
                src={image.src}
                alt={image.alt || project.title}
                loading="lazy"
              />
            )}

            <span className="nvx-image-label">
              Illustrative project
            </span>
          </div>

          <div className="nvx-property-content">
            <div className="nvx-property-meta">
              <span>
                <MapPin
                  size={14}
                  aria-hidden="true"
                />
                {project.location}
              </span>

              {project.type && (
                <span>
                  {project.type}
                </span>
              )}
            </div>

            <h3>
              {project.title}

              <ArrowUpRight
                size={21}
                aria-hidden="true"
              />
            </h3>

            <p>
              Details awaiting confirmation
              {market.currency && (
                <>
                  {" · "}
                  {market.currency}
                </>
              )}
            </p>
          </div>
        </Link>
      </article>
    </Float>
  );
}
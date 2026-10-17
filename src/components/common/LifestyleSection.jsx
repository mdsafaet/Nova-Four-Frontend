import { Link } from 'react-router-dom';
import { useCountry } from '../../context/country';
import '../../styles/lifestyle-section.css';

export default function LifestyleSection() {
  const market = useCountry();

  return (
    <section
      className="nvl-section"
      aria-labelledby="nvl-title"
    >
      <div className="nvl-container">
        <div className="nvl-content">
          <p className="nvl-label">
            Nova Development · {market.name}
          </p>

          <h2 id="nvl-title">{market.home.aboutTitle}</h2>

          <p className="nvl-description">
            {market.home.aboutText}
          </p>

          <Link
            to={`/${market.id}/portfolio`}
            className="nvl-link"
          >
            <span aria-hidden="true" />
            Discover more
          </Link>
        </div>

        <div
          className="nvl-gallery"
          role="group"
          aria-label="Lifestyle and architectural inspiration"
        >
          <figure className="nvl-image nvl-image--park">
            <img
              src="/images/Artboard 2.jpg"
              alt="Landscaped gardens surrounded by residences"
              loading="lazy"
              width="900"
              height="500"
            />
          </figure>

          <figure className="nvl-image nvl-image--skyline">
            <img
              src="/images/lifestyle-park.jpg"
              alt="City skyline beyond an open green space"
              loading="lazy"
              width="700"
              height="500"
            />
          </figure>

          <figure className="nvl-image nvl-image--interior">
            <img
              src="/images/lifestyle-park.jpg"
              alt="Light-filled interior opening onto a terrace"
              loading="lazy"
              width="500"
              height="750"
            />
          </figure>

          <figure className="nvl-image nvl-image--nature">
            <img
              src="/images/lifestyle-park.jpg"
              alt="Sunlight falling across trees and ornamental grasses"
              loading="lazy"
              width="1100"
              height="700"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
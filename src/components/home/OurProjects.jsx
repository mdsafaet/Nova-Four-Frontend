import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, A11y } from "swiper/modules";
import { ArrowUpRight, MapPin } from "lucide-react";

import "swiper/css";

import { useCountry } from "../../context/country";
import { Reveal } from "../common/Reveal";

export default function OurProjects() {
  const market = useCountry();
  const projects = market.projects || [];

  // Swiper loop needs more slides than slidesPerView, so repeat short lists
  const slides =
    projects.length > 0 && projects.length < 8
      ? Array.from(
          { length: Math.ceil(8 / projects.length) * projects.length },
          (_, i) => projects[i % projects.length]
        )
      : projects;

  return (
    <section
      className="nvx-section nvx-portfolio-section"
      aria-labelledby="nvx-collection-title"
    >
      <div className="nvx-shell">
        <div className="nvx-heading-row">
          <Reveal>
            <div className="nvx-section-heading">
              <p className="nvx-kicker">{market.name}</p>
              <h2 id="nvx-collection-title">
                Places with
                <br />
                <span className="nvx-gradient-text">possibility.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              className="nvx-button nvx-outline"
              to={`/${market.id}/portfolio`}
            >
              View all projects
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="nvx-disclosure">
            Sample listings for design preview. Availability, specifications
            and prices are not confirmed.
          </p>
        </Reveal>
      </div>

      {slides.length > 0 && (
        <div className="nvx-portfolio-carousel">
          <Swiper
            modules={[Autoplay, Keyboard, A11y]}
            className="nvx-project-swiper"
            loop
            grabCursor
            keyboard={{ enabled: true }}
            speed={900}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1.08}
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 1.25, spaceBetween: 18 },
              700: { slidesPerView: 2, spaceBetween: 20 },
              1000: { slidesPerView: 2.7, spaceBetween: 24 },
              1200: { slidesPerView: 3.3, spaceBetween: 26 },
              1500: { slidesPerView: 4, spaceBetween: 28 },
            }}
          >
            {slides.map((project, index) => {
              const image = project.images?.[0];

              return (
                <SwiperSlide key={`${project.slug}-${index}`}>
                  <article className="nvx-property-card nvx-glass nvx-carousel-card">
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
                            <MapPin size={14} aria-hidden="true" />
                            {project.location}
                          </span>
                          {project.type && <span>{project.type}</span>}
                        </div>

                        <h3>
                          {project.title}
                          <ArrowUpRight size={21} aria-hidden="true" />
                        </h3>

                        <p>Details awaiting confirmation</p>
                      </div>
                    </Link>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </section>
  );
}
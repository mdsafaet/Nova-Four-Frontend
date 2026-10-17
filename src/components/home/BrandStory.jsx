import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import "../../styles/brand-story.css";

// Images live in public/images
const img = {
  projectFeatured: "/images/project-mixed.jpg",
  projectResidential: "/images/project-residential.jpg",
  projectCommercial: "/images/project-mixed.jpg",
  projectMixed: "/images/project-mixed.jpg",
};

const milestones = [
  {
    year: "2009",
    date: "August 10th",
    eyebrow: "The Beginning",
    title: "Founded",
    text: [
      "Nova begins in Dhaka with a simple ambition: make land development more disciplined, transparent and future-focused. A small yet dedicated core team laid the foundation for a platform that would grow across four markets.",
      "One idea. One estate. The commitment to high-quality planning and long-term stewardship has driven our growth from day one.",
    ],
    image: img.projectFeatured,
    alt: "Nova Meadows — master-planned land estate, Dhaka",
    theme: "sand",
  },
  {
    year: "2016",
    date: "March 15th",
    eyebrow: "Expansion",
    title: "Entering the Gulf",
    text: [
      "Nova establishes its Dubai platform and expands into luxury residential and investment-led development — bringing the same discipline in land, design and governance to the Gulf region.",
      "Strategic partnerships and a Dubai HQ enabled us to deliver branded waterfront residences and mixed-use destinations.",
    ],
    image: img.projectResidential,
    alt: "Nova Harbour Residences — waterfront residences, Dubai Harbour",
    theme: "blue",
  },
  {
    year: "2019",
    date: "June 22nd",
    eyebrow: "Global Platform",
    title: "New York. New possibilities",
    text: [
      "The group enters North America through capital advisory, commercial development and strategic partnerships — extending our integrated development model to the USA.",
      "Our headquarters approach combines local expertise with global standards in engineering, delivery and long-term stewardship.",
    ],
    image: img.projectCommercial,
    alt: "Nova Quay — Grade-A commercial destination, New York",
    theme: "green",
  },
  {
    year: "2026",
    date: "January 01st",
    eyebrow: "Today",
    title: "Four markets. One Nova",
    text: [
      "Today Nova operates across Dubai, Bangladesh, USA and UK with an integrated platform spanning land estates, residences and commercial assets — 45+ projects, 3,200 acres, one global standard.",
      "Design. Engineering. Governance. Stewardship. Places that outlive us.",
    ],
    image: img.projectMixed,
    alt: "Integrated global portfolio across four markets",
    theme: "mist",
  },
];

function StoryCard({ milestone, index }) {
  const cardRef = useRef(null);

  return (
    <article
      ref={cardRef}
      className="story-stack-item"
      style={{
        "--story-index": index,
      }}
    >
      <motion.div
        className={`story-card story-card--${milestone.theme}`}
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="story-card__top">
          <div className="story-card__year-wrap">
            <span className="story-card__number">
              0{index + 1}
            </span>

            <span className="story-card__date">
              {milestone.date}
            </span>
          </div>

          <div className="story-card__progress">
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="story-card__progress-line">
              <span
                style={{
                  width: `${((index + 1) / milestones.length) * 100}%`,
                }}
              />
            </div>

            <span>
              {String(milestones.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="story-card__layout">
          <div className="story-card__content">
            <div>
              <span className="story-card__eyebrow">
                {milestone.eyebrow}
              </span>

              <div className="story-card__year">
                {milestone.year}
              </div>
            </div>

            <div className="story-card__copy">
              <h3>
                {milestone.title}
              </h3>

              <div className="story-card__paragraphs">
                {milestone.text.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="story-card__media">
            <img
              src={milestone.image}
              alt={milestone.alt}
              loading="lazy"
            />

            <div className="story-card__media-overlay" />

            <div className="story-card__media-caption">
              <span>
                Nova Development
              </span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="story-stack"
    >
      <div className="story-stack__container">

        <div className="story-stack__heading">
          <div>
            <div className="story-stack__label">
              <span className="story-stack__label-dot" />

              Brand Story
            </div>

            <h2>
              History begins
              <span> in 2009.</span>
            </h2>
          </div>

          <p>
            From a single land estate to a global platform —
            four markets, one standard of design, engineering
            and stewardship.
          </p>
        </div>

        <div className="story-stack__cards">
          {milestones.map((milestone, index) => (
            <StoryCard
              key={milestone.year}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
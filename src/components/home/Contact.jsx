import ReactCountryFlag from "react-country-flag";

import {
  LuArrowUpRight,
  LuClock3,
  LuGlobe,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

import { Reveal } from "../company-profile/Float";

import "../../styles/corporate-offices.css";

const offices = [
  {
    number: "01",
    code: "AE",
    city: "Dubai",
    label: "Head Office",
    suffix: "HQ",
    hours: "",
    address: [
      "Al Tallah 2 -  - ",
      "Ajman",
      "United Arab Emirates",
    ],
    phone: "+971 6538 8233",
    email: "",
    website: "https://novadevelopmentglobal.com",
  },
  {
    number: "02",
    code: "BD",
    city: "Dhaka",
    label: "Bangladesh Office",
    suffix: "",
    hours: "",
    address: [
      "Rupayan Shopping Square, 10th Floor, Unit-A & B",
      "Plot No. C-2, Block-G, Sayem Sobhan Anvir Road",
      "Bashundhara Residential Area, Dhaka-1229",
      "Bangladesh",
    ],
    phone: "+09606 707 707",
    email: "",
    website: "https://novadevelopmentglobal.com",
  },
  {
    number: "03",
    code: "US",
    city: "New York",
    label: "Americas Office",
    suffix: "",
    hours: "",
    address: [],
    phone: "",
    email: "",
    website: "",
  },
  {
    number: "04",
    code: "GB",
    city: "London",
    label: "UK Office",
    suffix: "",
    hours: "",
    address: [
      "1st Floor, 195 Vallance Road",
      "London E1 5HS",
      "United Kingdom",
    ],
    phone: "+020 3299 6900",
    email: "",
    website: "https://novadevelopmentglobal.com",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getPhoneHref = (phone) =>
  phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

const getDirections = (address) => {
  const clean = (address || []).filter(Boolean).join(", ");

  return clean
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        clean
      )}`
    : "";
};

/* =========================================================
   OFFICE ROW
========================================================= */

function OfficeRow({ office, index }) {
  const lines = (office.address || []).filter((line) => line?.trim());
  const directions = getDirections(lines);
  const phoneHref = getPhoneHref(office.phone);

  const hasContact = office.phone || office.email || office.hours;
  const hasActions = directions || office.website;
  const isHq = index === 0;

  return (
    <li className="nvo-item">
      <Reveal delay={index * 0.06}>
        <article className={`nvo-row${isHq ? " nvo-row--hq" : ""}`}>
          <div className="nvo-id">
            <span className="nvo-number">{office.number}</span>

            <span className="nvo-flag" aria-hidden="true">
              <ReactCountryFlag
                countryCode={office.code}
                svg
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </span>
          </div>

          <div className="nvo-place">
            <p className="nvo-label">{office.label}</p>

            <h3>
              {office.city}
              {office.suffix && (
                <span className="nvo-badge">{office.suffix}</span>
              )}
            </h3>
          </div>

          <address className="nvo-address">
            {lines.length > 0 ? (
              <>
                <LuMapPin aria-hidden="true" />
                <span>
                  {lines.map((line, i) => (
                    <span key={`${office.city}-${i}`} className="nvo-line">
                      {line}
                    </span>
                  ))}
                </span>
              </>
            ) : (
              <span className="nvo-pending">Details coming soon</span>
            )}
          </address>

          {hasContact && (
            <ul className="nvo-contact">
              {office.phone && (
                <li>
                  <a href={phoneHref}>
                    <LuPhone aria-hidden="true" />
                    {office.phone}
                  </a>
                </li>
              )}

              {office.email && (
                <li>
                  <a href={`mailto:${office.email}`}>
                    <LuMail aria-hidden="true" />
                    {office.email}
                  </a>
                </li>
              )}

              {office.hours && (
                <li className="nvo-hours">
                  <LuClock3 aria-hidden="true" />
                  {office.hours}
                </li>
              )}
            </ul>
          )}

          {hasActions && (
            <div className="nvo-actions">
              {directions && (
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nvo-btn nvo-btn--primary"
                  aria-label={`Get directions to the ${office.city} office`}
                >
                  Directions
                  <LuArrowUpRight aria-hidden="true" />
                </a>
              )}

              {office.website && (
                <a
                  href={office.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nvo-btn"
                  aria-label={`Visit the ${office.city} office website`}
                >
                  <LuGlobe aria-hidden="true" />
                  Website
                </a>
              )}
            </div>
          )}
        </article>
      </Reveal>
    </li>
  );
}

/* =========================================================
   OFFICES
========================================================= */

export default function Offices() {
  return (
    <section
      id="contact"
      className="nvo-section"
      aria-labelledby="nvo-title"
    >
      <div className="nvx-shell">
        <Reveal>
          <div className="nvo-eyebrow">
            <span>02</span>
            <i aria-hidden="true" />
            <strong>Corporate Offices</strong>
          </div>
        </Reveal>

        <div className="nvo-head">
          <Reveal>
            <h2 id="nvo-title" className="nvo-title">
              Four markets.
              <span>One standard.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="nvo-lead">
              Find the Nova team closest to you. Every office follows the same
              standard of service for owners, partners and investors.
            </p>
          </Reveal>
        </div>

        <ul className="nvo-list">
          {offices.map((office, index) => (
            <OfficeRow key={office.city} office={office} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

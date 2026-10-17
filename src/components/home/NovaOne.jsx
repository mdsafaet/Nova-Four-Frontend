import { FaApple, FaGooglePlay, FaBagShopping } from "react-icons/fa6";

import {
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  CreditCard,
  FileText,
  House,
  KeyRound,
  MessageSquare,
  Plus,
  Smartphone,
  User,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

import "../../styles/nova-one.css";

// Phone mockup images (from public/images).
const projectResidential = "/images/project-residential.jpg";
const projectMixed = "/images/project-mixed.jpg";

const leftCards = [
  { icon: Building2, title: "Properties", text: "Unit details, floor plans and handover documents in one place." },
  { icon: CreditCard, title: "Payments", text: "See your plan, pay instalments and download receipts instantly." },
];

const rightCards = [
  { icon: Wrench, title: "Services", text: "Raise a request, follow progress and rate the technician." },
  { icon: Users, title: "Community", text: "Join events, read announcements and meet your neighbours." },
];

// TODO: replace "#" with the real store URLs.
const stores = [
  { icon: FaApple, size: 24, eyebrow: "Download on the", name: "App Store", href: "#" },
  { icon: FaGooglePlay, size: 21, eyebrow: "Get it on", name: "Google Play", href: "#" },
  { icon: FaBagShopping, size: 21, eyebrow: "Explore it on", name: "AppGallery", href: "#" },
];

const quick = [
  { icon: Wrench, label: "Service" },
  { icon: FileText, label: "Docs" },
  { icon: KeyRound, label: "Access" },
  { icon: Bell, label: "Alerts" },
];

const nav = [
  { icon: House, label: "Home", active: true },
  { icon: Wallet, label: "Pay" },
  { icon: MessageSquare, label: "Requests" },
  { icon: User, label: "Profile" },
];

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <li className="nv-card">
      <span className="nv-card-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.7} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
}

export default function NovaOne() {
  return (
    <section id="nova-app" className="nv-section" aria-labelledby="nv-title">
      <div className="nv-container">
        {/* HEADER */}
        <header className="nv-header">
          <p className="nv-eyebrow">
            <Smartphone size={14} strokeWidth={1.9} aria-hidden="true" />
            Nova One app
          </p>
          <h2 id="nv-title">
            Your property.<br />
            <em>One intelligent app.</em>
          </h2>
          <p className="nv-lead">
            Manage your property, payments, service requests and community life
            from one connected experience.
          </p>
        </header>

        {/* STAGE */}
        <div className="nv-stage">
          <ul className="nv-cards nv-cards--left">
            {leftCards.map((c) => (
              <FeatureCard key={c.title} {...c} />
            ))}
          </ul>

          <div className="nv-phone-wrap" aria-hidden="true">
            <span className="nv-halo" />
            <span className="nv-chip nv-chip--paid">
              <Check size={13} strokeWidth={3} /> Payments up to date
            </span>
            <span className="nv-chip nv-chip--tech">
              <Wrench size={13} strokeWidth={2.2} /> Technician assigned
            </span>

            <div className="nv-phone">
              <span className="nv-phone-island" />
              <div className="nv-screen">
                <div className="nv-s-top">
                  <div>
                    <small>Good morning</small>
                    <strong>Ali Mohamed</strong>
                  </div>
                  <span className="nv-s-avatar">AM</span>
                </div>

                <div className="nv-s-property">
                  <img src={projectResidential} alt="" loading="lazy" />
                  <span className="nv-s-shade" />
                  <span className="nv-s-badge">Ready</span>
                  <div className="nv-s-prop-text">
                    <small>Dubai Harbour</small>
                    <strong>Nova Harbour Residences</strong>
                    <span>Apartment 1804 · Tower A</span>
                  </div>
                </div>

                <div className="nv-s-pay">
                  <div>
                    <small>Next payment</small>
                    <strong>AED 18,450</strong>
                    <span>Due 18 September</span>
                  </div>
                  <i>
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </i>
                </div>

                <div className="nv-s-quick">
                  {quick.map(({ icon: Icon, label }) => (
                    <span key={label}>
                      <i>
                        <Icon size={16} />
                      </i>
                      {label}
                    </span>
                  ))}
                </div>

                <div className="nv-s-event">
                  <img src={projectMixed} alt="" loading="lazy" />
                  <div>
                    <small>Community</small>
                    <strong>Harbour Run</strong>
                    <span>12 Aug · 7:00 AM</span>
                  </div>
                  <b>Join</b>
                </div>

                <div className="nv-s-nav">
                  {nav.slice(0, 2).map(({ icon: Icon, label, active }) => (
                    <span key={label} className={active ? "on" : ""}>
                      <Icon size={15} />
                      {label}
                    </span>
                  ))}
                  <span className="nv-s-fab">
                    <Plus size={16} />
                  </span>
                  {nav.slice(2).map(({ icon: Icon, label }) => (
                    <span key={label}>
                      <Icon size={15} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ul className="nv-cards nv-cards--right">
            {rightCards.map((c) => (
              <FeatureCard key={c.title} {...c} />
            ))}
          </ul>
        </div>

        {/* DOWNLOAD BAR */}
        <div className="nv-download">
          <div className="nv-download-brand">
            <span className="nv-mark" aria-hidden="true">
              <b>NOVA</b>
              <i>ONE</i>
            </span>
            <div>
              <h3>Get Nova One today</h3>
              <p>Available for Nova property owners across supported markets.</p>
            </div>
          </div>

          <div className="nv-stores">
            {stores.map(({ icon: Icon, size, eyebrow, name, href }) => (
              <a key={name} href={href} className="nv-store" aria-label={`${eyebrow} ${name}`}>
                <i aria-hidden="true">
                  <Icon size={size} />
                </i>
                <span>
                  <small>{eyebrow}</small>
                  <strong>{name}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SectionHeading({ label, kicker, title, accent, id }) {
  return (
    <div className="nvx-section-heading">
      {label && <p className="nvx-section-index">{label}</p>}
      {kicker && <p className="nvx-kicker">{kicker}</p>}
      <h2 id={id}>{title}{accent && <><br /><span className="nvx-gradient-text">{accent}</span></>}</h2>
    </div>
  );
}

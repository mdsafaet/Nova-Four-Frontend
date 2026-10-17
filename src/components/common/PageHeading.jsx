export default function PageHeading({ label, title }) {
  const words = title.split(' ');
  const split = Math.ceil(words.length / 2);
  return (
    <div className="nvx-page-heading">
      {label && <p className="nvx-section-index">{label}</p>}
      <p className="nvx-kicker">Nova Development</p>
      <h1 className="page-title">{words.slice(0, split).join(' ')}<br /><span className="nvx-gradient-text">{words.slice(split).join(' ')}</span></h1>
    </div>
  );
}

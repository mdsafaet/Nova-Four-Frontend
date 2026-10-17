import PageHeading from '../components/common/PageHeading';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCountry } from '../context/country';
export default function Contact() {
  const m = useCountry();
  const [params] = useSearchParams();
  const selected = m.projects.find(p => p.slug === params.get('project'));
  const [draft, setDraft] = useState(null);
  function submit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setDraft(values);
  }
  return <section className="nvx-shell nvx-section nvx-page"><PageHeading label={"Contact / " + m.name} title={"A conversation starts here."} /><div className="contact-grid"><aside><h2>{m.contact.heading}</h2><p>{m.contact.intro}</p><dl><div><dt>Office</dt><dd>{m.contact.office}</dd></div><div><dt>Email</dt><dd>{m.contact.email || 'To be confirmed'}</dd></div><div><dt>Phone</dt><dd>{m.contact.phone || 'To be confirmed'}</dd></div></dl></aside><form onSubmit={submit}><p className="disclosure">Preview form: prepare an enquiry locally. Nothing is sent or stored on a server.</p><div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div><label>Project<select name="project" defaultValue={selected?.slug || ''}><option value="">General enquiry</option>{m.projects.map(p => <option key={p.slug} value={p.slug}>{p.title}</option>)}</select></label><label>Your enquiry<textarea name="message" rows={5} required maxLength={3000} /></label><button className="button" type="submit">Preview enquiry ↗</button>{draft && <div className="draft" role="status"><h3>Enquiry prepared — not sent</h3><p>{draft.name} · {draft.email}</p><p>{m.name} / {m.projects.find(p => p.slug === draft.project)?.title || 'General enquiry'}</p><p className="whitespace-pre-wrap">{draft.message}</p><small>An approved contact endpoint is needed before enquiries can be delivered.</small></div>}</form></div></section>;
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeading from '../components/common/PageHeading';
import { useCountry } from '../context/country';
import { postData } from '../api/api';

const enquiryTypes = [
  ['investment', 'Investment'],
  ['partnership', 'Partnership'],
  ['portfolio', 'Portfolio / Projects'],
  ['media', 'Media & Press'],
  ['careers', 'Careers'],
  ['general', 'General'],
];

export default function Contact() {
  const market = useCountry();
  const [params] = useSearchParams();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const projects = market.projects || [];
  const selectedProject = projects.find(
    (project) => project.slug === params.get('project')
  );

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    setSending(true);
    setToast(null);

    try {
      await postData(`/${market.id}/enquiries`, {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone || null,
        company: values.company || null,
        enquiry_type: values.enquiry_type,
        project: values.project || null,
        message: values.message,
        privacy_consent: values.privacy_consent === 'on',
      });

      form.reset();

      setToast({
        type: 'success',
        message: 'Your enquiry has been sent.',
      });
    } catch (error) {
      setToast({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Your enquiry could not be sent. Please try again.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="nvx-shell nvx-section nvx-page">
      <PageHeading
        label={`Contact / ${market.name}`}
        title="A conversation starts here."
      />

      <div className="contact-grid">
        <aside>
          <h2>{market.contact.heading}</h2>
          <p>{market.contact.intro}</p>

          <dl>
            <div>
              <dt>Office</dt>
              <dd>{market.contact.office}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>{market.contact.email || 'To be confirmed'}</dd>
            </div>

            <div>
              <dt>Phone</dt>
              <dd>{market.contact.phone || 'To be confirmed'}</dd>
            </div>
          </dl>
        </aside>

        <form onSubmit={submit}>
          <div className="form-row">
            <label>
              First name *
              <input
                name="first_name"
                autoComplete="given-name"
                maxLength={60}
                required
              />
            </label>

            <label>
              Last name *
              <input
                name="last_name"
                autoComplete="family-name"
                maxLength={60}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Work email *
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                required
              />
            </label>

            <label>
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
          </div>

          <label>
            Company
            <input
              name="company"
              autoComplete="organization"
              maxLength={150}
            />
          </label>

          <label>
            Enquiry type *
            <select name="enquiry_type" defaultValue="" required>
              <option value="" disabled>
                Select a topic
              </option>

              {enquiryTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Project
            <select
              key={selectedProject?.slug || 'general'}
              name="project"
              defaultValue={selectedProject?.slug || ''}
            >
              <option value="">General enquiry</option>

              {projects.map((project) => (
                <option key={project.slug} value={project.slug}>
                  {project.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Message *
            <textarea
              name="message"
              rows={5}
              maxLength={3000}
              required
            />
          </label>

          <label>
            <input
              name="privacy_consent"
              type="checkbox"
              required
            />
            {' '}I agree to the Privacy Policy and consent to being contacted.
          </label>

          <button className="button" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>

      {toast && (
        <div
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`fixed bottom-5 right-5 z-[1000] flex w-[calc(100vw-2.5rem)] max-w-sm items-start gap-4 rounded-2xl border p-5 shadow-2xl sm:bottom-8 sm:right-8 ${
            toast.type === 'error'
              ? 'border-red-200 bg-[#3b1719] text-white'
              : 'border-[#23646c]/20 bg-[#0f131f] text-white'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {toast.type === 'error'
                ? 'Message not sent'
                : 'Message sent'}
            </p>

            <p className="mt-1 text-sm text-white/80">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close notification"
            className="rounded p-1 text-xl leading-none text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
import { Link } from 'react-router-dom';
import { useCountry } from '../../context/country';
import { countryOptions } from '../../countries';

const footerLogos = {
  bangladesh: '/images/nova-bangladesh-footer.svg',
  dubai: '/images/nova-dubai-footer.svg',
  usa: '/images/nova-usa-footer.svg',
  uk: '/images/nova-uk-footer.svg',
};

export default function Footer() {
  const m = useCountry();
  const arabic = m.id === 'dubai';
  const contact = m.contact;

  const navigation = arabic
    ? [['', 'الرئيسية'], ['about', 'من نحن'], ['portfolio', 'المشاريع'], ['contact', 'اتصل بنا']]
    : [['', 'Home'], ['about', 'About'], ['portfolio', 'Portfolio'], ['contact', 'Contact']];

  return (
    <footer className="nvx-footer nvx-dark">
      <div className="nvx-shell nvx-footer-grid">
        <div>
          <Link className="nvx-brand" to={'/' + m.id}>
            <img
  src={m.id === 'dubai'
    ? '/images/nova-dubai-logo.svg'
    : '/images/nova-logo-white.svg'}
  alt="Nova Development"
  width="190"
  height="54"
/>
          </Link>
          <p>{arabic ? 'أماكن مميزة. ورؤية مدروسة.' : 'Distinct places. A considered perspective.'}</p>
          <small>{arabic ? 'محتوى توضيحي فقط.' : 'Illustrative content only.'}</small>
        </div>

        <div>
          <h3>{arabic ? `استكشف ${m.name}` : `Explore ${m.name}`}</h3>
          {navigation.map(([path, label]) => (
            <Link key={path} to={'/' + m.id + (path ? '/' + path : '')}>
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h3>{arabic ? 'أسواقنا' : 'Our markets'}</h3>
          {countryOptions.map(country => (
            <Link key={country.id} to={'/' + country.id}>
              {country.name}
            </Link>
          ))}
        </div>

        <div>
          <h3>{arabic ? 'تواصل معنا' : 'Contact'}</h3>
          {contact.office && <p>{contact.office}</p>}
          {contact.email && (
            <p>
              <a href={'mailto:' + contact.email} dir="ltr">
                {contact.email}
              </a>
            </p>
          )}
          {contact.phone && (
            <p>
              <a href={'tel:' + contact.phone.replace(/\s/g, '')} dir="ltr">
                {contact.phone}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="nvx-shell nvx-footer-bottom">
        <span>
          © {new Date().getFullYear()} Nova Development.{' '}
          {arabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </span>
        <span>{m.name}</span>
      </div>
    </footer>
  );
}
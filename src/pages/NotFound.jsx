import { Link, useParams } from 'react-router-dom';
import { countries } from '../countries';
export default function NotFound({
  country
}) {
  const params = useParams();
  const market = countries[country || params.country] || countries.bangladesh;
  return <section className="nvx-shell nvx-section nvx-page empty"><title>Page not found | Nova Development</title><p className="eyebrow">404 / Page unavailable</p><h1 className="page-title">Let’s find your way back.</h1><p>This country, page or project is unavailable.</p><Link className="button" to={'/' + market.id}>Return to {market.name} home</Link></section>;
}

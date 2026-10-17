import { Link, useLocation } from 'react-router-dom';
import { countryOptions } from '../../countries';
import { switchPath } from '../../routes/paths';
import { useCountry } from '../../context/country';

export default function CountrySwitcher() {
  const market = useCountry();
  const {pathname} = useLocation();
  return (
    <nav className="nvx-markets-nav" aria-label="Choose your market">
      {countryOptions.map(country => (
        <Link key={country.id} to={switchPath(pathname, country)} aria-current={market.id === country.id ? 'true' : undefined}>
          <img className="nvx-flag" src={'/flags/' + country.id + '.svg'} alt="" width="40" height="28" />
          <span>{country.name}</span>
        </Link>
      ))}
    </nav>
  );
}

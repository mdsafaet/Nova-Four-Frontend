import { CountryContext } from './country';
import { countries } from '../countries';
import NotFound from '../pages/NotFound';
export default function CountryProvider({
  country,
  children
}) {
  const market = countries[country];
  return market ? <CountryContext.Provider value={market}>{children}</CountryContext.Provider> : <NotFound />;
}

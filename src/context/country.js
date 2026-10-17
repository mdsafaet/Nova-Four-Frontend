import { createContext, useContext } from 'react';
export const CountryContext = createContext(null);
export function useCountry() {
  const value = useContext(CountryContext);
  if (!value) throw new Error('Country provider required');
  return value;
}

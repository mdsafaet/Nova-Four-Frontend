import PageHeading from '../components/common/PageHeading';
import { useCountry } from '../context/country';
import GlobalPresence from '../components/home/GlobalPresence';
import Contact from '../components/home/Contact';
export default function About() {
  const m = useCountry();
  return <><section className="nvx-shell nvx-section nvx-page"><PageHeading label={"About / " + m.name} title={m.home.aboutTitle} /><div className="about-grid"><img src={m.home.aboutImage} alt="Illustrative residential architecture" /><div><p className="body-copy">{m.home.aboutText}</p><h2>A considered approach.</h2><p>{m.home.approach}</p><p className="disclosure">Company profile, team credentials and track record await approved content. No company performance claims are presented in this preview.</p></div></div></section>
  {/* <GlobalPresence /> */}
  <Contact /></>;
}

import HeroSection from '../components/home/HeroSection';
import AboutUs from '../components/home/AboutUs';
import BrandStory from '../components/home/BrandStory';
import OurProjects from '../components/home/OurProjects';

import NovaOne from '../components/home/NovaOne';


import Contact from '../components/home/Contact';
import LifestyleSection from '../components/common/LifestyleSection';
export default function Home() {
  return <>
  <HeroSection />
  
    <AboutUs />
    <LifestyleSection />

  <BrandStory />
  <OurProjects />
  
  
    <Contact />
    {/* <OurProjects /> */}

  
 

   <NovaOne />
  </>;
}

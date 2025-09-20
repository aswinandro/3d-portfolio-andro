import React from 'react';
import Hero from './sections/Hero';
import LogoShowcase from './sections/LogoShowcase';
import FeatureCards from './sections/FeatureCards';
import Testimonials from './sections/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <LogoShowcase />
      <FeatureCards />
      <Testimonials />
    </>
  );
};

export default HomePage;
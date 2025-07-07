import React, { Suspense, lazy } from "react";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import ErrorBoundary from "./components/ErrorBoundary";

const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => (
  <ErrorBoundary>
    <Navbar />
    <Hero />
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <LogoShowcase />
      <ShowcaseSection />
      <FeatureCards />
      <Experience />
      
    </Suspense>
      <TechStack />
          <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <Testimonials />
      <Contact />
      <Footer />
      </Suspense>
  </ErrorBoundary>
);

export default App;

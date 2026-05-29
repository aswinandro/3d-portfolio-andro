import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./sections/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages for better code splitting and performance
const HomePage = React.lazy(() => import('./Home'));
const AboutPage = React.lazy(() => import('./About'));
const WorkPage = React.lazy(() => import('./Work'));
const ContactPage = React.lazy(() => import('./ContactPage'));
const SkillsPage = React.lazy(() => import('./pages/SkillsPage'));

import {
  HeroSkeleton,
  ExperienceSkeleton,
  WorkSkeleton,
  ContactSkeleton,
  SkillsSkeleton,
} from "./components/Skeleton";

const SuspensePageFallback = () => {
  const path = window.location.pathname;
  if (path === "/about") return <ExperienceSkeleton />;
  if (path === "/work") return <WorkSkeleton />;
  if (path === "/contact") return <ContactSkeleton />;
  if (path === "/skills") return <SkillsSkeleton />;
  return <HeroSkeleton />;
};

const App = () => (
  <ErrorBoundary>
    <Navbar />
    <main>
      <Suspense fallback={<SuspensePageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </Suspense>
    </main>
    <Suspense>
      <Footer />
    </Suspense>
  </ErrorBoundary>
);

export default App;

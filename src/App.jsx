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

const App = () => (
  <ErrorBoundary>
    <Navbar />
    <main>
      <Suspense fallback={<div className="flex-center h-screen w-full">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </main>
    <Suspense>
      <Footer />
    </Suspense>
  </ErrorBoundary>
);

export default App;

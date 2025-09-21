import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll state for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Optional: close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="logo text-xl font-bold"
          onClick={handleLinkClick}
        >
          Aswin Andro
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block desktop">
          <ul className="flex gap-6">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link to={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Contact */}
        <Link to="/contact" className="hidden md:flex contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden z-50 flex flex-col items-center justify-center w-8 h-8"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            md:hidden fixed inset-0 z-40 h-screen w-screen
            bg-black/95 backdrop-blur-sm
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          style={{ overscrollBehavior: "none" }}
        >
          {/* Close(X) button inside overlay */}
          <button
            className="absolute top-6 right-6 text-white text-3xl z-50"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <nav>
            <ul className="flex flex-col items-center gap-8 text-center">
              {navLinks.map(({ link, name }) => (
                <li
                  key={name}
                  className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                >
                  <Link to={link} onClick={handleLinkClick}>
                    {name}
                  </Link>
                </li>
              ))}
              <li className="mt-8">
                <Link
                  to="/contact"
                  className="contact-btn group text-xl"
                  onClick={handleLinkClick}
                >
                  <div className="inner">
                    <span>Contact me</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
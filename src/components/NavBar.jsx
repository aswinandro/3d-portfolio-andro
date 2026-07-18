import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (link) => {
    if (link === "/") return location.pathname === "/";
    return location.pathname.startsWith(link.split("?")[0].split("#")[0]);
  };

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${
        hidden && !mobileMenuOpen ? "hidden-nav" : ""
      }`}
    >
      <div className="inner flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="logo text-xl font-bold"
          onClick={handleLinkClick}
        >
          Aswin<span>Andro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block desktop">
          <ul className="flex gap-8">
            {navLinks.map(({ link, name }) => (
              <li key={name} className={`group ${isActive(link) ? "active" : ""}`}>
                <Link to={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
                {isActive(link) && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5"
                    style={{
                      background: "linear-gradient(90deg, #a855f7, #3b82f6)",
                      borderRadius: "1px",
                    }}
                  />
                )}
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
            flex items-center justify-center
            transition-all duration-500 ease-out
            ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          style={{
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            overscrollBehavior: "none",
          }}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl z-50 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <nav>
            <ul className="flex flex-col items-center gap-8 text-center">
              {navLinks.map(({ link, name }, i) => (
                <li
                  key={name}
                  className="text-2xl font-semibold transition-all duration-300"
                  style={{
                    color: isActive(link) ? "#a855f7" : "rgba(248, 250, 252, 0.7)",
                    transform: mobileMenuOpen
                      ? "translateY(0) opacity(1)"
                      : "translateY(20px) opacity(0)",
                    transitionDelay: mobileMenuOpen ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <Link to={link} onClick={handleLinkClick}>
                    {name}
                  </Link>
                </li>
              ))}
              <li
                className="mt-8"
                style={{
                  transform: mobileMenuOpen
                    ? "translateY(0) opacity(1)"
                    : "translateY(20px) opacity(0)",
                  transitionDelay: mobileMenuOpen
                    ? `${navLinks.length * 80}ms`
                    : "0ms",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
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

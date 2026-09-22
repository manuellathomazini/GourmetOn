import { useState, useEffect } from 'react';

/**
 * Header Component for GourmetOn Landing Page
 * 
 * Features:
 * - Fixed position at the top of viewport (`fixed top-0 left-0 right-0 z-50`)
 * - Dynamic background opacity and blur transition on scroll
 * - Smooth scroll navigation to page sections
 * - Responsive mobile drawer menu with animated hamburger toggle
 * - No external icon library dependencies (pure inline SVGs)
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll position to dynamically adjust background opacity & styling
  useEffect(() => {
    const handleScroll = () => {
      // Threshold of 30px before applying scrolled styles
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items mapping to section IDs in the landing page
  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#apresentacao' },
    { name: 'Destaques', href: '#funcionalidades' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  // Smooth scroll handler to ensure seamless navigation across all browsers
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-black/5 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-2xl font-black tracking-tight text-[#1F1B18] transition-transform hover:scale-[1.02]"
        >
          Gourmet<span className="text-[#FF6B35]">On</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-semibold text-[#1F1B18]/80 hover:text-[#FF6B35] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B35] after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="bg-[#FF6B35] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#FF6B35]/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Pedir Agora
          </a>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-[#1F1B18] hover:bg-black/5 transition-colors focus:outline-none"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            // Close (X) Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div className="px-6 pt-3 pb-6 bg-white/95 backdrop-blur-lg border-b border-black/10 shadow-lg flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-semibold text-[#1F1B18]/80 hover:text-[#FF6B35] transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, '#contato')}
            className="text-center bg-[#FF6B35] text-white text-sm font-bold px-5 py-3 rounded-full shadow-md shadow-[#FF6B35]/20 hover:brightness-110 active:scale-95 transition-all mt-2"
          >
            Pedir Agora
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

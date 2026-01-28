import { useState } from 'react';
import { useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

/**
 * Header Component - Dark Theme with Neon Accents
 * Clean navigation with parallax-ready styling
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Ventures', href: '/ventures' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    setLocation(href);
    setIsOpen(false);
  };

  return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-lg md:text-2xl font-bold font-mono text-primary hover:text-accent transition-colors cursor-pointer bg-none border-none p-0"
        >
          <img src="/images/experiai-labs-logo-transparent.png" alt="ExperiAI Labs Logo" className="h-6 md:h-16" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="
    relative
    text-xs md:text-sm font-semibold text-foreground
    transition-all duration-300 cursor-pointer
    hover:text-primary
    after:absolute after:left-0 after:-bottom-0.5
    after:h-[2px] after:w-full after:scale-x-0
    after:bg-primary after:transition-transform after:duration-300
    hover:after:scale-x-100
    after:origin-left
  "
            >
              {link.label}
            </button>

          ))}
          <button
            onClick={() => handleNavClick('/contact')}
            className="neon-button text-xs px-3 md:px-4 py-2"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-foreground hover:text-primary hover:bg-background/50 transition-all duration-300 block py-2 px-3 text-left cursor-pointer bg-none border-none rounded-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('/contact')}
              className="neon-button text-xs w-full mt-2"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

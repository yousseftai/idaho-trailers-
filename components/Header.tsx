import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TrailerIcon, MenuIcon, XIcon } from './icons/Icons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClasses = "bg-pine-green text-cream";
  const inactiveLinkClasses = "text-forest-green hover:bg-sage-green hover:text-forest-green";
  
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const NavLinks = () => (
    <>
      <NavLink to="/trailers" className={getNavLinkClass}>Trailers</NavLink>
      <NavLink to="/ai-finder" className={getNavLinkClass}>AI Finder</NavLink>
      <NavLink to="/profile" className={getNavLinkClass}>My Rentals</NavLink>
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/80 backdrop-blur-lg shadow-md' : 'bg-cream'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-forest-green group">
              <TrailerIcon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-[-5deg]" />
              <span>Idaho Trailers</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLinks />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-forest-green hover:bg-sage-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream focus:ring-pine-green"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <NavLinks />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

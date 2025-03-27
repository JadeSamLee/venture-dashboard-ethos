
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/investor-dashboard', label: 'Investor Dashboard' },
    { path: '/founder-dashboard', label: 'Founder Dashboard' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">ETHVENTURE</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 
                  ${location.pathname === link.path 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex">
            <button className="glass-card px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
              Connect Wallet
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-medium transition-colors duration-200 
                  ${location.pathname === link.path 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full glass-card px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

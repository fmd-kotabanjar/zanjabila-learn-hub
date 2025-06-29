
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Program', path: '/program' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'E-book', path: '/ebook' },
    { name: 'Bantuan', path: '/bantuan' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Zanjabila Learn</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? 'text-zanjabila-blue-600 font-medium'
                      : 'text-gray-600 hover:text-zanjabila-blue-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/login">
              <Button variant="ghost" className="text-zanjabila-blue-600 hover:bg-zanjabila-blue-50">
                <User className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </NavLink>
            <NavLink to="/daftar">
              <Button className="bg-gradient-primary hover:opacity-90 text-white">
                Daftar
              </Button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors duration-200 ${
                      isActive
                        ? 'text-zanjabila-blue-600 font-medium'
                        : 'text-gray-600 hover:text-zanjabila-blue-600'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-zanjabila-blue-600 hover:bg-zanjabila-blue-50">
                    <User className="w-4 h-4 mr-2" />
                    Masuk
                  </Button>
                </NavLink>
                <NavLink to="/daftar" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                    Daftar
                  </Button>
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

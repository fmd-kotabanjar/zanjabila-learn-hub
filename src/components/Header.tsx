import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Program', path: '/program' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'E-book', path: '/ebook' },
    { name: 'Bantuan', path: '/bantuan' }
  ];

  const userNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Program', path: '/program' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'E-book', path: '/ebook' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Bantuan', path: '/bantuan' }
  ];

  const adminNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Program', path: '/program' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'E-book', path: '/ebook' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Admin Panel', path: '/admin' },
    { name: 'Bantuan', path: '/bantuan' }
  ];

  const getNavItems = () => {
    if (profile?.role_name === 'admin') return adminNavItems;
    if (user) return userNavItems;
    return publicNavItems;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Berhasil logout');
      navigate('/');
    } catch (error) {
      toast.error('Gagal logout');
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center backdrop-blur-lg">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Zanjabila Learn</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
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
            {!user ? (
              <>
                <NavLink to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-zanjabila-blue-600 hover:bg-zanjabila-blue-50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Masuk
                  </Button>
                </NavLink>
                <NavLink to="/daftar">
                  <Button className="bg-gradient-primary hover:opacity-90 text-white backdrop-blur-lg">
                    Daftar
                  </Button>
                </NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Selamat datang, {profile?.full_name || user.email}!
                </span>
                {profile?.role_name && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full capitalize">
                    {profile.role_name}
                  </span>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </div>
            )}
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
              {getNavItems().map((item) => (
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
                {!user ? (
                  <>
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="ghost" 
                        className="w-full text-zanjabila-blue-600 hover:bg-zanjabila-blue-50"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Masuk
                      </Button>
                    </NavLink>
                    <NavLink to="/daftar" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                        Daftar
                      </Button>
                    </NavLink>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold">Zanjabila Learn</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Platform pembelajaran online terdepan yang menyediakan program berkualitas, 
              artikel inspiratif, dan e-book gratis untuk mengembangkan potensi Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-zanjabila-blue-600 transition-colors">
                  f
                </div>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-zanjabila-blue-600 transition-colors">
                  t
                </div>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-zanjabila-orange-600 transition-colors">
                  i
                </div>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-zanjabila-blue-600 transition-colors">
                  in
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/program" className="text-gray-300 hover:text-white transition-colors">
                  Program
                </NavLink>
              </li>
              <li>
                <NavLink to="/artikel" className="text-gray-300 hover:text-white transition-colors">
                  Artikel
                </NavLink>
              </li>
              <li>
                <NavLink to="/ebook" className="text-gray-300 hover:text-white transition-colors">
                  E-book
                </NavLink>
              </li>
              <li>
                <NavLink to="/bantuan" className="text-gray-300 hover:text-white transition-colors">
                  Bantuan
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Dukungan</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@zanjabilalearn.com" className="text-gray-300 hover:text-white transition-colors">
                  support@zanjabilalearn.com
                </a>
              </li>
              <li>
                <a href="tel:+6281234567890" className="text-gray-300 hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <span className="text-gray-300">
                  Senin - Jumat, 09:00 - 17:00 WIB
                </span>
              </li>
              <li>
                <NavLink to="/bantuan" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </NavLink>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 Zanjabila Learn. Semua hak cipta dilindungi.
            </p>
            <p className="text-gray-300 text-sm mt-4 md:mt-0">
              Dibuat dengan ❤️ untuk pembelajar Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

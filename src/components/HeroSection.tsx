
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Belajar Tanpa Batas
              <span className="block text-zanjabila-blue-600">
                Raih Impianmu
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Bergabunglah dengan ribuan pembelajar di Zanjabila Learn. 
              Akses video pembelajaran berkualitas, artikel inspiratif, 
              dan e-book gratis untuk mengembangkan skill dan kariermu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/program">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 text-lg"
                >
                  Mulai Belajar
                </Button>
              </NavLink>
              <NavLink to="/program">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-zanjabila-blue-600 text-zanjabila-blue-600 hover:bg-zanjabila-blue-50 px-8 py-3 text-lg"
                >
                  Lihat Program
                </Button>
              </NavLink>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=600" 
                alt="Woman learning online"
                className="rounded-xl w-full h-64 object-cover"
              />
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pembelajaran Fleksibel
                </h3>
                <p className="text-gray-600">
                  Belajar kapan saja, di mana saja sesuai dengan jadwalmu
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-zanjabila-orange-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-zanjabila-blue-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

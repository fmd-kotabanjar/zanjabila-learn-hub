
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessCodeModal from '@/components/AccessCodeModal';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, Clock, Users, Play, ShoppingCart } from 'lucide-react';

const Program = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [unlockedPrograms, setUnlockedPrograms] = useState<string[]>([]);
  
  const categories = ['Semua', 'Parenting', 'Digital', 'Kolaborasi'];
  
  const programs = [
    {
      id: 1,
      title: "Akademi Tumbuh Kita",
      description: "Kelas pendidikan komprehensif tentang parenting modern untuk orang tua masa kini",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&h=250",
      price: "Rp 299.000",
      originalPrice: "Rp 499.000",
      duration: "20 jam",
      level: "Pemula - Menengah",
      category: "Parenting",
      rating: 4.9,
      students: 1250,
      isPremium: true,
      modules: ['Psikologi Anak', 'Komunikasi Efektif', 'Disiplin Positif', 'Nutrisi & Kesehatan']
    },
    {
      id: 2,
      title: "ZAAD - Zanjabila Arruhama Akademi Digital",
      description: "Program pengembangan skill digital lengkap untuk era modern",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&h=250",
      price: "Rp 399.000",
      originalPrice: "Rp 599.000",
      duration: "25 jam",
      level: "Menengah - Lanjutan",
      category: "Digital",
      rating: 4.8,
      students: 890,
      isPremium: true,
      modules: ['Digital Marketing', 'Content Creation', 'Social Media Strategy', 'Analytics']
    },
    {
      id: 3,
      title: "Program Kolaborasi Institusi",
      description: "Program kerjasama dengan lembaga pendidikan dan organisasi terpercaya",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&h=250",
      price: "Rp 199.000",
      originalPrice: "Rp 349.000",
      duration: "15 jam",
      level: "Semua Level",
      category: "Kolaborasi",
      rating: 4.7,
      students: 2100,
      isPremium: true,
      modules: ['Leadership', 'Team Building', 'Project Management', 'Networking']
    },
    {
      id: 4,
      title: "Webinar Gratis Parenting",
      description: "Sesi webinar gratis tentang dasar-dasar parenting modern",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&h=250",
      price: "Gratis",
      originalPrice: "",
      duration: "2 jam",
      level: "Pemula",
      category: "Parenting",
      rating: 4.6,
      students: 5200,
      isPremium: false,
      modules: ['Pengenalan Parenting', 'Tips Praktis', 'Q&A Session']
    }
  ];

  const filteredPrograms = selectedCategory === 'Semua' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const handlePurchase = (programId: number) => {
    const program = programs.find(p => p.id === programId);
    if (program?.isPremium) {
      // Redirect ke link pembelian yang bisa disetting di admin
      const purchaseLinks: { [key: string]: string } = {
        'Akademi Tumbuh Kita': 'https://checkout.example.com/akademi-tumbuh-kita',
        'ZAAD - Zanjabila Arruhama Akademi Digital': 'https://checkout.example.com/zaad',
        'Program Kolaborasi Institusi': 'https://checkout.example.com/kolaborasi'
      };
      
      const link = purchaseLinks[program.title];
      if (link) {
        window.open(link, '_blank');
      }
    }
  };

  const handleAccessProgram = (programTitle: string) => {
    if (unlockedPrograms.includes(programTitle)) {
      // Jika sudah unlock, bisa akses langsung
      alert(`Selamat belajar di ${programTitle}!`);
    } else {
      // Jika belum unlock, minta kode akses
      setSelectedProgram(programTitle);
      setIsAccessModalOpen(true);
    }
  };

  const handleAccessSuccess = () => {
    setUnlockedPrograms([...unlockedPrograms, selectedProgram]);
    alert(`Selamat! Anda sekarang memiliki akses ke ${selectedProgram}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 rounded-3xl border border-white/30 shadow-2xl p-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Program Pembelajaran
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pilih dari berbagai program pembelajaran berkualitas tinggi yang dirancang 
                untuk mengembangkan skill dan meningkatkan karier Anda
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-primary text-white backdrop-blur-lg"
                    : "backdrop-blur-lg bg-white/20 border-white/30 text-gray-700 hover:bg-white/30"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-2xl transition-all duration-300 backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-lg">
                        {program.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600/90 backdrop-blur-lg text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {program.rating}
                      </span>
                    </div>
                    {program.isPremium && (
                      <div className="absolute bottom-4 right-4">
                        <Lock className="w-5 h-5 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {program.students}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Modul Pembelajaran:</p>
                    <div className="flex flex-wrap gap-1">
                      {program.modules.slice(0, 2).map((module, index) => (
                        <span key={index} className="text-xs bg-blue-100/50 text-blue-700 px-2 py-1 rounded-full">
                          {module}
                        </span>
                      ))}
                      {program.modules.length > 2 && (
                        <span className="text-xs bg-gray-100/50 text-gray-600 px-2 py-1 rounded-full">
                          +{program.modules.length - 2} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        {program.price}
                      </span>
                      {program.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {program.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 space-y-2">
                  {program.isPremium ? (
                    <>
                      <Button 
                        onClick={() => handlePurchase(program.id)}
                        className="w-full bg-gradient-primary hover:opacity-90 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Beli Sekarang
                      </Button>
                      <Button 
                        onClick={() => handleAccessProgram(program.title)}
                        variant="outline"
                        className="w-full backdrop-blur-lg bg-white/20 border-white/30 hover:bg-white/30"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        {unlockedPrograms.includes(program.title) ? 'Mulai Belajar' : 'Input Kode Akses'}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => handleAccessProgram(program.title)}
                      className="w-full bg-gradient-secondary hover:opacity-90 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Mulai Belajar Gratis
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <AccessCodeModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        contentTitle={selectedProgram}
        onSuccess={handleAccessSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default Program;

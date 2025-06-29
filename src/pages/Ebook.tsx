
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const Ebook = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  const categories = ['Semua', 'Programming', 'Design', 'Marketing', 'Business', 'Personal Development'];
  
  const ebooks = [
    {
      id: 1,
      title: "Panduan Lengkap Web Development",
      description: "E-book komprehensif untuk memulai karier sebagai web developer profesional. Mencakup HTML, CSS, JavaScript, dan framework modern.",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=400",
      pages: 150,
      downloads: 2540,
      category: "Programming",
      author: "Tim Developer Zanjabila",
      rating: 4.8
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      description: "Strategi marketing digital yang terbukti efektif untuk bisnis. Dari SEO hingga social media marketing yang menghasilkan konversi tinggi.",
      cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=400",
      pages: 120,
      downloads: 1890,
      category: "Marketing",
      author: "Sarah Digital",
      rating: 4.9
    },
    {
      id: 3,
      title: "Data Science untuk Pemula",
      description: "Memahami data science dari dasar hingga implementasi praktis. Belajar Python, pandas, dan machine learning dengan mudah.",
      cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=400",
      pages: 180,
      downloads: 3210,
      category: "Programming",
      author: "Dr. Data Analyst",
      rating: 4.7
    },
    {
      id: 4,
      title: "Kiat Sukses Freelancer",
      description: "Tips dan trik menjadi freelancer sukses di era digital. Mulai dari mencari klien hingga mengelola bisnis freelance yang profitable.",
      cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=400",
      pages: 95,
      downloads: 1650,
      category: "Personal Development",
      author: "Freelancer Pro",
      rating: 4.6
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Prinsip-prinsip dasar desain UI/UX yang harus dikuasai setiap designer. Dari wireframing hingga prototyping yang efektif.",
      cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=400",
      pages: 135,
      downloads: 2180,
      category: "Design",
      author: "Design Master",
      rating: 4.8
    },
    {
      id: 6,
      title: "Strategi Bisnis Online",
      description: "Membangun bisnis online dari nol hingga sukses. Panduan lengkap untuk entrepreneur yang ingin terjun ke dunia digital.",
      cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=400",
      pages: 160,
      downloads: 1420,
      category: "Business",
      author: "Business Guru",
      rating: 4.5
    }
  ];

  const filteredEbooks = selectedCategory === 'Semua' 
    ? ebooks 
    : ebooks.filter(ebook => ebook.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              E-book Gratis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download koleksi e-book berkualitas tinggi secara gratis. 
              Berbagai topik mulai dari teknologi hingga pengembangan diri tersedia untuk Anda
            </p>
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
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* E-books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEbooks.map((ebook) => (
              <Card key={ebook.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        GRATIS
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-sm font-medium">
                        ⭐ {ebook.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-green-600 font-medium">
                      {ebook.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {ebook.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {ebook.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>📄 {ebook.pages} halaman</span>
                      <span>⬇️ {ebook.downloads.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      oleh {ebook.author}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Download Gratis
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dapatkan Update E-book Terbaru
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan notifikasi e-book baru 
              dan konten eksklusif lainnya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ebook;

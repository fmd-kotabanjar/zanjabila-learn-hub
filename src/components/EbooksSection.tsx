
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const EbooksSection = () => {
  const ebooks = [
    {
      id: 1,
      title: "Panduan Lengkap Web Development",
      description: "E-book komprehensif untuk memulai karier sebagai web developer",
      cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=400",
      pages: 150,
      downloads: 2540,
      category: "Programming"
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      description: "Strategi marketing digital yang terbukti efektif untuk bisnis",
      cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=400",
      pages: 120,
      downloads: 1890,
      category: "Marketing"
    },
    {
      id: 3,
      title: "Data Science untuk Pemula",
      description: "Memahami data science dari dasar hingga implementasi praktis",
      cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=400",
      pages: 180,
      downloads: 3210,
      category: "Data Science"
    },
    {
      id: 4,
      title: "Kiat Sukses Freelancer",
      description: "Tips dan trik menjadi freelancer sukses di era digital",
      cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=400",
      pages: 95,
      downloads: 1650,
      category: "Karier"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            E-book Gratis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download e-book berkualitas tinggi secara gratis untuk 
            memperdalam pengetahuan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ebooks.map((ebook) => (
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
                      <BookOpen className="w-5 h-5 text-zanjabila-blue-600" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-zanjabila-blue-600 font-medium">
                    {ebook.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-zanjabila-blue-600 transition-colors line-clamp-2">
                  {ebook.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {ebook.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📄 {ebook.pages} halaman</span>
                  <span>⬇️ {ebook.downloads.toLocaleString()}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-gradient-secondary hover:opacity-90 text-white">
                  Download Gratis
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <NavLink to="/ebook">
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Lihat Semua E-book
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default EbooksSection;

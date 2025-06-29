
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Artikel = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  const categories = ['Semua', 'Teknologi', 'Karier', 'Pembelajaran', 'Bisnis'];
  
  const articles = [
    {
      id: 1,
      title: "5 Skill Teknologi Yang Wajib Dikuasai di 2024",
      excerpt: "Teknologi terus berkembang pesat. Simak skill teknologi apa saja yang perlu Anda kuasai untuk tetap relevan di era digital ini. Dari AI hingga cloud computing...",
      category: "Teknologi",
      author: "Tim Zanjabila",
      date: "15 Des 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 2,
      title: "Cara Membangun Personal Branding di Era Digital",
      excerpt: "Personal branding bukan hanya untuk selebriti. Pelajari bagaimana membangun personal branding yang kuat untuk karier Anda di dunia digital yang semakin kompetitif...",
      category: "Karier",
      author: "Sarah Johnson",
      date: "12 Des 2024",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 3,
      title: "Tips Efektif Belajar Online untuk Pemula",
      excerpt: "Belajar online memiliki tantangan tersendiri. Ikuti tips efektif ini untuk memaksimalkan pembelajaran online Anda dan mencapai tujuan belajar yang optimal...",
      category: "Pembelajaran",
      author: "Dr. Ahmad Rizki",
      date: "10 Des 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 4,
      title: "Strategi Marketing Digital untuk UKM",
      excerpt: "UKM perlu adaptasi dengan strategi marketing digital. Pelajari langkah-langkah praktis untuk meningkatkan visibility dan penjualan bisnis kecil Anda...",
      category: "Bisnis",
      author: "Rina Sari",
      date: "8 Des 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 5,
      title: "Mengenal Artificial Intelligence dalam Kehidupan Sehari-hari",
      excerpt: "AI bukan lagi teknologi masa depan, tapi sudah hadir di sekitar kita. Kenali berbagai aplikasi AI yang mungkin sudah Anda gunakan tanpa disadari...",
      category: "Teknologi",
      author: "Prof. Bambang",
      date: "5 Des 2024",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 6,
      title: "Mindset Growth untuk Karier yang Sukses",
      excerpt: "Mindset adalah fondasi kesuksesan. Pelajari bagaimana mengembangkan growth mindset yang akan membantu Anda mencapai puncak karier impian...",
      category: "Karier",
      author: "Dr. Lisa Wijaya",
      date: "3 Des 2024",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=250"
    }
  ];

  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Artikel & Insight
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Baca artikel terbaru seputar teknologi, karier, pembelajaran, dan bisnis 
              dari para ahli berpengalaman di bidangnya
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
                    ? "bg-gradient-secondary text-white"
                    : "border-zanjabila-orange-600 text-zanjabila-orange-600 hover:bg-zanjabila-orange-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-zanjabila-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-zanjabila-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="font-medium">{article.author}</span>
                    <span>{article.readTime} baca</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {article.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-zanjabila-orange-600 text-zanjabila-orange-600 hover:bg-zanjabila-orange-50"
            >
              Muat Lebih Banyak
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Artikel;


import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: "5 Skill Teknologi Yang Wajib Dikuasai di 2024",
      excerpt: "Teknologi terus berkembang pesat. Simak skill teknologi apa saja yang perlu Anda kuasai untuk tetap relevan di era digital...",
      category: "Teknologi",
      author: "Tim Zanjabila",
      date: "15 Des 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 2,
      title: "Cara Membangun Personal Branding di Era Digital",
      excerpt: "Personal branding bukan hanya untuk selebriti. Pelajari bagaimana membangun personal branding yang kuat untuk karier Anda...",
      category: "Karier",
      author: "Sarah Johnson",
      date: "12 Des 2024",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 3,
      title: "Tips Efektif Belajar Online untuk Pemula",
      excerpt: "Belajar online memiliki tantangan tersendiri. Ikuti tips efektif ini untuk memaksimalkan pembelajaran online Anda...",
      category: "Pembelajaran",
      author: "Dr. Ahmad Rizki",
      date: "10 Des 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&h=250"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Artikel Terbaru
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Baca insight terbaru seputar teknologi, karier, dan pembelajaran 
            dari para ahli di bidangnya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-zanjabila-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.readTime} baca</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {article.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <NavLink to="/artikel">
            <Button 
              variant="outline" 
              size="lg"
              className="border-zanjabila-orange-600 text-zanjabila-orange-600 hover:bg-zanjabila-orange-50"
            >
              Baca Semua Artikel
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

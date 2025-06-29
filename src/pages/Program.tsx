
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Program = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  const categories = ['Semua', 'Programming', 'Design', 'Marketing', 'Business'];
  
  const programs = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Pelajari dasar-dasar HTML, CSS, dan JavaScript untuk membangun website modern",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250",
      price: "Rp 299.000",
      originalPrice: "Rp 499.000",
      duration: "12 jam",
      level: "Pemula",
      category: "Programming",
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      description: "Kuasai strategi pemasaran digital untuk meningkatkan bisnis online Anda",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250",
      price: "Rp 399.000",
      originalPrice: "Rp 599.000",
      duration: "15 jam",
      level: "Menengah",
      category: "Marketing",
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      description: "Analisis data menggunakan Python dan berbagai library populer",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250",
      price: "Rp 499.000",
      originalPrice: "Rp 799.000",
      duration: "20 jam",
      level: "Lanjutan",
      category: "Programming",
      rating: 4.7,
      students: 672
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      description: "Belajar membuat desain yang user-friendly dan menarik",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=250",
      price: "Rp 449.000",
      originalPrice: "Rp 699.000",
      duration: "18 jam",
      level: "Menengah",
      category: "Design",
      rating: 4.8,
      students: 945
    }
  ];

  const filteredPrograms = selectedCategory === 'Semua' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Program Pembelajaran
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih dari berbagai program pembelajaran berkualitas tinggi yang dirancang 
              untuk mengembangkan skill dan meningkatkan karier Anda
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
                    ? "bg-gradient-primary text-white"
                    : "border-zanjabila-blue-600 text-zanjabila-blue-600 hover:bg-zanjabila-blue-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-zanjabila-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {program.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                        ⭐ {program.rating}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-zanjabila-blue-600 transition-colors line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⏱️ {program.duration}</span>
                    <span>👥 {program.students} siswa</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-zanjabila-orange-600">
                        {program.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {program.originalPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                    Beli Sekarang
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Program;

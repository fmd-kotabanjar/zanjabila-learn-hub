
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Pelajari dasar-dasar HTML, CSS, dan JavaScript untuk membangun website modern",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250",
      price: "Rp 299.000",
      duration: "12 jam",
      level: "Pemula"
    },
    {
      id: 2,
      title: "Digital Marketing Strategy",
      description: "Kuasai strategi pemasaran digital untuk meningkatkan bisnis online Anda",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250",
      price: "Rp 399.000",
      duration: "15 jam",
      level: "Menengah"
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      description: "Analisis data menggunakan Python dan berbagai library populer",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250",
      price: "Rp 499.000",
      duration: "20 jam",
      level: "Lanjutan"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Program Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih program pembelajaran terbaik yang dirancang khusus untuk 
            mengembangkan keahlian dan karier Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
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
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-zanjabila-blue-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {program.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⏱️ {program.duration}</span>
                  <span className="text-xl font-bold text-zanjabila-orange-600">
                    {program.price}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <NavLink to="/program">
            <Button 
              variant="outline" 
              size="lg"
              className="border-zanjabila-blue-600 text-zanjabila-blue-600 hover:bg-zanjabila-blue-50"
            >
              Lihat Semua Program
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;

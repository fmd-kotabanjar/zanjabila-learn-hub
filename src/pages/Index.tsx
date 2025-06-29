
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedPrograms from '@/components/FeaturedPrograms';
import ArticlesSection from '@/components/ArticlesSection';
import EbooksSection from '@/components/EbooksSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPrograms />
        <ArticlesSection />
        <EbooksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

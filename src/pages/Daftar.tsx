import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Daftar = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak sama');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      toast.success('Akun berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Gagal membuat akun. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Buat Akun Baru
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Bergabunglah dengan ribuan pembelajar lainnya
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-orange-500"
                      placeholder="Masukkan nama lengkap"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-orange-500"
                      placeholder="masukkan@email.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-orange-500"
                      placeholder="Masukkan password (min. 6 karakter)"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-orange-500"
                      placeholder="Konfirmasi password"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-zanjabila-orange-600 rounded mt-1" 
                      required 
                      disabled={loading}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Saya setuju dengan{' '}
                      <a href="#" className="text-zanjabila-orange-600 hover:underline">
                        Syarat & Ketentuan
                      </a>{' '}
                      dan{' '}
                      <a href="#" className="text-zanjabila-orange-600 hover:underline">
                        Kebijakan Privasi
                      </a>
                    </span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-secondary hover:opacity-90 text-white py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : 'Daftar Sekarang'}
                  </Button>
                </form>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Sudah punya akun?{' '}
                    <NavLink 
                      to="/login" 
                      className="text-zanjabila-orange-600 hover:underline font-medium"
                    >
                      Masuk di sini
                    </NavLink>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Daftar;
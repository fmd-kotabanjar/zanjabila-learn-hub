import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Berhasil masuk!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Gagal masuk. Periksa email dan password Anda.');
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
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Masuk ke Akun Anda
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Selamat datang kembali di Zanjabila Learn
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-blue-500"
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zanjabila-blue-500"
                      placeholder="Masukkan password"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-zanjabila-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                    </label>
                    <a href="#" className="text-sm text-zanjabila-blue-600 hover:underline">
                      Lupa password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : 'Masuk'}
                  </Button>
                </form>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Belum punya akun?{' '}
                    <NavLink 
                      to="/daftar" 
                      className="text-zanjabila-blue-600 hover:underline font-medium"
                    >
                      Daftar sekarang
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

export default Login;
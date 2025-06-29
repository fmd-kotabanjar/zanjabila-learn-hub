import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookOpen, Award, History, Heart, Play, Download, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, profile, useAccessCode } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccessCode = async () => {
    if (!user || !accessCode.trim()) return;
    
    setLoading(true);
    try {
      await useAccessCode(accessCode);
      toast.success(`Selamat! Kode akses berhasil diaktifkan. Role Anda sekarang: ${accessCode.replace('2024', '')}`);
      setAccessCode('');
    } catch (error: any) {
      toast.error(error.message || 'Kode akses tidak valid atau sudah digunakan');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Tidak diketahui';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return null; // This should be handled by ProtectedRoute
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-lg bg-white/20 rounded-3xl border border-white/30 shadow-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              Dashboard Pengguna
            </h1>
            <p className="text-gray-600">
              Selamat datang kembali, {profile?.full_name || user.email}!
            </p>
            {profile?.role_name && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Role: {profile.role_name}
                </span>
              </div>
            )}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="backdrop-blur-lg bg-white/20 border border-white/30 p-1 rounded-2xl">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Profil</TabsTrigger>
              <TabsTrigger value="access" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Kode Akses</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Informasi Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.full_name || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900 font-medium">
                        {user.email}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.role_name || 'Belum ada role'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.employee_id || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.department || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.position || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-gray-900 font-medium">
                        {profile?.phone || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        profile?.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {profile?.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/20">
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Dibuat:</span> {formatDate(profile?.created_at)}
                      </div>
                      <div>
                        <span className="font-medium">Diperbarui:</span> {formatDate(profile?.updated_at)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange-600" />
                    Masukkan Kode Akses
                  </CardTitle>
                  <p className="text-gray-600">
                    Masukkan kode akses untuk mendapatkan role tertentu dalam sistem
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Akses
                    </label>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-center text-lg tracking-wider"
                      placeholder="MASUKKAN-KODE-AKSES"
                      maxLength={20}
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    onClick={handleAccessCode}
                    className="w-full bg-gradient-secondary text-lg py-3"
                    disabled={!accessCode || loading}
                  >
                    {loading ? 'Memproses...' : 'Aktivasi Kode Akses'}
                  </Button>
                  
                  <div className="mt-8 p-4 backdrop-blur-lg bg-yellow-50/50 border border-yellow-200/50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Cara Menggunakan Kode Akses:</h4>
                    <ol className="text-sm text-yellow-700 space-y-1">
                      <li>1. Dapatkan kode akses dari administrator</li>
                      <li>2. Masukkan kode akses di form di atas</li>
                      <li>3. Klik "Aktivasi Kode Akses" untuk mendapatkan role</li>
                      <li>4. Role Anda akan diperbarui secara otomatis</li>
                    </ol>
                  </div>

                  <div className="mt-6 p-4 backdrop-blur-lg bg-blue-50/50 border border-blue-200/50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Kode Akses yang Tersedia:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">TEACHER2024</code> - Teacher Role</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">ADMIN2024</code> - Admin Role</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">MEDIA2024</code> - Media Role</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">TREASURER2024</code> - Treasurer Role</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">HR2024</code> - HR Role</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">INFRA2024</code> - Infrastructure Role</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
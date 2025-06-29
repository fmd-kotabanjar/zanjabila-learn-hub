import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, BookOpen, Award, History, Heart, Play, Download, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  getUserPrograms, 
  getPurchaseHistory, 
  getSavedContent, 
  useAccessCode,
  type UserProgram,
  type PurchaseHistory,
  type SavedContent
} from '@/lib/programs';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [userPrograms, setUserPrograms] = useState<UserProgram[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      const [programs, purchases, saved] = await Promise.all([
        getUserPrograms(user.id),
        getPurchaseHistory(user.id),
        getSavedContent(user.id)
      ]);
      
      setUserPrograms(programs);
      setPurchaseHistory(purchases);
      setSavedContent(saved);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Gagal memuat data pengguna');
    }
  };

  const handleAccessCode = async () => {
    if (!user || !accessCode.trim()) return;
    
    setLoading(true);
    try {
      // Map access codes to program info
      const programMap: { [key: string]: { id: string; title: string } } = {
        'AKTKITA2024': { id: 'akademi-tumbuh-kita', title: 'Akademi Tumbuh Kita' },
        'ZAAD2024': { id: 'zaad', title: 'ZAAD - Zanjabila Arruhama Akademi Digital' },
        'KOLABORASI24': { id: 'kolaborasi', title: 'Program Kolaborasi Institusi' },
        'EBOOK2024': { id: 'premium-ebooks', title: 'E-book Premium' },
        'ARTIKEL2024': { id: 'premium-articles', title: 'Artikel Premium' }
      };

      const programInfo = programMap[accessCode.toUpperCase()];
      if (!programInfo) {
        toast.error('Kode akses tidak valid');
        return;
      }

      await useAccessCode(user.id, accessCode, programInfo.id, programInfo.title);
      toast.success(`Selamat! Kode akses berhasil diaktifkan untuk ${programInfo.title}`);
      setAccessCode('');
      
      // Reload user programs
      const updatedPrograms = await getUserPrograms(user.id);
      setUserPrograms(updatedPrograms);
    } catch (error: any) {
      toast.error(error.message || 'Kode akses tidak valid atau sudah digunakan');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
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
              Selamat datang kembali, {profile?.full_name || user.email}! Lanjutkan perjalanan belajar Anda.
            </p>
          </div>

          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="backdrop-blur-lg bg-white/20 border border-white/30 p-1 rounded-2xl">
              <TabsTrigger value="progress" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Progress Belajar</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Riwayat Pembelian</TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Konten Tersimpan</TabsTrigger>
              <TabsTrigger value="access" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Kode Akses</TabsTrigger>
            </TabsList>

            <TabsContent value="progress">
              <div className="grid gap-6">
                {userPrograms.length === 0 ? (
                  <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                    <CardContent className="p-8 text-center">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Belum Ada Program
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Anda belum terdaftar di program apapun. Mulai belajar sekarang!
                      </p>
                      <Button className="bg-gradient-primary">
                        Jelajahi Program
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  userPrograms.map((program) => (
                    <Card key={program.id} className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            {program.program_title}
                          </span>
                          <span className="text-sm text-gray-600">
                            Progress: {program.progress}%
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={program.progress} className="mb-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Terdaftar: {formatDate(program.enrolled_at || '')}
                          </span>
                          <Button className="bg-gradient-primary">
                            <Play className="w-4 h-4 mr-2" />
                            Lanjutkan Belajar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-green-600" />
                    Riwayat Pembelian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {purchaseHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Belum ada riwayat pembelian</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-3 px-4">Item</th>
                            <th className="text-left py-3 px-4">Tanggal</th>
                            <th className="text-left py-3 px-4">Harga</th>
                            <th className="text-left py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseHistory.map((item) => (
                            <tr key={item.id} className="border-b border-white/10">
                              <td className="py-3 px-4 font-medium">{item.item_title}</td>
                              <td className="py-3 px-4">{formatDate(item.purchased_at || '')}</td>
                              <td className="py-3 px-4 font-bold text-green-600">
                                {formatCurrency(item.amount || 0)}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {item.status === 'completed' ? 'Selesai' :
                                   item.status === 'pending' ? 'Pending' : 'Gagal'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <div className="grid md:grid-cols-2 gap-6">
                {savedContent.length === 0 ? (
                  <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl md:col-span-2">
                    <CardContent className="p-8 text-center">
                      <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Belum Ada Konten Tersimpan
                      </h3>
                      <p className="text-gray-600">
                        Simpan artikel, e-book, atau video favorit Anda untuk akses mudah
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  savedContent.map((content) => (
                    <Card key={content.id} className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{content.content_title}</h3>
                            <p className="text-sm text-gray-600 capitalize">{content.content_type}</p>
                            <p className="text-sm text-gray-500">
                              Disimpan: {formatDate(content.saved_at || '')}
                            </p>
                          </div>
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                        <Button className="w-full bg-gradient-primary">
                          <Play className="w-4 h-4 mr-2" />
                          Buka Konten
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="access">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange-600" />
                    Masukkan Kode Akses
                  </CardTitle>
                  <p className="text-gray-600">
                    Masukkan kode akses yang Anda terima setelah pembelian untuk mengakses konten premium
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
                      <li>1. Lakukan pembelian melalui link yang disediakan</li>
                      <li>2. Anda akan menerima kode akses via email</li>
                      <li>3. Masukkan kode akses di form di atas</li>
                      <li>4. Klik "Aktivasi Kode Akses" untuk mengakses konten</li>
                    </ol>
                  </div>

                  <div className="mt-6 p-4 backdrop-blur-lg bg-blue-50/50 border border-blue-200/50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Kode Akses yang Tersedia:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">AKTKITA2024</code> - Akademi Tumbuh Kita</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">ZAAD2024</code> - ZAAD Program</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">KOLABORASI24</code> - Program Kolaborasi</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">EBOOK2024</code> - E-book Premium</li>
                      <li>• <code className="font-mono bg-blue-100 px-1 rounded">ARTIKEL2024</code> - Artikel Premium</li>
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
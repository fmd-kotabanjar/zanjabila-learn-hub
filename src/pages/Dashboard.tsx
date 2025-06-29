
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, BookOpen, Award, History, Heart, Play, Download, Lock } from 'lucide-react';

const Dashboard = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const userProgress = [
    { program: 'Akademi Tumbuh Kita', progress: 75, totalVideos: 20, completedVideos: 15 },
    { program: 'ZAAD', progress: 40, totalVideos: 25, completedVideos: 10 }
  ];

  const purchaseHistory = [
    { id: 1, item: 'Akademi Tumbuh Kita', date: '2024-01-15', amount: 'Rp 299.000', status: 'Aktif' },
    { id: 2, item: 'E-book Parenting Modern', date: '2024-02-10', amount: 'Rp 49.000', status: 'Selesai' }
  ];

  const savedVideos = [
    { id: 1, title: 'Memahami Emosi Anak', program: 'Akademi Tumbuh Kita', duration: '15 menit' },
    { id: 2, title: 'Digital Marketing Basics', program: 'ZAAD', duration: '20 menit' }
  ];

  const certificates = [
    { id: 1, program: 'Akademi Tumbuh Kita', completionDate: '2024-03-15', status: 'Tersedia' }
  ];

  const handleAccessCode = () => {
    // Simulasi validasi kode akses
    const validCodes = ['AKTKITA2024', 'ZAAD2024', 'KOLABORASI24', 'EBOOK2024'];
    if (validCodes.includes(accessCode.toUpperCase())) {
      alert(`Selamat! Kode akses ${accessCode} berhasil diaktifkan. Anda sekarang memiliki akses ke konten premium.`);
      setAccessCode('');
      setIsCodeModalOpen(false);
    } else {
      alert('Kode akses tidak valid. Silakan periksa kembali kode Anda.');
    }
  };

  const openAccessModal = (contentType: string) => {
    setSelectedContent(contentType);
    setIsCodeModalOpen(true);
  };

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
            <p className="text-gray-600">Selamat datang kembali! Lanjutkan perjalanan belajar Anda.</p>
          </div>

          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="backdrop-blur-lg bg-white/20 border border-white/30 p-1 rounded-2xl">
              <TabsTrigger value="progress" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Progress Belajar</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Riwayat Pembelian</TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Video Tersimpan</TabsTrigger>
              <TabsTrigger value="certificates" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Sertifikat</TabsTrigger>
              <TabsTrigger value="access" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Kode Akses</TabsTrigger>
            </TabsList>

            <TabsContent value="progress">
              <div className="grid gap-6">
                {userProgress.map((item, index) => (
                  <Card key={index} className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          {item.program}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.completedVideos}/{item.totalVideos} video
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={item.progress} className="mb-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Progress: {item.progress}%
                        </span>
                        <Button className="bg-gradient-primary">
                          <Play className="w-4 h-4 mr-2" />
                          Lanjutkan Belajar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                            <td className="py-3 px-4 font-medium">{item.item}</td>
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4 font-bold text-green-600">{item.amount}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <div className="grid md:grid-cols-2 gap-6">
                {savedVideos.map((video) => (
                  <Card key={video.id} className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                          <p className="text-sm text-gray-600">{video.program}</p>
                          <p className="text-sm text-gray-500">Durasi: {video.duration}</p>
                        </div>
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      </div>
                      <Button className="w-full bg-gradient-primary">
                        <Play className="w-4 h-4 mr-2" />
                        Tonton Video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                    <CardContent className="p-6 text-center">
                      <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">{cert.program}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Diselesaikan: {cert.completionDate}
                      </p>
                      <Button className="w-full bg-gradient-secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Unduh Sertifikat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
                    />
                  </div>
                  <Button 
                    onClick={handleAccessCode}
                    className="w-full bg-gradient-secondary text-lg py-3"
                    disabled={!accessCode}
                  >
                    Aktivasi Kode Akses
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

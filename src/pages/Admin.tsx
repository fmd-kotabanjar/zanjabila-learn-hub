
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, BookOpen, FileText, Globe, Plus, Edit, Trash2 } from 'lucide-react';

const Admin = () => {
  const [purchaseLinks, setPurchaseLinks] = useState({
    akademiTumbuhKita: 'https://checkout.example.com/akademi-tumbuh-kita',
    zaad: 'https://checkout.example.com/zaad',
    kolaborasi: 'https://checkout.example.com/kolaborasi',
    ebook: 'https://checkout.example.com/ebook',
    artikel: 'https://checkout.example.com/artikel'
  });

  const [accessCodes, setAccessCodes] = useState([
    { id: 1, code: 'AKTKITA2024', program: 'Akademi Tumbuh Kita', active: true },
    { id: 2, code: 'ZAAD2024', program: 'ZAAD', active: true },
    { id: 3, code: 'KOLABORASI24', program: 'Program Kolaborasi', active: true }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@email.com', programs: ['Akademi Tumbuh Kita'], joinDate: '2024-01-15' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', programs: ['ZAAD'], joinDate: '2024-02-10' }
  ]);

  const updatePurchaseLink = (key: keyof typeof purchaseLinks, value: string) => {
    setPurchaseLinks(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-lg bg-white/20 rounded-3xl border border-white/30 shadow-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              Dashboard Admin
            </h1>
            <p className="text-gray-600">Kelola platform pembelajaran Zanjabila Learn</p>
          </div>

          <Tabs defaultValue="programs" className="space-y-6">
            <TabsList className="backdrop-blur-lg bg-white/20 border border-white/30 p-1 rounded-2xl">
              <TabsTrigger value="programs" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Program</TabsTrigger>
              <TabsTrigger value="purchase" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Link Pembelian</TabsTrigger>
              <TabsTrigger value="codes" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Kode Akses</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Pengguna</TabsTrigger>
            </TabsList>

            <TabsContent value="programs">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      Akademi Tumbuh Kita
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Kelas pendidikan tentang parenting untuk orang tua modern</p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Peserta:</strong> 1,250 orang</p>
                      <p className="text-sm"><strong>Rating:</strong> 4.9/5</p>
                      <p className="text-sm"><strong>Status:</strong> Aktif</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      ZAAD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Zanjabila - Arruhama Akademi Digital untuk pengembangan skill digital</p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Peserta:</strong> 890 orang</p>
                      <p className="text-sm"><strong>Rating:</strong> 4.8/5</p>
                      <p className="text-sm"><strong>Status:</strong> Aktif</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      Program Kolaborasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Program kerjasama dengan lembaga pendidikan dan organisasi</p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Partner:</strong> 25 lembaga</p>
                      <p className="text-sm"><strong>Peserta:</strong> 2,100 orang</p>
                      <p className="text-sm"><strong>Status:</strong> Aktif</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="purchase">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle>Pengaturan Link Pembelian</CardTitle>
                  <p className="text-gray-600">Atur link redirect untuk setiap jenis pembelian</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(purchaseLinks).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="url"
                        value={value}
                        onChange={(e) => updatePurchaseLink(key as keyof typeof purchaseLinks, e.target.value)}
                        className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://checkout.example.com/"
                      />
                    </div>
                  ))}
                  <Button className="bg-gradient-primary">
                    Simpan Perubahan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codes">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manajemen Kode Akses</CardTitle>
                    <p className="text-gray-600">Kelola kode akses untuk program berbayar</p>
                  </div>
                  <Button className="bg-gradient-secondary">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kode
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4">Kode</th>
                          <th className="text-left py-3 px-4">Program</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accessCodes.map((code) => (
                          <tr key={code.id} className="border-b border-white/10">
                            <td className="py-3 px-4 font-mono font-bold">{code.code}</td>
                            <td className="py-3 px-4">{code.program}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                code.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {code.active ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle>Manajemen Pengguna</CardTitle>
                  <p className="text-gray-600">Kelola data pengguna platform</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4">Nama</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Program</th>
                          <th className="text-left py-3 px-4">Bergabung</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-white/10">
                            <td className="py-3 px-4 font-medium">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                              {user.programs.map((program, index) => (
                                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                                  {program}
                                </span>
                              ))}
                            </td>
                            <td className="py-3 px-4">{user.joinDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Admin;

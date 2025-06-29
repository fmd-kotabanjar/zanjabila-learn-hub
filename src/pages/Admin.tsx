import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, BookOpen, FileText, Globe, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AccessCode {
  id: string;
  code: string;
  role_name: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string | null;
}

interface UserProfile {
  id: string;
  user_id: string | null;
  full_name: string;
  role_name: string | null;
  employee_id: string | null;
  department: string | null;
  position: string | null;
  phone: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

const Admin = () => {
  const { user, profile } = useAuth();
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile?.role_name === 'admin') {
      loadAdminData();
    }
  }, [user, profile]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load access codes
      const { data: codesData, error: codesError } = await supabase
        .from('access_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (codesError) throw codesError;
      setAccessCodes(codesData || []);

      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Gagal memuat data admin');
    } finally {
      setLoading(false);
    }
  };

  const toggleAccessCode = async (codeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('access_codes')
        .update({ is_active: !currentStatus })
        .eq('id', codeId);

      if (error) throw error;

      setAccessCodes(prev => 
        prev.map(code => 
          code.id === codeId 
            ? { ...code, is_active: !currentStatus }
            : code
        )
      );

      toast.success(`Kode akses ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
    } catch (error) {
      console.error('Error toggling access code:', error);
      toast.error('Gagal mengubah status kode akses');
    }
  };

  const createAccessCode = async () => {
    const code = prompt('Masukkan kode akses baru:');
    const roleName = prompt('Masukkan role (teacher/admin/media/treasurer/hr/infrastructure):');
    
    if (!code || !roleName) return;

    const validRoles = ['teacher', 'admin', 'media', 'treasurer', 'hr', 'infrastructure'];
    if (!validRoles.includes(roleName.toLowerCase())) {
      toast.error('Role tidak valid. Gunakan: teacher, admin, media, treasurer, hr, atau infrastructure');
      return;
    }

    try {
      const { error } = await supabase
        .from('access_codes')
        .insert({
          code: code.toUpperCase(),
          role_name: roleName.toLowerCase(),
          created_by: user?.id
        });

      if (error) throw error;

      toast.success('Kode akses berhasil dibuat');
      loadAdminData();
    } catch (error) {
      console.error('Error creating access code:', error);
      toast.error('Gagal membuat kode akses');
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

  if (profile?.role_name !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda tidak memiliki akses ke halaman admin.</p>
        </div>
      </div>
    );
  }

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
            <p className="text-gray-600">Kelola sistem dan pengguna</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="backdrop-blur-lg bg-white/20 border border-white/30 p-1 rounded-2xl">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="codes" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Kode Akses</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white/40 data-[state=active]:backdrop-blur-lg rounded-xl">Pengguna</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                        <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Kode Akses Aktif</p>
                        <p className="text-3xl font-bold text-green-600">
                          {accessCodes.filter(code => code.is_active).length}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Admin</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {users.filter(user => user.role_name === 'admin').length}
                        </p>
                      </div>
                      <Settings className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Teacher</p>
                        <p className="text-3xl font-bold text-orange-600">
                          {users.filter(user => user.role_name === 'teacher').length}
                        </p>
                      </div>
                      <BookOpen className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="codes">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manajemen Kode Akses</CardTitle>
                    <p className="text-gray-600">Kelola kode akses untuk role sistem</p>
                  </div>
                  <Button onClick={createAccessCode} className="bg-gradient-secondary">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kode
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-3 px-4">Kode</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Dibuat</th>
                            <th className="text-left py-3 px-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accessCodes.map((code) => (
                            <tr key={code.id} className="border-b border-white/10">
                              <td className="py-3 px-4 font-mono font-bold">{code.code}</td>
                              <td className="py-3 px-4 capitalize">{code.role_name}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  code.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {code.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm">
                                {formatDate(code.created_at)}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => toggleAccessCode(code.id, code.is_active)}
                                  >
                                    {code.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                  </Button>
                                </div>
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

            <TabsContent value="users">
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle>Manajemen Pengguna</CardTitle>
                  <p className="text-gray-600">Kelola data pengguna sistem</p>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-3 px-4">Nama</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Employee ID</th>
                            <th className="text-left py-3 px-4">Department</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Bergabung</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b border-white/10">
                              <td className="py-3 px-4 font-medium">
                                {user.full_name || 'Tidak ada nama'}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                  user.role_name === 'admin' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : user.role_name === 'teacher'
                                    ? 'bg-blue-100 text-blue-800'
                                    : user.role_name
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.role_name || 'no role'}
                                </span>
                              </td>
                              <td className="py-3 px-4">{user.employee_id || '-'}</td>
                              <td className="py-3 px-4">{user.department || '-'}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {user.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                              </td>
                              <td className="py-3 px-4">{formatDate(user.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createAllDemoAccounts, checkDemoAccounts, demoAccounts, type DemoAccount } from '@/lib/createDemoAccounts';
import { toast } from 'sonner';

const CreateDemoAccounts = () => {
  const [loading, setLoading] = useState(false);
  const [existingAccounts, setExistingAccounts] = useState<any[]>([]);
  const [checkingAccounts, setCheckingAccounts] = useState(true);

  useEffect(() => {
    checkExistingAccounts();
  }, []);

  const checkExistingAccounts = async () => {
    setCheckingAccounts(true);
    try {
      const accounts = await checkDemoAccounts();
      setExistingAccounts(accounts);
    } catch (error) {
      console.error('Error checking accounts:', error);
    } finally {
      setCheckingAccounts(false);
    }
  };

  const handleCreateAccounts = async () => {
    setLoading(true);
    try {
      const results = await createAllDemoAccounts();
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      if (successful > 0) {
        toast.success(`Berhasil membuat ${successful} akun demo!`);
      }
      
      if (failed > 0) {
        toast.error(`Gagal membuat ${failed} akun demo. Periksa console untuk detail.`);
      }
      
      // Refresh existing accounts
      await checkExistingAccounts();
      
    } catch (error) {
      console.error('Error creating demo accounts:', error);
      toast.error('Terjadi kesalahan saat membuat akun demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Setup Akun Demo
            </CardTitle>
            <p className="text-center text-gray-600">
              Buat akun demo untuk testing sistem dengan berbagai role
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Existing Accounts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Akun yang Sudah Ada</h3>
              {checkingAccounts ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Memeriksa akun yang ada...</p>
                </div>
              ) : existingAccounts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {existingAccounts.map((account, index) => (
                    <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-green-800">{account.full_name}</p>
                      <p className="text-sm text-green-600">Role: {account.role_name}</p>
                      <p className="text-sm text-green-600">ID: {account.employee_id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Belum ada akun demo yang dibuat</p>
              )}
            </div>

            {/* Demo Accounts to Create */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Akun Demo yang Akan Dibuat</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {demoAccounts.map((account: DemoAccount, index) => (
                  <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="space-y-2">
                      <p className="font-medium text-blue-800">{account.fullName}</p>
                      <p className="text-sm text-blue-600">Email: {account.email}</p>
                      <p className="text-sm text-blue-600">Password: {account.password}</p>
                      <p className="text-sm text-blue-600">Role: {account.role}</p>
                      {account.employeeId && (
                        <p className="text-sm text-blue-600">Employee ID: {account.employeeId}</p>
                      )}
                      {account.department && (
                        <p className="text-sm text-blue-600">Department: {account.department}</p>
                      )}
                      {account.position && (
                        <p className="text-sm text-blue-600">Position: {account.position}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <div className="text-center">
              <Button
                onClick={handleCreateAccounts}
                disabled={loading}
                className="bg-gradient-primary text-white px-8 py-3 text-lg"
              >
                {loading ? 'Membuat Akun Demo...' : 'Buat Semua Akun Demo'}
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-3">Petunjuk Penggunaan:</h4>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                <li>Klik tombol "Buat Semua Akun Demo" untuk membuat akun</li>
                <li>Tunggu proses selesai (mungkin membutuhkan beberapa menit)</li>
                <li>Setelah selesai, Anda bisa login dengan kredensial yang tertera</li>
                <li>Akun admin dapat mengakses halaman /admin</li>
                <li>Akun user biasa dapat mengakses dashboard dan fitur umum</li>
              </ol>
            </div>

            {/* Access Codes Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3">Kode Akses yang Tersedia:</h4>
              <div className="grid md:grid-cols-2 gap-2 text-green-700">
                <p>• <code className="bg-green-100 px-1 rounded">TEACHER2024</code> - Teacher Role</p>
                <p>• <code className="bg-green-100 px-1 rounded">ADMIN2024</code> - Admin Role</p>
                <p>• <code className="bg-green-100 px-1 rounded">MEDIA2024</code> - Media Role</p>
                <p>• <code className="bg-green-100 px-1 rounded">HR2024</code> - HR Role</p>
                <p>• <code className="bg-green-100 px-1 rounded">TREASURER2024</code> - Treasurer Role</p>
                <p>• <code className="bg-green-100 px-1 rounded">INFRA2024</code> - Infrastructure Role</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDemoAccounts;
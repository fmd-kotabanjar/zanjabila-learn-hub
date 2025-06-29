
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, X } from 'lucide-react';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentTitle: string;
  onSuccess: () => void;
}

const AccessCodeModal = ({ isOpen, onClose, contentTitle, onSuccess }: AccessCodeModalProps) => {
  const [accessCode, setAccessCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const validCodes = ['AKTKITA2024', 'ZAAD2024', 'KOLABORASI24', 'EBOOK2024', 'ARTIKEL2024'];
    if (validCodes.includes(accessCode.toUpperCase())) {
      onSuccess();
      setAccessCode('');
      onClose();
    } else {
      alert('Kode akses tidak valid. Silakan periksa kembali kode Anda.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="backdrop-blur-lg bg-white/90 border border-white/30 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-orange-600" />
            Kode Akses Diperlukan
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Untuk mengakses <strong>{contentTitle}</strong>, silakan masukkan kode akses yang Anda terima setelah pembelian.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kode Akses
            </label>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-center text-lg tracking-wider"
              placeholder="MASUKKAN-KODE-AKSES"
              maxLength={20}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-secondary"
              disabled={!accessCode}
            >
              Verifikasi Kode
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Batal
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Belum punya kode akses?</p>
            <Button 
              onClick={() => window.open('https://checkout.example.com/purchase', '_blank')}
              className="bg-gradient-primary"
            >
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeModal;

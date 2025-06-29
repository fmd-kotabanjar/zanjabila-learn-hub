
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Bantuan = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Bagaimana cara mendaftar di Zanjabila Learn?",
      answer: "Untuk mendaftar, klik tombol 'Daftar' di pojok kanan atas halaman, isi formulir pendaftaran dengan data yang valid, lalu verifikasi email Anda. Setelah itu, akun Anda akan aktif dan siap digunakan."
    },
    {
      id: 2,
      question: "Apakah e-book benar-benar gratis?",
      answer: "Ya, semua e-book yang tersedia di bagian E-book adalah 100% gratis. Anda hanya perlu mendaftar akun untuk dapat mengunduhnya. Tidak ada biaya tersembunyi atau langganan yang diperlukan."
    },
    {
      id: 3,
      question: "Bagaimana cara mengakses program berbayar setelah pembelian?",
      answer: "Setelah pembelian berhasil, program akan otomatis tersedia di dashboard Anda. Login ke akun, masuk ke menu 'Program Saya', dan Anda dapat langsung mengakses semua materi pembelajaran yang telah dibeli."
    },
    {
      id: 4,
      question: "Apakah ada sertifikat setelah menyelesaikan program?",
      answer: "Ya, setiap program yang diselesaikan akan memberikan sertifikat digital yang dapat Anda unduh dan bagikan di profil LinkedIn atau platform lainnya. Sertifikat akan tersedia di menu 'Sertifikat' di dashboard Anda."
    },
    {
      id: 5,
      question: "Bagaimana sistem pembayaran di Zanjabila Learn?",
      answer: "Kami menerima berbagai metode pembayaran termasuk transfer bank, e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit. Semua transaksi diproses dengan aman melalui sistem pembayaran terpercaya."
    },
    {
      id: 6,
      question: "Bisakah saya mengakses program selamanya setelah membeli?",
      answer: "Ya, sekali Anda membeli program, Anda memiliki akses seumur hidup ke materi tersebut. Anda dapat belajar dengan kecepatan Anda sendiri tanpa batasan waktu."
    },
    {
      id: 7,
      question: "Bagaimana jika saya mengalami masalah teknis?",
      answer: "Jika mengalami masalah teknis, Anda dapat menghubungi tim support kami melalui email support@zanjabilalearn.com atau WhatsApp di +62 812-3456-7890. Tim kami siap membantu Anda 24/7."
    },
    {
      id: 8,
      question: "Apakah ada garansi uang kembali?",
      answer: "Ya, kami memberikan garansi uang kembali 100% dalam 7 hari pertama pembelian jika Anda tidak puas dengan program yang dibeli. Hubungi customer service untuk proses refund."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pusat Bantuan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan atau hubungi tim support kami 
              untuk bantuan lebih lanjut
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="border border-gray-200 shadow-sm">
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </CardTitle>
                        {openFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    
                    {openFaq === faq.id && (
                      <CardContent className="pt-0">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Butuh Bantuan Lebih Lanjut?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                    <p className="text-gray-600 mb-2">support@zanjabilalearn.com</p>
                    <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                    <p className="text-gray-600 mb-2">+62 812-3456-7890</p>
                    <p className="text-sm text-gray-500">Senin - Jumat, 09:00 - 17:00 WIB</p>
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                    Hubungi Support
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-r from-zanjabila-blue-50 to-zanjabila-orange-50">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Tips Belajar Efektif
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-zanjabila-blue-600 mr-2">•</span>
                      Buat jadwal belajar yang konsisten
                    </li>
                    <li className="flex items-start">
                      <span className="text-zanjabila-blue-600 mr-2">•</span>
                      Catat poin-poin penting saat belajar
                    </li>
                    <li className="flex items-start">
                      <span className="text-zanjabila-blue-600 mr-2">•</span>
                      Praktikkan ilmu yang telah dipelajari
                    </li>
                    <li className="flex items-start">
                      <span className="text-zanjabila-blue-600 mr-2">•</span>
                      Bergabung dengan komunitas pembelajar
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Bergabung dengan Komunitas
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Diskusi dengan sesama pembelajar di grup Telegram kami
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-zanjabila-blue-600 text-zanjabila-blue-600 hover:bg-zanjabila-blue-50"
                  >
                    Join Grup Telegram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bantuan;

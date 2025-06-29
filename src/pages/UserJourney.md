
# Zanjabila Learn - User Journey & Alur Sistem

## 🔄 User Flow Overview

### 👤 PENGUNJUNG (Tidak Login)
**Akses:** Home, Program (terbatas), Artikel (terbatas), E-book (terbatas), Bantuan
**Tujuan:** Melihat konten gratis, mendaftar, atau login

**Journey:**
1. **Landing Page** → Melihat hero section, program unggulan, artikel, e-book
2. **Program Page** → Melihat daftar program, tombol "Beli Sekarang" → Redirect ke link pembelian
3. **Artikel Page** → Membaca artikel gratis, artikel premium membutuhkan kode akses
4. **E-book Page** → Download e-book gratis, e-book premium membutuhkan kode akses
5. **Register/Login** → Daftar akun baru atau masuk ke akun existing

### 👨‍💼 USER (Setelah Login)
**Akses:** Home, Program, Artikel, E-book, Dashboard, Bantuan
**Tujuan:** Belajar, mengakses konten premium, tracking progress

**Journey:**
1. **Dashboard** → Melihat progress belajar, riwayat pembelian, video tersimpan, sertifikat
2. **Program Page** → 
   - Beli program → Redirect ke link pembelian → Dapat kode akses via email
   - Input kode akses → Akses konten premium
   - Mulai belajar → Video player, progress tracking
3. **Artikel Page** → Baca artikel, simpan artikel favorit
4. **E-book Page** → Download e-book, akses e-book premium dengan kode
5. **Progress Tracking** → Otomatis tersimpan di dashboard

### 👨‍💻 ADMIN (Role Khusus)
**Akses:** Semua halaman user + Admin Panel
**Tujuan:** Mengelola platform, konten, user, kode akses

**Journey:**
1. **Admin Dashboard** → Overview statistik platform
2. **Manage Programs** → CRUD program pembelajaran
3. **Manage Purchase Links** → Setting redirect link untuk setiap jenis pembelian
4. **Manage Access Codes** → Generate, activate/deactivate kode akses
5. **User Management** → Lihat data user, status subscription
6. **Content Management** → Kelola artikel, e-book, video

## 🛍️ Purchase & Access Flow

### Alur Pembelian:
```
User klik "Beli" → Redirect ke Link Pembelian (bisa diatur di Admin) 
→ Pembayaran di platform eksternal → User dapat Kode Akses via email
→ User input kode di Dashboard/Modal → Konten terbuka
```

### Jenis Kode Akses:
- `AKTKITA2024` → Akademi Tumbuh Kita
- `ZAAD2024` → ZAAD Program  
- `KOLABORASI24` → Program Kolaborasi
- `EBOOK2024` → E-book Premium
- `ARTIKEL2024` → Artikel Premium

## 📱 Fitur-Fitur Utama

### 🏠 **Homepage**
- Hero section dengan CTA
- Program unggulan (card preview)
- Artikel terbaru (3-4 artikel)
- E-book gratis highlight
- Testimoni/review

### 📚 **Program Page**
- Filter berdasarkan kategori (Parenting, Digital, Kolaborasi)
- Card program dengan info: harga, durasi, rating, siswa
- Preview modul pembelajaran
- Button "Beli Sekarang" & "Input Kode Akses"
- Modal kode akses terintegrasi

### 📖 **Artikel Page**  
- Filter kategori artikel
- Search functionality
- Preview artikel (gratis vs premium)
- Modal kode akses untuk artikel premium
- Bookmark/save artikel (user login)

### 📑 **E-book Page**
- Grid layout dengan cover e-book
- Download gratis vs premium
- Preview PDF (beberapa halaman)
- Modal kode akses untuk e-book premium
- Download history (user login)

### 🎯 **User Dashboard**
- **Progress Belajar:** Chart progress setiap program
- **Riwayat Pembelian:** Tabel transaksi & status
- **Video Tersimpan:** Playlist personal
- **Sertifikat:** Download sertifikat completion
- **Input Kode Akses:** Form aktivasi kode baru

### ⚙️ **Admin Panel**
- **Program Management:** CRUD program, set harga, upload video
- **Purchase Links:** Setting redirect URL untuk setiap produk
- **Access Codes:** Generate kode, set expiry, track usage
- **User Management:** Data user, subscription status
- **Analytics:** Revenue, user engagement, popular content

### 🔐 **Authentication System**
- Register: Email, password, basic info
- Login: Email/password dengan role detection
- Role-based navigation (User vs Admin)
- Session management
- Logout functionality

## 🎨 **UI/UX Features**
- **Glassmorphism Design:** Backdrop blur, transparent elements
- **Responsive Layout:** Mobile-first approach
- **Loading States:** Skeleton loaders, progress indicators  
- **Error Handling:** User-friendly error messages
- **Toast Notifications:** Success/error feedback
- **Modal System:** Kode akses, konfirmasi actions
- **Dark/Light Mode:** Theme switching (optional)

## 🔄 **Data Flow**
```
Registration → Email Verification → Profile Setup
Purchase → Payment Gateway → Code Generation → Email Delivery
Code Input → Validation → Content Unlock → Progress Tracking
Admin Actions → Real-time Updates → User Experience
```

Sistem ini memastikan pemisahan yang jelas antara user biasa dan admin, dengan alur yang intuitif untuk setiap jenis pengguna.

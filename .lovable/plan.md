

# 📱 Aplikasi E-Commerce Mobile (Capacitor)

Aplikasi e-commerce lengkap dengan desain modern & clean, siap untuk dipublish ke App Store & Play Store via Capacitor. Semua halaman akan dibangun dengan tampilan mobile-first dan terkoneksi ke API Anda.

---

## 🔧 Setup & Fondasi
- **Capacitor Setup** — Konfigurasi Capacitor untuk build native iOS & Android
- **Desain Sistem** — Tema modern & clean dengan warna netral, tipografi bersih, dan komponen mobile-friendly
- **Bottom Navigation** — Tab bar dengan 5 menu: Home, Inbox, Keranjang, Pesanan, Akun
- **API Service Layer** — Struktur service untuk integrasi dengan API eksternal Anda (dengan data contoh sebagai fallback)
- **Routing** — Navigasi antar halaman dengan animasi transisi mobile-like

---

## 🔐 Modul Auth (Tanpa Bottom Tab)

### Halaman Login
- Form email/username & password
- Toggle "Remember Me"
- Tombol Login
- Link ke Register & Lupa Password

### Halaman Register
- Form: Nama, Email/HP, Password, Konfirmasi Password
- Validasi input real-time
- Tombol Submit

### Konfirmasi Akun (OTP)
- Input kode OTP (6 digit)
- Timer countdown untuk Resend
- Tombol kirim ulang kode

### Reset Password
- Step 1: Input email
- Step 2: Input OTP
- Step 3: Password baru + konfirmasi
- Tombol Simpan

---

## 🏠 Tab Home

### Halaman Utama
- **Search Bar** — Tap untuk buka Search Page
- **Shortcut Kategori** — Grid ikon kategori produk
- **Banner/Promo** — Carousel banner promosi
- **Flash Sale** — Section countdown + produk diskon
- **Produk Populer** — Scroll horizontal produk terlaris
- **Produk Terbaru** — Grid produk baru
- **Rekomendasi** — Infinite scroll produk rekomendasi

### Search Page
- Input keyword dengan autocomplete
- Filter lengkap: Kategori, Harga (min-max), Stok, Gudang, Brand, Rating, Sorting
- Hasil pencarian dalam format grid/list

### Detail Produk
- Slider foto produk (swipe)
- Info: Nama, Harga, Stok
- Tab: Deskripsi, Spesifikasi, Ulasan
- Pilih Qty dengan counter
- Tombol: Tambah ke Keranjang, Beli Sekarang, Wishlist

---

## 💬 Tab Inbox

### Notifikasi Sistem
- List notifikasi dengan kategori: Status pesanan, Pembayaran, Promo, Info akun
- Badge unread count

### Chat
- List percakapan dengan CS/Admin
- Chat interface: kirim teks & gambar
- Riwayat chat tersimpan

### Ticket Bantuan
- Form buat tiket baru (pilih kategori masalah, deskripsi, upload bukti)
- List tiket dengan status tracking

---

## 🛒 Tab Keranjang

### Halaman Keranjang
- List item dengan foto, nama, harga, qty
- Edit qty & hapus item
- Input catatan per barang
- Input voucher/kode diskon

### Flow Checkout
- Pilih/tambah alamat pengiriman
- Pilih kurir & metode pengiriman
- Pilih metode pembayaran
- Ringkasan total (subtotal, ongkir, diskon, total)
- Tombol Checkout → Buat Order

---

## 📦 Tab Pesanan

### List Pesanan
- Tab filter status: Semua, Menunggu Bayar, Diproses, Dikirim, Selesai, Batal
- Scrollable horizontal tabs
- Card pesanan dengan preview barang & status

### Detail Pesanan
- List barang dalam pesanan
- Breakdown harga & total
- Info alamat & kurir
- Timeline status pesanan (visual)
- Tracking resi
- Aksi: Download invoice, Komplain/Retur, Pesan ulang

---

## 👤 Tab Akun

### Profil & Settings
- **Profil Saya** — Foto, nama, info akun
- **Edit Data Diri** — Form edit profil
- **Kelola Alamat** — CRUD alamat pengiriman
- **Wishlist/Favorit** — List produk favorit
- **Riwayat Transaksi** — Ringkasan semua transaksi
- **Pengaturan Notifikasi** — Toggle notifikasi per kategori
- **Ganti Password** — Form ganti password
- **Bantuan/FAQ** — Accordion FAQ
- **Tentang Aplikasi** — Info versi & developer
- **Logout** — Konfirmasi & logout

---

## 📝 Catatan Implementasi
- Semua halaman menggunakan **data contoh (mock data)** yang bisa langsung diganti dengan API Anda
- Service layer terstruktur rapi sehingga mudah menghubungkan ke endpoint API Anda
- Desain **mobile-first** dengan feel native (gestures, transitions, bottom sheet)
- Setelah build, Anda perlu setup Capacitor di lokal untuk deploy ke device/emulator


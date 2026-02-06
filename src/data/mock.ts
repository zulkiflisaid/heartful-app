import type { Product, Category, Banner, Order, Notification, ChatConversation, ChatMessage, Ticket, Address, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Budi Santoso',
  email: 'budi@email.com',
  phone: '081234567890',
  avatar: '',
};

export const mockCategories: Category[] = [
  { id: '1', name: 'Elektronik', icon: 'Smartphone' },
  { id: '2', name: 'Fashion', icon: 'Shirt' },
  { id: '3', name: 'Makanan', icon: 'UtensilsCrossed' },
  { id: '4', name: 'Kesehatan', icon: 'Heart' },
  { id: '5', name: 'Rumah', icon: 'Home' },
  { id: '6', name: 'Olahraga', icon: 'Dumbbell' },
  { id: '7', name: 'Otomotif', icon: 'Car' },
  { id: '8', name: 'Buku', icon: 'BookOpen' },
];

export const mockBanners: Banner[] = [
  { id: '1', image: '', title: 'Flash Sale Akhir Tahun', subtitle: 'Diskon hingga 70%' },
  { id: '2', image: '', title: 'Gratis Ongkir', subtitle: 'Min. belanja 50rb' },
  { id: '3', image: '', title: 'Produk Baru', subtitle: 'Koleksi terbaru' },
];

const generateProduct = (id: string, name: string, price: number, category: string, brand: string): Product => ({
  id,
  name,
  price,
  originalPrice: Math.round(price * 1.3),
  discount: 30,
  images: [`https://picsum.photos/seed/${id}/400/400`, `https://picsum.photos/seed/${id}a/400/400`, `https://picsum.photos/seed/${id}b/400/400`],
  category,
  brand,
  stock: Math.floor(Math.random() * 100) + 1,
  rating: +(Math.random() * 2 + 3).toFixed(1),
  reviewCount: Math.floor(Math.random() * 500),
  description: `${name} berkualitas tinggi dari ${brand}. Produk terbaik di kelasnya dengan material premium dan desain modern. Cocok untuk kebutuhan sehari-hari Anda.`,
  specifications: { 'Brand': brand, 'Kategori': category, 'Berat': '500g', 'Kondisi': 'Baru' },
  warehouse: 'Jakarta',
  sold: Math.floor(Math.random() * 1000),
});

export const mockProducts: Product[] = [
  generateProduct('1', 'Headphone Bluetooth Premium', 299000, 'Elektronik', 'SoundMax'),
  generateProduct('2', 'Kaos Polos Cotton Combed', 89000, 'Fashion', 'BasicWear'),
  generateProduct('3', 'Vitamin C 1000mg', 125000, 'Kesehatan', 'NutriLife'),
  generateProduct('4', 'Sepatu Running Sport', 450000, 'Olahraga', 'SpeedRun'),
  generateProduct('5', 'Lampu LED Smart WiFi', 175000, 'Rumah', 'BrightHome'),
  generateProduct('6', 'Tas Ransel Laptop 15"', 350000, 'Fashion', 'UrbanBag'),
  generateProduct('7', 'Mouse Wireless Ergonomic', 199000, 'Elektronik', 'TechGear'),
  generateProduct('8', 'Minyak Goreng 2L', 35000, 'Makanan', 'GoldenOil'),
  generateProduct('9', 'Buku Programming React', 120000, 'Buku', 'TechPress'),
  generateProduct('10', 'Helm Half Face', 280000, 'Otomotif', 'SafeRide'),
  generateProduct('11', 'Earbuds TWS ANC', 599000, 'Elektronik', 'SoundMax'),
  generateProduct('12', 'Jaket Hoodie Fleece', 195000, 'Fashion', 'UrbanBag'),
];

export const mockAddresses: Address[] = [
  {
    id: '1', label: 'Rumah', recipientName: 'Budi Santoso', phone: '081234567890',
    street: 'Jl. Merdeka No. 123, RT 01/RW 02', city: 'Jakarta Selatan',
    province: 'DKI Jakarta', postalCode: '12345', isDefault: true,
  },
  {
    id: '2', label: 'Kantor', recipientName: 'Budi Santoso', phone: '081234567890',
    street: 'Jl. Sudirman No. 456, Gedung A Lt. 5', city: 'Jakarta Pusat',
    province: 'DKI Jakarta', postalCode: '10210', isDefault: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001', items: [{ product: mockProducts[0], quantity: 1, price: 299000 }, { product: mockProducts[6], quantity: 2, price: 199000 }],
    status: 'shipped', totalPrice: 697000, shippingCost: 15000, discount: 30000,
    address: mockAddresses[0], courier: 'JNE Regular', trackingNumber: 'JNE1234567890',
    paymentMethod: 'Transfer Bank', createdAt: '2026-02-01T10:00:00Z', updatedAt: '2026-02-03T14:00:00Z',
    timeline: [
      { status: 'Pesanan Dibuat', date: '2026-02-01T10:00:00Z', description: 'Pesanan berhasil dibuat' },
      { status: 'Pembayaran Dikonfirmasi', date: '2026-02-01T12:00:00Z', description: 'Pembayaran telah diterima' },
      { status: 'Diproses', date: '2026-02-02T09:00:00Z', description: 'Pesanan sedang diproses' },
      { status: 'Dikirim', date: '2026-02-03T14:00:00Z', description: 'Pesanan telah dikirim via JNE' },
    ],
  },
  {
    id: 'ORD-002', items: [{ product: mockProducts[1], quantity: 3, price: 89000 }],
    status: 'pending', totalPrice: 267000, shippingCost: 10000, discount: 0,
    address: mockAddresses[0], courier: 'SiCepat', paymentMethod: 'E-Wallet',
    createdAt: '2026-02-05T08:00:00Z', updatedAt: '2026-02-05T08:00:00Z',
    timeline: [{ status: 'Pesanan Dibuat', date: '2026-02-05T08:00:00Z', description: 'Menunggu pembayaran' }],
  },
  {
    id: 'ORD-003', items: [{ product: mockProducts[3], quantity: 1, price: 450000 }],
    status: 'delivered', totalPrice: 450000, shippingCost: 20000, discount: 50000,
    address: mockAddresses[1], courier: 'J&T Express', trackingNumber: 'JT9876543210',
    paymentMethod: 'COD', createdAt: '2026-01-20T15:00:00Z', updatedAt: '2026-01-25T10:00:00Z',
    timeline: [
      { status: 'Pesanan Dibuat', date: '2026-01-20T15:00:00Z', description: 'Pesanan berhasil dibuat' },
      { status: 'Diproses', date: '2026-01-21T09:00:00Z', description: 'Sedang dikemas' },
      { status: 'Dikirim', date: '2026-01-22T11:00:00Z', description: 'Dalam pengiriman' },
      { status: 'Selesai', date: '2026-01-25T10:00:00Z', description: 'Pesanan telah diterima' },
    ],
  },
];

export const mockNotifications: Notification[] = [
  { id: '1', type: 'order', title: 'Pesanan Dikirim', message: 'Pesanan ORD-001 telah dikirim via JNE', read: false, createdAt: '2026-02-03T14:00:00Z' },
  { id: '2', type: 'payment', title: 'Pembayaran Berhasil', message: 'Pembayaran untuk ORD-002 telah dikonfirmasi', read: false, createdAt: '2026-02-05T08:05:00Z' },
  { id: '3', type: 'promo', title: 'Flash Sale!', message: 'Diskon hingga 70% hanya hari ini!', read: true, createdAt: '2026-02-04T07:00:00Z' },
  { id: '4', type: 'account', title: 'Selamat Datang!', message: 'Akun Anda berhasil dibuat', read: true, createdAt: '2026-01-15T10:00:00Z' },
];

export const mockChatConversations: ChatConversation[] = [
  { id: '1', adminName: 'CS Toko', adminAvatar: '', lastMessage: 'Baik, kami akan proses segera', lastTimestamp: '2026-02-05T10:00:00Z', unreadCount: 1 },
  { id: '2', adminName: 'Admin Support', adminAvatar: '', lastMessage: 'Terima kasih atas laporannya', lastTimestamp: '2026-02-04T16:00:00Z', unreadCount: 0 },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', sender: 'user', message: 'Halo, saya mau tanya tentang pesanan saya', timestamp: '2026-02-05T09:50:00Z' },
  { id: '2', sender: 'admin', message: 'Halo! Silakan, ada yang bisa kami bantu?', timestamp: '2026-02-05T09:52:00Z' },
  { id: '3', sender: 'user', message: 'Pesanan ORD-001 sudah sampai mana ya?', timestamp: '2026-02-05T09:55:00Z' },
  { id: '4', sender: 'admin', message: 'Baik, kami akan proses segera', timestamp: '2026-02-05T10:00:00Z' },
];

export const mockTickets: Ticket[] = [
  { id: 'TK-001', category: 'Pengiriman', subject: 'Paket belum sampai', description: 'Pesanan ORD-003 sudah 5 hari belum sampai', status: 'in_progress', createdAt: '2026-02-03T10:00:00Z', updatedAt: '2026-02-04T14:00:00Z' },
  { id: 'TK-002', category: 'Produk', subject: 'Barang rusak', description: 'Barang yang diterima dalam kondisi rusak', status: 'resolved', createdAt: '2026-01-28T08:00:00Z', updatedAt: '2026-01-30T16:00:00Z' },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// ============ Product Types ============
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  description: string;
  specifications: Record<string, string>;
  warehouse: string;
  sold: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

// ============ Cart Types ============
export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

// ============ Order Types ============
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  shippingCost: number;
  discount: number;
  address: Address;
  courier: string;
  trackingNumber?: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimeline[];
}

export interface OrderTimeline {
  status: string;
  date: string;
  description: string;
}

// ============ User Types ============
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

// ============ Inbox Types ============
export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'promo' | 'account';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  message: string;
  image?: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  adminName: string;
  adminAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface Ticket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// ============ Filter Types ============
export interface ProductFilter {
  keyword?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  warehouse?: string;
  brand?: string;
  minRating?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating';
}

/**
 * API Service Layer
 * 
 * Semua fungsi di bawah ini menggunakan mock data sebagai fallback.
 * Ganti BASE_URL dengan URL API Anda dan uncomment fetch calls
 * untuk menghubungkan ke backend.
 */

import type { Product, Category, Banner, Order, Notification, ChatConversation, ChatMessage, Ticket, Address, User, ProductFilter, CartItem } from '@/types';
import { mockProducts, mockCategories, mockBanners, mockOrders, mockNotifications, mockChatConversations, mockChatMessages, mockTickets, mockAddresses, mockUser } from '@/data/mock';

// const BASE_URL = 'https://your-api.com/api';

// ============ Auth ============
export const authApi = {
  login: async (_email: string, _password: string): Promise<{ token: string; user: User }> => {
    // const res = await fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) });
    return { token: 'mock-token', user: mockUser };
  },
  register: async (_data: { name: string; email: string; password: string }): Promise<{ success: boolean }> => {
    return { success: true };
  },
  verifyOtp: async (_code: string): Promise<{ success: boolean }> => {
    return { success: true };
  },
  resetPassword: async (_email: string): Promise<{ success: boolean }> => {
    return { success: true };
  },
  changePassword: async (_oldPass: string, _newPass: string): Promise<{ success: boolean }> => {
    return { success: true };
  },
};

// ============ Products ============
export const productApi = {
  getAll: async (_filter?: ProductFilter): Promise<Product[]> => {
    return mockProducts;
  },
  getById: async (id: string): Promise<Product | undefined> => {
    return mockProducts.find(p => p.id === id);
  },
  getByCategory: async (category: string): Promise<Product[]> => {
    return mockProducts.filter(p => p.category === category);
  },
  getPopular: async (): Promise<Product[]> => {
    return [...mockProducts].sort((a, b) => b.sold - a.sold).slice(0, 6);
  },
  getFlashSale: async (): Promise<Product[]> => {
    return mockProducts.filter(p => p.discount && p.discount > 0).slice(0, 6);
  },
  getCategories: async (): Promise<Category[]> => {
    return mockCategories;
  },
  getBanners: async (): Promise<Banner[]> => {
    return mockBanners;
  },
  search: async (keyword: string): Promise<Product[]> => {
    return mockProducts.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
  },
};

// ============ Orders ============
export const orderApi = {
  getAll: async (_status?: string): Promise<Order[]> => {
    return mockOrders;
  },
  getById: async (id: string): Promise<Order | undefined> => {
    return mockOrders.find(o => o.id === id);
  },
  create: async (_items: CartItem[], _addressId: string, _courier: string, _payment: string): Promise<{ orderId: string }> => {
    return { orderId: 'ORD-NEW' };
  },
};

// ============ Inbox ============
export const inboxApi = {
  getNotifications: async (): Promise<Notification[]> => {
    return mockNotifications;
  },
  getConversations: async (): Promise<ChatConversation[]> => {
    return mockChatConversations;
  },
  getMessages: async (_conversationId: string): Promise<ChatMessage[]> => {
    return mockChatMessages;
  },
  sendMessage: async (_conversationId: string, _message: string): Promise<ChatMessage> => {
    return { id: Date.now().toString(), sender: 'user', message: _message, timestamp: new Date().toISOString() };
  },
  getTickets: async (): Promise<Ticket[]> => {
    return mockTickets;
  },
  createTicket: async (_data: { category: string; subject: string; description: string }): Promise<Ticket> => {
    return { id: 'TK-NEW', ..._data, status: 'open', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  },
};

// ============ User ============
export const userApi = {
  getProfile: async (): Promise<User> => {
    return mockUser;
  },
  updateProfile: async (_data: Partial<User>): Promise<User> => {
    return { ...mockUser, ..._data };
  },
  getAddresses: async (): Promise<Address[]> => {
    return mockAddresses;
  },
  addAddress: async (_data: Omit<Address, 'id'>): Promise<Address> => {
    return { id: Date.now().toString(), ..._data };
  },
  updateAddress: async (_id: string, _data: Partial<Address>): Promise<Address> => {
    const addr = mockAddresses.find(a => a.id === _id);
    return { ...addr!, ..._data };
  },
  deleteAddress: async (_id: string): Promise<{ success: boolean }> => {
    return { success: true };
  },
};

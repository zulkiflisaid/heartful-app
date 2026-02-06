import { useNavigate } from 'react-router-dom';
import { User, MapPin, Heart, Receipt, Bell, Lock, HelpCircle, Info, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const menuItems = [
  { icon: User, label: 'Edit Data Diri', path: '/account/edit-profile' },
  { icon: MapPin, label: 'Kelola Alamat', path: '/account/addresses' },
  { icon: Heart, label: 'Wishlist / Favorit', path: '/account/wishlist' },
  { icon: Receipt, label: 'Riwayat Transaksi', path: '/orders' },
  { icon: Bell, label: 'Pengaturan Notifikasi', path: '/account/notification-settings' },
  { icon: Lock, label: 'Ganti Password', path: '/account/change-password' },
  { icon: HelpCircle, label: 'Bantuan / FAQ', path: '/account/faq' },
  { icon: Info, label: 'Tentang Aplikasi', path: '/account/about' },
];

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Berhasil logout');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 bg-card px-4 py-4 safe-top">
        <h1 className="text-xl font-bold">Akun</h1>
      </div>

      {/* Profile Card */}
      <div className="mx-4 mt-2 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20 text-xl font-bold text-primary-foreground">
          {user?.name?.[0] || 'U'}
        </div>
        <div className="flex-1 text-primary-foreground">
          <p className="text-lg font-bold">{user?.name || 'User'}</p>
          <p className="text-sm opacity-80">{user?.email || 'email@contoh.com'}</p>
        </div>
        <button onClick={() => navigate('/account/edit-profile')} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
          <Settings className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 overflow-hidden rounded-xl border border-border">
        {menuItems.map((item, i) => (
          <div key={item.path} onClick={() => navigate(item.path)} className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 hover:bg-secondary ${i < menuItems.length - 1 ? 'border-b border-border' : ''}`}>
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4 mb-8">
        <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive py-3 text-sm font-semibold text-destructive hover:bg-destructive/5">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;

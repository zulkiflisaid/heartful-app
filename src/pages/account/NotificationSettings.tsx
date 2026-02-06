import { useState } from 'react';
import { Bell, Package, CreditCard, Tag, UserCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import PageHeader from '@/components/PageHeader';
import { toast } from 'sonner';

const notifications = [
  { key: 'order', icon: Package, label: 'Status Pesanan', desc: 'Update pengiriman & konfirmasi pesanan' },
  { key: 'payment', icon: CreditCard, label: 'Pembayaran', desc: 'Konfirmasi & reminder pembayaran' },
  { key: 'promo', icon: Tag, label: 'Promo & Diskon', desc: 'Info flash sale & voucher terbaru' },
  { key: 'account', icon: UserCheck, label: 'Info Akun', desc: 'Keamanan & perubahan akun' },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({ order: true, payment: true, promo: true, account: true });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Pengaturan disimpan');
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Pengaturan Notifikasi" />
      <div className="p-4">
        <div className="space-y-1 overflow-hidden rounded-xl border border-border">
          {notifications.map((n, i) => (
            <div key={n.key} className={`flex items-center gap-3 px-4 py-3.5 ${i < notifications.length - 1 ? 'border-b border-border' : ''}`}>
              <n.icon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch checked={settings[n.key]} onCheckedChange={() => toggleSetting(n.key)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOrders, formatPrice, formatDate } from '@/data/mock';
import type { OrderStatus } from '@/types';
import { Badge } from '@/components/ui/badge';

const statusTabs: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Menunggu Bayar' },
  { key: 'processing', label: 'Diproses' },
  { key: 'shipped', label: 'Dikirim' },
  { key: 'delivered', label: 'Selesai' },
  { key: 'cancelled', label: 'Batal' },
];

const statusColor: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-blue-50 text-blue-600',
  shipped: 'bg-purple-50 text-purple-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-destructive/10 text-destructive',
};

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Menunggu Bayar',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Selesai',
  cancelled: 'Dibatalkan',
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');

  const filtered = activeTab === 'all' ? mockOrders : mockOrders.filter(o => o.status === activeTab);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 bg-card px-4 py-4 safe-top">
        <h1 className="text-xl font-bold">Pesanan</h1>
      </div>

      {/* Status Tabs */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border px-4">
        {statusTabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-3 p-4">
        {filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-muted-foreground">Belum ada pesanan</div>
        )}
        {filtered.map(order => (
          <div key={order.id} onClick={() => navigate(`/orders/${order.id}`)} className="cursor-pointer rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{order.id}</span>
              <Badge className={`${statusColor[order.status]} border-0 text-[10px]`}>{statusLabel[order.status]}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <img src={order.items[0].product.images[0]} alt="" className="h-14 w-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1">{order.items[0].product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.items.length > 1 ? `+${order.items.length - 1} produk lainnya` : `${order.items[0].quantity}x`}
                </p>
              </div>
              <p className="text-sm font-bold">{formatPrice(order.totalPrice)}</p>
            </div>
            <p className="mt-2 text-right text-[11px] text-muted-foreground">{formatDate(order.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

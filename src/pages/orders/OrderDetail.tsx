import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Truck, CreditCard, Download, RotateCcw, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrders, formatPrice, formatDate } from '@/data/mock';
import PageHeader from '@/components/PageHeader';
import { toast } from 'sonner';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === id);

  if (!order) return <div className="flex min-h-screen items-center justify-center">Pesanan tidak ditemukan</div>;

  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="Detail Pesanan" />

      {/* Timeline */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-4">
        <p className="mb-3 text-sm font-semibold">Status Pesanan</p>
        <div className="space-y-0">
          {order.timeline.map((t, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${i === order.timeline.length - 1 ? 'text-primary' : 'text-muted-foreground'}`} />
                {i < order.timeline.length - 1 && <div className="h-8 w-0.5 bg-border" />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium">{t.status}</p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
                <p className="text-[11px] text-muted-foreground">{formatDate(t.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <p className="mb-2 text-sm font-semibold">Daftar Barang</p>
        {order.items.map(item => (
          <div key={item.product.id} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
            <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="text-sm line-clamp-1">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">{item.quantity}x {formatPrice(item.price)}</p>
            </div>
            <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Address & Courier */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">{order.address.recipientName}</p>
            <p className="text-xs text-muted-foreground">{order.address.street}, {order.address.city}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Truck className="h-4 w-4 text-primary" />
          <span className="text-sm">{order.courier}</span>
          {order.trackingNumber && <span className="ml-auto text-xs font-medium text-primary">{order.trackingNumber}</span>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          <span className="text-sm">{order.paymentMethod}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <p className="mb-2 text-sm font-semibold">Ringkasan</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.totalPrice)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Ongkir</span><span>{formatPrice(order.shippingCost)}</span></div>
          {order.discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Diskon</span><span className="text-success">-{formatPrice(order.discount)}</span></div>}
          <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Total</span><span className="text-primary">{formatPrice(order.totalPrice + order.shippingCost - order.discount)}</span></div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
        <div className="mx-auto flex max-w-lg gap-2 px-4 py-3">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => toast.success('Invoice diunduh')}>
            <Download className="mr-1.5 h-4 w-4" /> Invoice
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => toast.info('Fitur komplain akan segera hadir')}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Komplain
          </Button>
          <Button className="flex-1 rounded-xl" onClick={() => { toast.success('Item ditambahkan ke keranjang'); navigate('/cart'); }}>
            <ShoppingCart className="mr-1.5 h-4 w-4" /> Pesan Lagi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

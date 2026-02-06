import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/data/mock';
import PageHeader from '@/components/PageHeader';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, updateNote, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="sticky top-0 z-40 bg-card px-4 py-4 safe-top">
          <h1 className="text-xl font-bold">Keranjang</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Tag className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Keranjang kosong</p>
          <Button onClick={() => navigate('/')} className="mt-4 rounded-xl">Mulai Belanja</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-0 z-40 bg-card px-4 py-4 safe-top">
        <h1 className="text-xl font-bold">Keranjang ({totalItems})</h1>
      </div>

      <div className="space-y-3 px-4 py-2">
        {items.map(item => (
          <div key={item.product.id} className="rounded-xl border border-border bg-card p-3">
            <div className="flex gap-3">
              <img src={item.product.images[0]} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-2">{item.product.name}</h3>
                <p className="mt-1 text-sm font-bold text-primary">{formatPrice(item.product.price)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
            <Input value={item.note || ''} onChange={e => updateNote(item.product.id, e.target.value)} placeholder="Catatan (opsional)" className="mt-2 h-8 rounded-lg text-xs" />
          </div>
        ))}
      </div>

      {/* Voucher */}
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border border-border p-3">
        <Tag className="h-4 w-4 text-primary" />
        <Input placeholder="Kode voucher/diskon" className="h-8 flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0" />
        <Button size="sm" variant="outline" className="h-8 rounded-lg text-xs">Pakai</Button>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}</span>
          </div>
          <Button onClick={() => navigate('/checkout')} className="h-12 w-full rounded-xl text-base font-semibold">
            Checkout ({totalItems} item)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

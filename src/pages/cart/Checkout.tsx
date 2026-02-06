import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, mockAddresses } from '@/data/mock';
import PageHeader from '@/components/PageHeader';
import { toast } from 'sonner';

const couriers = ['JNE Regular', 'JNE YES', 'SiCepat Reguler', 'SiCepat BEST', 'J&T Express', 'AnterAja'];
const payments = ['Transfer Bank', 'E-Wallet (GoPay)', 'E-Wallet (OVO)', 'E-Wallet (DANA)', 'COD', 'Kartu Kredit'];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0]);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [showCourierPicker, setShowCourierPicker] = useState(false);
  const [showPaymentPicker, setShowPaymentPicker] = useState(false);

  const shippingCost = selectedCourier ? 15000 : 0;
  const discount = 0;
  const grandTotal = totalPrice + shippingCost - discount;

  const handleCheckout = () => {
    if (!selectedCourier) { toast.error('Pilih kurir pengiriman'); return; }
    if (!selectedPayment) { toast.error('Pilih metode pembayaran'); return; }
    clearCart();
    toast.success('Pesanan berhasil dibuat!');
    navigate('/orders');
  };

  return (
    <div className="min-h-screen pb-32">
      <PageHeader title="Checkout" />

      {/* Address */}
      <div onClick={() => setShowAddressPicker(!showAddressPicker)} className="mx-4 mt-3 cursor-pointer rounded-xl border border-border p-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 text-primary" />
          Alamat Pengiriman
          <ChevronRight className="ml-auto h-4 w-4" />
        </div>
        <div className="mt-2 pl-6">
          <p className="text-sm font-medium">{selectedAddress.recipientName} • {selectedAddress.phone}</p>
          <p className="text-xs text-muted-foreground">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.province} {selectedAddress.postalCode}</p>
        </div>
      </div>

      {showAddressPicker && (
        <div className="mx-4 mt-2 rounded-xl border border-border bg-card p-3">
          {mockAddresses.map(addr => (
            <div key={addr.id} onClick={() => { setSelectedAddress(addr); setShowAddressPicker(false); }} className={`mb-2 flex cursor-pointer items-start gap-2 rounded-lg p-2 ${selectedAddress.id === addr.id ? 'bg-primary/5' : 'hover:bg-secondary'}`}>
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${selectedAddress.id === addr.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-sm font-medium">{addr.label} — {addr.recipientName}</p>
                <p className="text-xs text-muted-foreground">{addr.street}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Items */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <p className="mb-2 text-sm font-semibold">Pesanan ({items.length} item)</p>
        {items.map(item => (
          <div key={item.product.id} className="flex items-center gap-3 py-2">
            <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="text-sm line-clamp-1">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">{item.quantity}x {formatPrice(item.product.price)}</p>
            </div>
            <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Courier */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <div onClick={() => setShowCourierPicker(!showCourierPicker)} className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Truck className="h-4 w-4 text-primary" />
          {selectedCourier || 'Pilih Kurir'}
          <ChevronRight className="ml-auto h-4 w-4" />
        </div>
        {showCourierPicker && (
          <div className="mt-2 space-y-1">
            {couriers.map(c => (
              <div key={c} onClick={() => { setSelectedCourier(c); setShowCourierPicker(false); }} className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${selectedCourier === c ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-secondary'}`}>
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <div onClick={() => setShowPaymentPicker(!showPaymentPicker)} className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <CreditCard className="h-4 w-4 text-primary" />
          {selectedPayment || 'Pilih Pembayaran'}
          <ChevronRight className="ml-auto h-4 w-4" />
        </div>
        {showPaymentPicker && (
          <div className="mt-2 space-y-1">
            {payments.map(p => (
              <div key={p} onClick={() => { setSelectedPayment(p); setShowPaymentPicker(false); }} className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${selectedPayment === p ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-secondary'}`}>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mx-4 mt-3 rounded-xl border border-border p-3">
        <p className="mb-2 text-sm font-semibold">Ringkasan Pembayaran</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Ongkos Kirim</span><span>{formatPrice(shippingCost)}</span></div>
          {discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Diskon</span><span className="text-success">-{formatPrice(discount)}</span></div>}
          <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Total</span><span className="text-primary">{formatPrice(grandTotal)}</span></div>
        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Bayar</p>
            <p className="text-lg font-bold text-primary">{formatPrice(grandTotal)}</p>
          </div>
          <Button onClick={handleCheckout} className="h-12 rounded-xl px-8 text-base font-semibold">Buat Pesanan</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

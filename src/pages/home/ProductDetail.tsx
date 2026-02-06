import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProducts, formatPrice } from '@/data/mock';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'spec' | 'review'>('desc');
  const [wishlisted, setWishlisted] = useState(false);

  const product = mockProducts.find(p => p.id === id);
  if (!product) return <div className="flex min-h-screen items-center justify-center">Produk tidak ditemukan</div>;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success('Ditambahkan ke keranjang!');
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-card/2 px-4 py-3 backdrop-blur-md safe-top">
        <button onClick={() => navigate(-1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80">
            <Share2 className="h-4 w-4" />
          </button>
          <button onClick={() => navigate('/cart')} className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative">
        <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {product.images.map((img, i) => (
            <div key={i} className="min-w-full snap-center">
              <div className="aspect-square bg-secondary">
                <img src={img} alt={product.name} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {product.images.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === currentImage ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`} />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-bold text-destructive">-{product.discount}%</span>
              </div>
            )}
          </div>
          <button onClick={() => { setWishlisted(!wishlisted); toast.success(wishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist'); }} className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
            <Heart className={`h-5 w-5 ${wishlisted ? 'fill-destructive text-destructive' : ''}`} />
          </button>
        </div>

        <h1 className="mt-3 text-lg font-semibold leading-tight">{product.name}</h1>

        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span>{product.rating}</span>
          </div>
          <span>•</span>
          <span>Terjual {product.sold}</span>
          <span>•</span>
          <span>Stok: {product.stock}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border">
        <div className="flex">
          {(['desc', 'spec', 'review'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 border-b-2 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              {tab === 'desc' ? 'Deskripsi' : tab === 'spec' ? 'Spesifikasi' : 'Ulasan'}
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          {activeTab === 'desc' && (
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          )}
          {activeTab === 'spec' && (
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-border py-2 text-sm">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'review' && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <div>
                      <p className="text-sm font-medium">Pembeli {i}</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`h-3 w-3 ${s <= 4 ? 'fill-warning text-warning' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Produk sesuai deskripsi, pengiriman cepat. Sangat recommended!</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          {/* Qty */}
          <div className="flex items-center gap-2 rounded-xl border border-border px-2">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-1.5"><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="p-1.5"><Plus className="h-4 w-4" /></button>
          </div>
          <Button variant="outline" onClick={handleAddToCart} className="h-11 flex-1 rounded-xl font-semibold">
            <ShoppingCart className="mr-1.5 h-4 w-4" /> Keranjang
          </Button>
          <Button onClick={handleBuyNow} className="h-11 flex-1 rounded-xl font-semibold">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

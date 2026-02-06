import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Star, Zap, Smartphone, Shirt, UtensilsCrossed, Heart, Home as HomeIcon, Dumbbell, Car, BookOpen } from 'lucide-react';
import { mockProducts, mockBanners, mockCategories, formatPrice } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="h-5 w-5" />,
  Shirt: <Shirt className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Home: <HomeIcon className="h-5 w-5" />,
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
};

const categoryColors = [
  'bg-blue-50 text-blue-600', 'bg-pink-50 text-pink-600', 'bg-orange-50 text-orange-600', 'bg-red-50 text-red-600',
  'bg-green-50 text-green-600', 'bg-purple-50 text-purple-600', 'bg-cyan-50 text-cyan-600', 'bg-amber-50 text-amber-600',
];

const HomePage = () => {
  const navigate = useNavigate();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [flashSaleCountdown, setFlashSaleCountdown] = useState(3600 * 3);

  const flashSaleProducts = mockProducts.filter(p => p.discount && p.discount > 0).slice(0, 6);
  const popularProducts = [...mockProducts].sort((a, b) => b.sold - a.sold).slice(0, 6);
  const newProducts = mockProducts.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => setBannerIndex(i => (i + 1) % mockBanners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setFlashSaleCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(flashSaleCountdown / 3600);
  const minutes = Math.floor((flashSaleCountdown % 3600) / 60);
  const seconds = flashSaleCountdown % 60;

  return (
    <div className="no-scrollbar min-h-screen">
      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-card px-4 py-3 safe-top">
        <div onClick={() => navigate('/search')} className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-secondary px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cari produk...</span>
        </div>
      </div>

      {/* Banner */}
      <div className="relative mx-4 mt-2 overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${bannerIndex * 100}%)` }}>
          {mockBanners.map(banner => (
            <div key={banner.id} className="min-w-full">
              <div className="flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 px-6">
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground">{banner.title}</h2>
                  <p className="text-sm text-primary-foreground/80">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {mockBanners.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === bannerIndex ? 'w-4 bg-primary-foreground' : 'w-1.5 bg-primary-foreground/40'}`} />
          ))}
        </div>
      </div>

      {/* Kategori */}
      <section className="px-4 py-4">
        <div className="grid grid-cols-4 gap-3">
          {mockCategories.map((cat, i) => (
            <div key={cat.id} onClick={() => navigate(`/search?category=${cat.name}`)} className="flex cursor-pointer flex-col items-center gap-1.5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${categoryColors[i % categoryColors.length]}`}>
                {iconMap[cat.icon]}
              </div>
              <span className="text-[11px] font-medium text-foreground">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="px-4 py-2">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 fill-destructive text-destructive" />
            <span className="text-base font-bold">Flash Sale</span>
            <div className="flex gap-1">
              {[hours, minutes, seconds].map((v, i) => (
                <span key={i} className="rounded-md bg-destructive px-1.5 py-0.5 text-xs font-bold text-destructive-foreground">
                  {String(v).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => navigate('/search?sort=flash_sale')} className="flex items-center text-xs font-medium text-primary">
            Lihat Semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {flashSaleProducts.map(p => (
            <div key={p.id} className="min-w-[140px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Produk Populer */}
      <section className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-warning text-warning" />
            <span className="text-base font-bold">Produk Populer</span>
          </div>
          <button onClick={() => navigate('/search?sort=popular')} className="flex items-center text-xs font-medium text-primary">
            Lihat Semua <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {popularProducts.map(p => (
            <div key={p.id} className="min-w-[140px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Produk Terbaru */}
      <section className="px-4 py-2">
        <h2 className="mb-3 text-base font-bold">Produk Terbaru</h2>
        <div className="grid grid-cols-2 gap-3">
          {newProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="px-4 py-4 pb-8">
        <h2 className="mb-3 text-base font-bold">Rekomendasi Untuk Anda</h2>
        <div className="grid grid-cols-2 gap-3">
          {mockProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

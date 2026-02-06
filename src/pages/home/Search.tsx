import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockProducts, mockCategories } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import type { ProductFilter } from '@/types';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [keyword, setKeyword] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<ProductFilter>({ category: initialCategory, sort: 'newest' });

  const filtered = mockProducts.filter(p => {
    if (keyword && !p.name.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (filter.category && p.category !== filter.category) return false;
    if (filter.priceMin && p.price < filter.priceMin) return false;
    if (filter.priceMax && p.price > filter.priceMax) return false;
    if (filter.inStock && p.stock <= 0) return false;
    if (filter.brand && p.brand !== filter.brand) return false;
    if (filter.minRating && p.rating < filter.minRating) return false;
    return true;
  }).sort((a, b) => {
    if (filter.sort === 'price_asc') return a.price - b.price;
    if (filter.sort === 'price_desc') return b.price - a.price;
    if (filter.sort === 'popular') return b.sold - a.sold;
    if (filter.sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const brands = [...new Set(mockProducts.map(p => p.brand))];
  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'price_asc', label: 'Termurah' },
    { value: 'price_desc', label: 'Termahal' },
    { value: 'popular', label: 'Terpopuler' },
    { value: 'rating', label: 'Rating Tertinggi' },
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Search header */}
      <div className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-card px-4 py-3 safe-top">
        <button onClick={() => navigate(-1)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Cari produk..."
            className="h-10 rounded-xl pl-9 pr-8"
            autoFocus
          />
          {keyword && (
            <button onClick={() => setKeyword('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button onClick={() => setShowFilter(!showFilter)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Filters */}
      {showFilter && (
        <div className="border-b border-border bg-card px-4 py-4 animate-slide-up">
          <div className="mb-3">
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Kategori</span>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <button onClick={() => setFilter(f => ({ ...f, category: '' }))} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${!filter.category ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                Semua
              </button>
              {mockCategories.map(c => (
                <button key={c.id} onClick={() => setFilter(f => ({ ...f, category: c.name }))} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${filter.category === c.name ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Harga</span>
            <div className="flex gap-2">
              <Input type="number" placeholder="Min" value={filter.priceMin || ''} onChange={e => setFilter(f => ({ ...f, priceMin: Number(e.target.value) || undefined }))} className="h-9 rounded-lg text-sm" />
              <Input type="number" placeholder="Max" value={filter.priceMax || ''} onChange={e => setFilter(f => ({ ...f, priceMax: Number(e.target.value) || undefined }))} className="h-9 rounded-lg text-sm" />
            </div>
          </div>

          <div className="mb-3">
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Brand</span>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              <button onClick={() => setFilter(f => ({ ...f, brand: '' }))} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${!filter.brand ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                Semua
              </button>
              {brands.map(b => (
                <button key={b} onClick={() => setFilter(f => ({ ...f, brand: b }))} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${filter.brand === b ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Rating Min.</span>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5].map(r => (
                <button key={r} onClick={() => setFilter(f => ({ ...f, minRating: r || undefined }))} className={`rounded-full px-3 py-1.5 text-xs font-medium ${filter.minRating === r || (!filter.minRating && r === 0) ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {r === 0 ? 'Semua' : `${r}+`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Urutkan</span>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {sortOptions.map(s => (
                <button key={s.value} onClick={() => setFilter(f => ({ ...f, sort: s.value }))} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${filter.sort === s.value ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="p-4">
        <p className="mb-3 text-sm text-muted-foreground">{filtered.length} produk ditemukan</p>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Tidak ada produk ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

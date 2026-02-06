import { mockProducts } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import PageHeader from '@/components/PageHeader';

const Wishlist = () => {
  const wishlistProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      <PageHeader title="Wishlist / Favorit" />
      <div className="grid grid-cols-2 gap-3 p-4">
        {wishlistProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {wishlistProducts.length === 0 && (
        <div className="py-20 text-center text-sm text-muted-foreground">Belum ada produk favorit</div>
      )}
    </div>
  );
};

export default Wishlist;

import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/data/mock';
import type { Product } from '@/types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={cn(
        'cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {product.discount && product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="line-clamp-2 text-[13px] font-medium leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price)}</p>
        {product.originalPrice && (
          <p className="text-[11px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
        )}
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span className="text-[11px] text-muted-foreground">
            {product.rating} | Terjual {product.sold}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

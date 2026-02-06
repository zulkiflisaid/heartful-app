import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageSquare, ShoppingCart, Package, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { path: '/cart', icon: ShoppingCart, label: 'Keranjang' },
  { path: '/orders', icon: Package, label: 'Pesanan' },
  { path: '/account', icon: User, label: 'Akun' },
];

const BottomNav = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map(tab => {
          const isActive = tab.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          const showBadge = tab.path === '/cart' && totalItems > 0;

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.8} />
                {showBadge && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

const MainLayout = () => {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/cart') || location.pathname.startsWith('/checkout');
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      <main className={hideBottomNav ? '' : 'pb-16'}>
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default MainLayout;

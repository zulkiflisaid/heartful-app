import { Outlet } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

const MainLayout = () => {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;

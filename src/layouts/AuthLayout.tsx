import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Mohon isi semua field'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login berhasil!');
      navigate('/');
    } catch {
      toast.error('Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <ShoppingBag className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Selamat Datang</h1>
        <p className="mt-1 text-sm text-muted-foreground">Masuk ke akun Anda untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email / Username</Label>
          <Input id="email" type="text" placeholder="email@contoh.com" value={email} onChange={e => setEmail(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 rounded-xl pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={remember} onCheckedChange={(c) => setRemember(c as boolean)} />
            <Label htmlFor="remember" className="text-sm font-normal">Ingat saya</Label>
          </div>
          <Link to="/auth/reset-password" className="text-sm font-medium text-primary">Lupa Password?</Link>
        </div>

        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold" disabled={loading}>
          {loading ? 'Masuk...' : 'Masuk'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Belum punya akun?{' '}
        <Link to="/auth/register" className="font-semibold text-primary">Daftar Sekarang</Link>
      </p>
    </div>
  );
};

export default Login;

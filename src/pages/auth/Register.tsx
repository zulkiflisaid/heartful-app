import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const errors: Record<string, string> = {};
  if (name && name.length < 3) errors.name = 'Nama minimal 3 karakter';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Format email tidak valid';
  if (password && password.length < 6) errors.password = 'Password minimal 6 karakter';
  if (confirmPassword && password !== confirmPassword) errors.confirmPassword = 'Password tidak cocok';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Mohon isi semua field'); return; }
    if (Object.keys(errors).length > 0) { toast.error('Mohon perbaiki kesalahan input'); return; }
    setLoading(true);
    try {
      // await authApi.register({ name, email, password });
      toast.success('Registrasi berhasil!');
      navigate('/auth/otp');
    } catch {
      toast.error('Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
        <ArrowLeft className="h-5 w-5" />
      </button>

      <h1 className="mb-1 text-2xl font-bold">Buat Akun Baru</h1>
      <p className="mb-6 text-sm text-muted-foreground">Daftar untuk mulai berbelanja</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nama lengkap" className="h-12 rounded-xl" />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label>Email / No. HP</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com" className="h-12 rounded-xl" />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 karakter" className="h-12 rounded-xl pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label>Konfirmasi Password</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Ulangi password" className="h-12 rounded-xl" />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold" disabled={loading}>
          {loading ? 'Mendaftar...' : 'Daftar'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Sudah punya akun? <Link to="/auth/login" className="font-semibold text-primary">Masuk</Link>
      </p>
    </div>
  );
};

export default Register;

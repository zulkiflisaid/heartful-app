import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStep1 = async () => {
    if (!email) { toast.error('Masukkan email'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Kode OTP telah dikirim ke email');
      setStep(2);
      setLoading(false);
    }, 500);
  };

  const handleStep2 = () => {
    if (otp.length !== 6) { toast.error('Masukkan kode 6 digit'); return; }
    setStep(3);
  };

  const handleStep3 = async () => {
    if (newPassword.length < 6) { toast.error('Password minimal 6 karakter'); return; }
    if (newPassword !== confirmPassword) { toast.error('Password tidak cocok'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Password berhasil direset!');
      navigate('/auth/login');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
        <ArrowLeft className="h-5 w-5" />
      </button>

      <h1 className="mb-1 text-2xl font-bold">Reset Password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {step === 1 && 'Masukkan email untuk menerima kode verifikasi'}
        {step === 2 && 'Masukkan kode OTP yang dikirim ke email Anda'}
        {step === 3 && 'Buat password baru untuk akun Anda'}
      </p>

      {/* Step indicators */}
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-border'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com" className="h-12 rounded-xl" />
          </div>
          <Button onClick={handleStep1} className="h-12 w-full rounded-xl text-base font-semibold" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Kode'}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Kode OTP</Label>
            <Input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6 digit kode" className="h-12 rounded-xl text-center text-lg tracking-widest" inputMode="numeric" />
          </div>
          <Button onClick={handleStep2} className="h-12 w-full rounded-xl text-base font-semibold">Verifikasi</Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Password Baru</Label>
            <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 karakter" className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Konfirmasi Password</Label>
            <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Ulangi password" className="h-12 rounded-xl" />
          </div>
          <Button onClick={handleStep3} className="h-12 w-full rounded-xl text-base font-semibold" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Password'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length !== 6) { toast.error('Masukkan kode 6 digit'); return; }
    setLoading(true);
    try {
      toast.success('Verifikasi berhasil!');
      navigate('/auth/login');
    } catch {
      toast.error('Kode tidak valid');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    toast.success('Kode OTP telah dikirim ulang');
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
        <ArrowLeft className="h-5 w-5" />
      </button>

      <h1 className="mb-1 text-2xl font-bold">Verifikasi Akun</h1>
      <p className="mb-8 text-sm text-muted-foreground">Masukkan kode 6 digit yang dikirim ke email Anda</p>

      <div className="mb-6 flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            className="h-14 w-12 rounded-xl border border-input bg-background text-center text-xl font-bold outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        ))}
      </div>

      <Button onClick={handleSubmit} className="h-12 w-full rounded-xl text-base font-semibold" disabled={loading}>
        {loading ? 'Memverifikasi...' : 'Verifikasi'}
      </Button>

      <div className="mt-6 text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">Kirim ulang dalam <span className="font-semibold text-primary">{countdown}s</span></p>
        ) : (
          <button onClick={handleResend} className="text-sm font-semibold text-primary">Kirim Ulang Kode</button>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;

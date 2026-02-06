import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/PageHeader';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) { toast.error('Mohon isi semua field'); return; }
    if (newPassword.length < 6) { toast.error('Password baru minimal 6 karakter'); return; }
    if (newPassword !== confirmPassword) { toast.error('Konfirmasi password tidak cocok'); return; }
    toast.success('Password berhasil diubah');
    setOldPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Ganti Password" />
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Label>Password Lama</Label>
          <Input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Masukkan password lama" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Password Baru</Label>
          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 karakter" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Konfirmasi Password Baru</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Ulangi password baru" className="h-12 rounded-xl" />
        </div>
        <Button onClick={handleSave} className="h-12 w-full rounded-xl text-base font-semibold">Simpan</Button>
      </div>
    </div>
  );
};

export default ChangePassword;

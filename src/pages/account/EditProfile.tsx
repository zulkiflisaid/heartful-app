import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/PageHeader';
import { mockUser } from '@/data/mock';
import { toast } from 'sonner';

const EditProfile = () => {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);

  const handleSave = () => {
    toast.success('Profil berhasil diperbarui');
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Edit Data Diri" />
      <div className="space-y-4 p-4">
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {name[0]}
          </div>
          <button className="mt-2 text-sm font-medium text-primary">Ubah Foto</button>
        </div>
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>
          <Input value={name} onChange={e => setName(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>No. HP</Label>
          <Input value={phone} onChange={e => setPhone(e.target.value)} className="h-12 rounded-xl" />
        </div>
        <Button onClick={handleSave} className="h-12 w-full rounded-xl text-base font-semibold">Simpan</Button>
      </div>
    </div>
  );
};

export default EditProfile;

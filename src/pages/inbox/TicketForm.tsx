import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/PageHeader';
import { toast } from 'sonner';

const categories = ['Pengiriman', 'Produk', 'Pembayaran', 'Akun', 'Lainnya'];

const TicketForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subject || !description) { toast.error('Mohon isi semua field'); return; }
    toast.success('Tiket berhasil dibuat');
    navigate('/inbox');
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Buat Tiket Baru" />
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="space-y-2">
          <Label>Kategori Masalah</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${category === c ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Subjek</Label>
          <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Judul masalah" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Deskripsi</Label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Jelaskan masalah Anda..." className="min-h-[120px] rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Upload Bukti (Opsional)</Label>
          <div className="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground">
            Tap untuk upload gambar
          </div>
        </div>
        <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold">Kirim Tiket</Button>
      </form>
    </div>
  );
};

export default TicketForm;

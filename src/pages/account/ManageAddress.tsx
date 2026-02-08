import { useState } from 'react';
import { Plus, MapPin, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/PageHeader';
import { mockAddresses } from '@/data/mock';
import type { Address } from '@/types';
import { toast } from 'sonner';

const ManageAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: '',
    recipientName: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const fields: Array<{ key: keyof typeof form; label: string; placeholder: string }> = [
    { key: 'label', label: 'Label (Rumah/Kantor)', placeholder: 'Rumah' },
    { key: 'recipientName', label: 'Nama Penerima', placeholder: 'Nama lengkap' },
    { key: 'phone', label: 'No. HP', placeholder: '08xxx' },
    { key: 'street', label: 'Alamat Lengkap', placeholder: 'Jl. ...' },
    { key: 'city', label: 'Kota', placeholder: 'Jakarta' },
    { key: 'province', label: 'Provinsi', placeholder: 'DKI Jakarta' },
    { key: 'postalCode', label: 'Kode Pos', placeholder: '12345' },
  ];

  const handleSave = () => {
    if (!form.label || !form.recipientName || !form.street) { toast.error('Mohon isi field yang wajib'); return; }
    if (editId) {
      setAddresses(prev => prev.map(a => a.id === editId ? { ...a, ...form } : a));
      toast.success('Alamat diperbarui');
    } else {
      setAddresses(prev => [...prev, { id: Date.now().toString(), ...form, isDefault: false }]);
      toast.success('Alamat ditambahkan');
    }
    setShowForm(false);
    setEditId(null);
    setForm({ label: '', recipientName: '', phone: '', street: '', city: '', province: '', postalCode: '' });
  };

  const handleEdit = (addr: Address) => {
    setForm({ label: addr.label, recipientName: addr.recipientName, phone: addr.phone, street: addr.street, city: addr.city, province: addr.province, postalCode: addr.postalCode });
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast.success('Alamat dihapus');
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Kelola Alamat" />
      <div className="p-4">
        {!showForm && (
          <>
            <Button onClick={() => setShowForm(true)} variant="outline" className="mb-4 w-full rounded-xl border-dashed">
              <Plus className="mr-2 h-4 w-4" /> Tambah Alamat
            </Button>
            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{addr.label}</span>
                    {addr.isDefault && <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Utama</span>}
                    <div className="ml-auto flex gap-2">
                      <button onClick={() => handleEdit(addr)}><Edit2 className="h-4 w-4 text-muted-foreground" /></button>
                      <button onClick={() => handleDelete(addr.id)}><Trash2 className="h-4 w-4 text-destructive" /></button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium">{addr.recipientName} • {addr.phone}</p>
                  <p className="text-xs text-muted-foreground">{addr.street}, {addr.city}, {addr.province} {addr.postalCode}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {showForm && (
          <div className="space-y-3">
            {fields.map(field => (
              <div key={field.key} className="space-y-1">
                <Label className="text-xs">{field.label}</Label>
                <Input value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder} className="h-10 rounded-lg" />
              </div>
            ))}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 rounded-xl">Batal</Button>
              <Button onClick={handleSave} className="flex-1 rounded-xl">{editId ? 'Perbarui' : 'Simpan'}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAddress;

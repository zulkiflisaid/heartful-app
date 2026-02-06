import PageHeader from '@/components/PageHeader';
import { ShoppingBag } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <PageHeader title="Tentang Aplikasi" />
      <div className="flex flex-col items-center p-8 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
          <ShoppingBag className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold">E-Commerce App</h2>
        <p className="mt-1 text-sm text-muted-foreground">Versi 1.0.0</p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Aplikasi e-commerce mobile yang dirancang untuk memberikan pengalaman belanja online terbaik. 
          Dengan antarmuka yang modern dan mudah digunakan, Anda bisa menemukan berbagai produk berkualitas dengan harga terbaik.
        </p>
        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>Developed with ❤️ by Lovable</p>
          <p>© 2026 E-Commerce App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

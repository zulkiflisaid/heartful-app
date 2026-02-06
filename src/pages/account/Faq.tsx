import PageHeader from '@/components/PageHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Bagaimana cara melakukan pemesanan?', a: 'Pilih produk yang diinginkan, tambahkan ke keranjang, pilih alamat dan metode pengiriman, lalu lakukan checkout.' },
  { q: 'Berapa lama pengiriman?', a: 'Waktu pengiriman tergantung kurir yang dipilih, biasanya 1-5 hari kerja.' },
  { q: 'Bagaimana cara mengembalikan barang?', a: 'Masuk ke detail pesanan, pilih "Komplain/Retur", dan ikuti petunjuk yang diberikan.' },
  { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima Transfer Bank, E-Wallet (GoPay, OVO, DANA), COD, dan Kartu Kredit.' },
  { q: 'Bagaimana cara menghubungi customer service?', a: 'Anda bisa menghubungi CS melalui fitur Chat di menu Inbox atau membuat tiket bantuan.' },
  { q: 'Apakah bisa mengubah alamat setelah checkout?', a: 'Perubahan alamat hanya bisa dilakukan sebelum pesanan diproses. Hubungi CS untuk bantuan.' },
];

const Faq = () => {
  return (
    <div className="min-h-screen">
      <PageHeader title="Bantuan / FAQ" />
      <div className="p-4">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;

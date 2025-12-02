import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "Apa itu ByteNodes?",
        a: "ByteNodes adalah penyedia layanan hosting profesional di Indonesia yang menyediakan VPS, Game Server, RDP, dan berbagai layanan hosting lainnya dengan kualitas terbaik dan harga terjangkau."
      },
      {
        q: "Bagaimana cara memulai menggunakan layanan ByteNodes?",
        a: "Anda bisa memulai dengan: 1) Buat akun di website kami, 2) Pilih paket yang sesuai kebutuhan, 3) Lakukan pembayaran, 4) Layanan akan aktif dalam hitungan menit setelah pembayaran terkonfirmasi."
      },
      {
        q: "Metode pembayaran apa saja yang tersedia?",
        a: "Kami menerima berbagai metode pembayaran termasuk transfer bank (BCA, BNI, Mandiri, BRI), e-wallet (GoPay, OVO, DANA), dan QRIS untuk kemudahan transaksi."
      }
    ]
  },
  {
    category: "VPS & Server",
    questions: [
      {
        q: "Apa perbedaan VPS KVM dan VPS Premium?",
        a: "VPS KVM menggunakan virtualisasi KVM standar dengan hardware server Xeon, cocok untuk general purpose. VPS Premium menggunakan Intel Gen 12 dengan NVMe storage untuk performa lebih tinggi dan single-core yang kuat."
      },
      {
        q: "Apakah saya mendapat akses root/administrator?",
        a: "Ya, semua VPS dan RDP kami memberikan akses root (Linux) atau administrator (Windows) penuh, sehingga Anda memiliki kontrol penuh atas server."
      },
      {
        q: "Berapa lama aktivasi server setelah pembayaran?",
        a: "Aktivasi server biasanya dalam 5-30 menit setelah pembayaran terkonfirmasi. Untuk RDP Windows, bisa memakan waktu sedikit lebih lama karena proses instalasi OS."
      },
      {
        q: "Apakah IP address dedicated?",
        a: "Ya, setiap VPS dan RDP mendapat 1 dedicated IPv4 address. Tambahan IP bisa dibeli terpisah jika diperlukan."
      }
    ]
  },
  {
    category: "Game Server",
    questions: [
      {
        q: "Game apa saja yang didukung?",
        a: "Kami mendukung berbagai game seperti Minecraft (Java & Bedrock), Rust, ARK, Valheim, Terraria, dan masih banyak lagi melalui panel Pterodactyl."
      },
      {
        q: "Apakah bisa install mod dan plugin?",
        a: "Ya, Anda memiliki akses penuh untuk menginstall mod, plugin, dan mengkonfigurasi server sesuai kebutuhan melalui panel Pterodactyl yang user-friendly."
      },
      {
        q: "Bagaimana dengan DDoS protection?",
        a: "Semua server kami dilengkapi dengan DDoS protection untuk melindungi dari serangan. Kami menggunakan mitigasi layer 4 dan layer 7."
      }
    ]
  },
  {
    category: "Billing & Support",
    questions: [
      {
        q: "Apakah ada garansi uang kembali?",
        a: "Ya, kami memberikan garansi 7 hari uang kembali untuk pelanggan baru. Jika tidak puas dengan layanan dalam 7 hari pertama, Anda bisa meminta refund penuh."
      },
      {
        q: "Bagaimana cara menghubungi support?",
        a: "Anda bisa menghubungi kami melalui: Support Ticket di website, WhatsApp, Discord, atau email ke support@bytenodes.id. Tim support tersedia 24/7."
      },
      {
        q: "Apakah bisa upgrade paket?",
        a: "Ya, Anda bisa upgrade paket kapan saja. Biaya upgrade dihitung pro-rata berdasarkan sisa waktu berlangganan Anda."
      },
      {
        q: "Bagaimana jika saya lupa password?",
        a: "Anda bisa reset password melalui halaman login dengan klik 'Lupa Password'. Untuk akses server, Anda bisa reinstall OS atau hubungi support untuk bantuan."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {faqs.map((category, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
              <Card className="overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} value={`${idx}-${faqIdx}`}>
                      <AccordionTrigger className="px-6 hover:no-underline hover:bg-secondary/50">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

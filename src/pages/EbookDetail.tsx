import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, ShoppingCart, QrCode, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SAMPLE_EBOOKS, getDiscountedPrice, isDiscountActive, isSafeUrl } from "@/types/ebook";
import coverRedes from "@/assets/cover-redes.jpg";
import coverHardware from "@/assets/cover-hardware.jpg";
import coverSeguranca from "@/assets/cover-seguranca.jpg";
import coverCloud from "@/assets/cover-cloud.jpg";
import { useState } from "react";

const categoryCovers: Record<string, string> = {
  Redes: coverRedes,
  Hardware: coverHardware,
  Segurança: coverSeguranca,
  Cloud: coverCloud,
};

const EbookDetail = () => {
  const { id } = useParams();
  const ebook = SAMPLE_EBOOKS.find((e) => e.id === id);
  const [showPix, setShowPix] = useState(false);

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Ebook não encontrado</h1>
          <Link to="/"><Button variant="outline">Voltar ao catálogo</Button></Link>
        </div>
      </div>
    );
  }

  const coverImage = ebook.coverUrl || categoryCovers[ebook.category] || coverRedes;
  const hasDiscount = isDiscountActive(ebook);
  const discountedPrice = getDiscountedPrice(ebook);
  const finalPrice = discountedPrice ?? ebook.price;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="rounded-lg overflow-hidden shadow-card shadow-glow relative bg-[hsl(var(--card))]">
              <img src={coverImage} alt={ebook.title} className="w-full h-auto object-contain bg-[hsl(var(--card))]" />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground font-bold px-3 py-1.5 rounded-full flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4" />
                  -{ebook.discountPercent}% OFF
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">{ebook.category}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{ebook.title}</h1>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{ebook.description}</p>

            {ebook.pages && (
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <FileText className="w-5 h-5" />
                <span>{ebook.pages} páginas</span>
              </div>
            )}

            <div className="glass rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Preço</span>
                <div className="flex items-center gap-3">
                  {hasDiscount && (
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {ebook.price.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                  <span className="text-3xl font-display font-bold text-gradient">
                    R$ {finalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {ebook.paymentUrl && isSafeUrl(ebook.paymentUrl) && (
                  <a href={ebook.paymentUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-primary text-primary-foreground font-semibold text-lg py-6 hover:opacity-90 transition-opacity">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar com Cartão
                    </Button>
                  </a>
                )}
                {ebook.paymentPixUrl ? (
                  <a href={ebook.paymentPixUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full font-semibold text-lg py-6 border-primary/30 hover:bg-primary/5 transition-colors">
                      <QrCode className="w-5 h-5 mr-2" />
                      Pagar via Pix
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full font-semibold text-lg py-6 border-primary/30 hover:bg-primary/5 transition-colors"
                    onClick={() => setShowPix(!showPix)}
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    Pagar via Pix
                  </Button>
                )}
              </div>
            </div>

            {showPix && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-lg p-6 text-center">
                <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">Pagamento via Pix</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  O QR Code será gerado após a integração com o Mercado Pago.
                </p>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Valor a pagar</p>
                  <p className="text-2xl font-display font-bold text-gradient">
                    R$ {finalPrice.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EbookDetail;

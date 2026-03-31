import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Ebook } from "@/types/ebook";
import { getDiscountedPrice, isDiscountActive } from "@/types/ebook";
import { useEffect, useState } from "react";

interface DiscountBannerProps {
  ebooks: Ebook[];
}

function getTimeRemaining(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const DiscountBanner = ({ ebooks }: DiscountBannerProps) => {
  const discountedEbooks = ebooks.filter(isDiscountActive);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (discountedEbooks.length === 0) return;
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [discountedEbooks.length]);

  if (discountedEbooks.length === 0) return null;

  const featured = discountedEbooks[0];
  const discountedPrice = getDiscountedPrice(featured);
  const timeLeft = featured.discountEndsAt ? getTimeRemaining(featured.discountEndsAt) : null;

  if (!timeLeft || !discountedPrice) return null;

  return (
    <section className="py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-gradient-to-r from-destructive/10 via-destructive/5 to-primary/10 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 text-destructive mb-4">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Oferta por tempo limitado</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {featured.discountPercent}% OFF — {featured.title}
              </h2>

              <p className="text-muted-foreground mb-4 max-w-lg">
                {featured.description}
              </p>

              <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                <span className="text-lg text-muted-foreground line-through">
                  R$ {featured.price.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-3xl font-display font-bold text-gradient">
                  R$ {discountedPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <Link to={`/ebook/${featured.id}`}>
                <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 hover:opacity-90">
                  <Flame className="w-5 h-5 mr-2" />
                  Aproveitar oferta
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-destructive" />
              <div className="flex gap-2">
                {[
                  { value: timeLeft.days, label: "dias" },
                  { value: timeLeft.hours, label: "hrs" },
                  { value: timeLeft.minutes, label: "min" },
                  { value: timeLeft.seconds, label: "seg" },
                ].map((unit) => (
                  <div key={unit.label} className="text-center glass rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-display font-bold text-foreground">{String(unit.value).padStart(2, "0")}</p>
                    <p className="text-xs text-muted-foreground">{unit.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscountBanner;

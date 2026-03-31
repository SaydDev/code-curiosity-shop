import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Ebook } from "@/types/ebook";
import { getDiscountedPrice, isDiscountActive } from "@/types/ebook";
import coverRedes from "@/assets/cover-redes.jpg";
import coverHardware from "@/assets/cover-hardware.jpg";
import coverSeguranca from "@/assets/cover-seguranca.jpg";
import coverCloud from "@/assets/cover-cloud.jpg";

const categoryCovers: Record<string, string> = {
  Redes: coverRedes,
  Hardware: coverHardware,
  Segurança: coverSeguranca,
  Cloud: coverCloud,
};

interface EbookCardProps {
  ebook: Ebook;
  index: number;
}

const EbookCard = ({ ebook, index }: EbookCardProps) => {
  const coverImage = ebook.coverUrl || categoryCovers[ebook.category] || coverRedes;
  const hasDiscount = isDiscountActive(ebook);
  const discountedPrice = getDiscountedPrice(ebook);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/ebook/${ebook.id}`}>
        <div className="group relative rounded-lg overflow-hidden glass shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1 flex flex-col sm:flex-row">
          <div className="sm:w-48 md:w-56 shrink-0 overflow-hidden bg-secondary relative">
            <img
              src={coverImage}
              alt={ebook.title}
              loading="lazy"
              className="w-full h-48 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3" />
                -{ebook.discountPercent}%
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {ebook.category}
                </span>
                {ebook.pages && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {ebook.pages} págs
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {ebook.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {ebook.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {hasDiscount && discountedPrice ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {ebook.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xl font-display font-bold text-gradient">
                      R$ {discountedPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-display font-bold text-gradient">
                    R$ {ebook.price.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                <BookOpen className="w-4 h-4 mr-1" />
                Ver mais
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EbookCard;

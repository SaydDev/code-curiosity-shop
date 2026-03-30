import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Ebook } from "@/types/ebook";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/ebook/${ebook.id}`}>
        <div className="group relative rounded-lg overflow-hidden glass shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
          <div className="aspect-[3/4] overflow-hidden bg-secondary">
            <img
              src={coverImage}
              alt={ebook.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>
          <div className="p-5">
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
            <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {ebook.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {ebook.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-display font-bold text-gradient">
                R$ {ebook.price.toFixed(2).replace(".", ",")}
              </span>
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

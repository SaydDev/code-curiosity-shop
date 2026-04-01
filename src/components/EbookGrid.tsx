import { motion } from "framer-motion";
import EbookCard from "./EbookCard";
import type { Ebook } from "@/types/ebook";
import { BookOpen } from "lucide-react";

interface EbookGridProps {
  ebooks: Ebook[];
}

const EbookGrid = ({ ebooks }: EbookGridProps) => {
  return (
    <section className="container py-20" id="catalogo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Nosso acervo</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Catálogo de <span className="text-gradient">Ebooks</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Escolha seu próximo ebook e aprenda algo novo hoje.
        </p>
      </motion.div>

      {ebooks.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Nenhum ebook disponível no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ebooks.map((ebook, i) => (
            <EbookCard key={ebook.id} ebook={ebook} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EbookGrid;

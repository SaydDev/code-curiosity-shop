import EbookCard from "./EbookCard";
import type { Ebook } from "@/types/ebook";

interface EbookGridProps {
  ebooks: Ebook[];
}

const EbookGrid = ({ ebooks }: EbookGridProps) => {
  return (
    <section className="container py-16" id="catalogo">
      <h2 className="text-3xl font-display font-bold mb-2">Catálogo</h2>
      <p className="text-muted-foreground mb-10">Escolha seu próximo ebook e aprenda algo novo hoje.</p>

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

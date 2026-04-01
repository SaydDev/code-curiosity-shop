import { BookOpen, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-gradient text-lg">TechBooks</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ebooks de tecnologia diretos ao ponto. Aprenda conceitos que importam, escritos por quem entende.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#catalogo" className="hover:text-primary transition-colors">Catálogo</a></li>
              <li><a href="#temas" className="hover:text-primary transition-colors">Temas</a></li>
              <li><a href="#depoimentos" className="hover:text-primary transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary/70" />
                contato@techbooks.com.br
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary/70" />
                Pagamento 100% seguro
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TechBooks. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-gradient">TechBooks</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TechBooks. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

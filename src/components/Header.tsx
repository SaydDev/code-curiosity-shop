import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <BookOpen className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          <span className="text-lg font-display font-bold text-gradient"><span className="text-lg font-display font-bold text-gradient">TIS TecBooks</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#catalogo">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Catálogo</Button>
          </a>
          <a href="#temas">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Temas</Button>
          </a>
          <a href="#depoimentos">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Depoimentos</Button>
          </a>
        </nav>

        {/* Mobile toggle */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-border/50 px-4 py-3 flex flex-col gap-1">
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">Catálogo</Button>
          </a>
          <a href="#temas" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">Temas</Button>
          </a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">Depoimentos</Button>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

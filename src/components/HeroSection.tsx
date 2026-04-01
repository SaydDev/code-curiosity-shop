import { motion } from "framer-motion";
import { ArrowDown, Zap, BookOpen, Shield, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const floatingIcons = [
  { icon: BookOpen, x: "10%", y: "20%", delay: 0, size: "w-6 h-6" },
  { icon: Shield, x: "85%", y: "25%", delay: 1.2, size: "w-5 h-5" },
  { icon: Cpu, x: "75%", y: "70%", delay: 0.6, size: "w-7 h-7" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      {/* Animated floating icons */}
      {floatingIcons.map(({ icon: Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute z-10 text-primary/20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 4, delay }}
        >
          <Icon className={size} />
        </motion.div>
      ))}

      {/* Grid lines overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium tracking-wide">Ebooks de Tecnologia</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.1] mb-8">
            Desvende o mundo da{" "}
            <span className="text-gradient relative">
              tecnologia
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Ebooks diretos ao ponto sobre como as coisas funcionam. De redes a processadores, 
            criptografia a cloud — conhecimento que transforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#catalogo">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity shadow-glow">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Catálogo
              </Button>
            </a>
            <a href="#depoimentos">
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground font-semibold text-lg px-8 py-6 hover:bg-primary/5">
                O que dizem os leitores
              </Button>
            </a>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <ArrowDown className="w-6 h-6 text-primary mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

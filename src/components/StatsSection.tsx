import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Star, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Leitores satisfeitos" },
  { icon: BookOpen, value: 12, suffix: "", label: "Ebooks publicados" },
  { icon: Star, value: 4.9, suffix: "", label: "Avaliação média", decimal: true },
  { icon: Download, value: 8000, suffix: "+", label: "Downloads realizados" },
];

function AnimatedNumber({ value, suffix, decimal }: { value: number; suffix: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(decimal ? current.toFixed(1) : Math.floor(current).toLocaleString("pt-BR"));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, decimal]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const StatsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

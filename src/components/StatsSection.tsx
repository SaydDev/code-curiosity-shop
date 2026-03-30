import { motion } from "framer-motion";
import { Users, BookOpen, Star, Download } from "lucide-react";

const stats = [
  { icon: Users, value: "2.500+", label: "Leitores satisfeitos" },
  { icon: BookOpen, value: "12", label: "Ebooks publicados" },
  { icon: Star, value: "4.9", label: "Avaliação média" },
  { icon: Download, value: "8.000+", label: "Downloads realizados" },
];

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                {stat.value}
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

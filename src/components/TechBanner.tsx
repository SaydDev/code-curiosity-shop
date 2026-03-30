import { motion } from "framer-motion";
import techBanner from "@/assets/tech-brands-banner.jpg";
import { Shield, Cpu, Cloud, Wifi, Brain, Code } from "lucide-react";

const topics = [
  { icon: Wifi, label: "Redes & Internet" },
  { icon: Cpu, label: "Hardware & Processadores" },
  { icon: Shield, label: "Segurança & Criptografia" },
  { icon: Cloud, label: "Cloud Computing" },
  { icon: Brain, label: "Inteligência Artificial" },
  { icon: Code, label: "Programação & Frameworks" },
];

const TechBanner = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${techBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />

      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Temas que <span className="text-gradient">cobrimos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nossos ebooks abrangem os tópicos mais relevantes da tecnologia moderna.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl glass hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              <topic.icon className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-foreground text-center">{topic.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBanner;

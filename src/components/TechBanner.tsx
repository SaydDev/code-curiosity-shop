import { motion } from "framer-motion";
import { Shield, Cpu, Cloud, Wifi, Brain, Code, Server, Database, Lock, Globe } from "lucide-react";

const topics = [
  { icon: Wifi, label: "Redes & Internet", desc: "TCP/IP, DNS e protocolos" },
  { icon: Cpu, label: "Hardware", desc: "Processadores e arquitetura" },
  { icon: Shield, label: "Segurança", desc: "Criptografia e proteção" },
  { icon: Cloud, label: "Cloud", desc: "AWS, Azure e GCP" },
  { icon: Brain, label: "Inteligência Artificial", desc: "ML, Deep Learning e LLMs" },
  { icon: Code, label: "Programação", desc: "React, frameworks modernos" },
  { icon: Server, label: "DevOps", desc: "CI/CD, containers e deploy" },
  { icon: Database, label: "Banco de Dados", desc: "SQL, NoSQL e modelagem" },
  { icon: Lock, label: "Privacidade", desc: "LGPD e proteção de dados" },
  { icon: Globe, label: "Web", desc: "Frontend, backend e APIs" },
];

const TechBanner = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="temas">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />

      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Temas que <span className="text-gradient">cobrimos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nossos ebooks abrangem os tópicos mais relevantes da tecnologia moderna.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 p-6 rounded-xl glass hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <topic.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground text-center">{topic.label}</span>
              <span className="text-xs text-muted-foreground text-center">{topic.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBanner;

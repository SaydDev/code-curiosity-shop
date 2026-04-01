import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import avatarLucas from "@/assets/avatar-lucas.jpg";
import avatarCamila from "@/assets/avatar-camila.jpg";
import avatarRafael from "@/assets/avatar-rafael.jpg";
import avatarAna from "@/assets/avatar-ana.jpg";
import avatarBruno from "@/assets/avatar-bruno.jpg";
import avatarFernanda from "@/assets/avatar-fernanda.jpg";

const testimonials = [
  {
    name: "Lucas Mendes",
    role: "Desenvolvedor Full Stack",
    text: "Os ebooks me ajudaram a entender conceitos que eu lutava há meses. Linguagem clara e direto ao ponto!",
    rating: 5,
    avatar: avatarLucas,
    ebook: "Fundamentos de Redes",
  },
  {
    name: "Camila Rodrigues",
    role: "Estudante de Engenharia",
    text: "Comprei o de redes e o de criptografia. Melhor investimento que fiz nos meus estudos esse ano.",
    rating: 5,
    avatar: avatarCamila,
    ebook: "Introdução à Criptografia",
  },
  {
    name: "Rafael Costa",
    role: "Analista de TI",
    text: "Material de qualidade profissional. Uso como referência no meu dia a dia no trabalho.",
    rating: 5,
    avatar: avatarRafael,
    ebook: "Cloud Computing na Prática",
  },
  {
    name: "Ana Paula Silva",
    role: "Product Manager",
    text: "Mesmo sem ser técnica, consegui entender tudo. Recomendo para qualquer pessoa curiosa sobre tech.",
    rating: 4,
    avatar: avatarAna,
    ebook: "Fundamentos de Redes",
  },
  {
    name: "Bruno Oliveira",
    role: "DevOps Engineer",
    text: "O ebook de Cloud Computing é sensacional. Explica AWS, GCP e Azure de forma prática e comparativa.",
    rating: 5,
    avatar: avatarBruno,
    ebook: "Cloud Computing na Prática",
  },
  {
    name: "Fernanda Lima",
    role: "Designer UX/UI",
    text: "Adorei a didática! Finalmente entendi como funciona a internet por baixo dos panos.",
    rating: 5,
    avatar: avatarFernanda,
    ebook: "Como Funciona um Processador",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative" id="depoimentos">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Feedbacks reais</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            O que nossos <span className="text-gradient">leitores</span> dizem
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Mais de 2.000 leitores já transformaram seu conhecimento com nossos ebooks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl glass p-6 hover:border-primary/30 hover:shadow-glow transition-all duration-300 group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t.text}</p>
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-primary/70">📖 {t.ebook}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

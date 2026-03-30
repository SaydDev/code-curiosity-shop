import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
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
  },
  {
    name: "Camila Rodrigues",
    role: "Estudante de Engenharia",
    text: "Comprei o de redes e o de criptografia. Melhor investimento que fiz nos meus estudos esse ano.",
    rating: 5,
    avatar: avatarCamila,
  },
  {
    name: "Rafael Costa",
    role: "Analista de TI",
    text: "Material de qualidade profissional. Uso como referência no meu dia a dia no trabalho.",
    rating: 5,
    avatar: avatarRafael,
  },
  {
    name: "Ana Paula Silva",
    role: "Product Manager",
    text: "Mesmo sem ser técnica, consegui entender tudo. Recomendo para qualquer pessoa curiosa sobre tech.",
    rating: 4,
    avatar: avatarAna,
  },
  {
    name: "Bruno Oliveira",
    role: "DevOps Engineer",
    text: "O ebook de Cloud Computing é sensacional. Explica AWS, GCP e Azure de forma prática e comparativa.",
    rating: 5,
    avatar: avatarBruno,
  },
  {
    name: "Fernanda Lima",
    role: "Designer UX/UI",
    text: "Adorei a didática! Finalmente entendi como funciona a internet por baixo dos panos.",
    rating: 5,
    avatar: avatarFernanda,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
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
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
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
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

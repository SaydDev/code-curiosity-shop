export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  category: string;
  pages?: number;
  createdAt: string;
}

export const SAMPLE_EBOOKS: Ebook[] = [
  {
    id: "1",
    title: "Fundamentos de Redes",
    description: "Aprenda como a internet funciona, do TCP/IP ao DNS. Um guia completo para entender a infraestrutura da web moderna.",
    price: 29.90,
    coverUrl: "",
    category: "Redes",
    pages: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Como Funciona um Processador",
    description: "Descubra os conceitos por trás dos chips que movem o mundo. Da lógica binária à arquitetura de pipelines.",
    price: 34.90,
    coverUrl: "",
    category: "Hardware",
    pages: 95,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Introdução à Criptografia",
    description: "Entenda os conceitos de criptografia simétrica, assimétrica, hashing e como proteger seus dados.",
    price: 24.90,
    coverUrl: "",
    category: "Segurança",
    pages: 80,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Cloud Computing na Prática",
    description: "Conceitos essenciais de computação em nuvem: IaaS, PaaS, SaaS e como escolher a melhor solução.",
    price: 39.90,
    coverUrl: "",
    category: "Cloud",
    pages: 150,
    createdAt: new Date().toISOString(),
  },
];

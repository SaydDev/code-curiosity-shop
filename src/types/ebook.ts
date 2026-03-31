import { z } from "zod";

export const ebookSchema = z.object({
  title: z.string().trim().min(1, "Título obrigatório").max(200, "Máximo 200 caracteres"),
  description: z.string().trim().min(1, "Descrição obrigatória").max(2000, "Máximo 2000 caracteres"),
  price: z.number().min(0.01, "Preço mínimo R$0,01").max(99999, "Preço inválido"),
  category: z.string().trim().min(1, "Categoria obrigatória").max(50, "Máximo 50 caracteres"),
  pages: z.number().int().min(1).max(99999).optional(),
  coverUrl: z.string().max(2000).optional(),
  pdfUrl: z.string().max(2000).optional(),
  discountPercent: z.number().min(0).max(99).optional(),
  discountEndsAt: z.string().optional(),
});

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  pdfUrl?: string;
  category: string;
  pages?: number;
  createdAt: string;
  discountPercent?: number;
  discountEndsAt?: string;
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
    discountPercent: 30,
    discountEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
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

export function getDiscountedPrice(ebook: Ebook): number | null {
  if (!ebook.discountPercent || !ebook.discountEndsAt) return null;
  if (new Date(ebook.discountEndsAt) <= new Date()) return null;
  return ebook.price * (1 - ebook.discountPercent / 100);
}

export function isDiscountActive(ebook: Ebook): boolean {
  return getDiscountedPrice(ebook) !== null;
}

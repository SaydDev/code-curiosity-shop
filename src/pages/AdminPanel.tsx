import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Save, X, BookOpen, Upload, FileUp, Flame, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Ebook } from "@/types/ebook";
import { SAMPLE_EBOOKS, ebookSchema, isDiscountActive } from "@/types/ebook";

const sanitizeText = (text: string): string =>
  text.replace(/[<>]/g, "").trim();

const ADMIN_PIN = "2026";
const SESSION_KEY = "admin_auth";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>(SAMPLE_EBOOKS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "", pages: "",
    coverUrl: "", pdfUrl: "", discountPercent: "", discountEndsAt: "",
    paymentUrl: "", paymentPixUrl: "",
  });
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ title: "", description: "", price: "", category: "", pages: "", coverUrl: "", pdfUrl: "", discountPercent: "", discountEndsAt: "", paymentUrl: "", paymentPixUrl: "" });
    setCoverPreview(null);
    setPdfName(null);
    setShowForm(false);
    setEditingId(null);
    setErrors([]);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB limit
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    setForm((f) => ({ ...f, coverUrl: url }));
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") return;
    if (file.size > 50 * 1024 * 1024) return; // 50MB limit
    setPdfName(file.name);
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, pdfUrl: url }));
  };

  const handleSave = () => {
    const parsed = ebookSchema.safeParse({
      title: sanitizeText(form.title),
      description: sanitizeText(form.description),
      price: parseFloat(form.price) || 0,
      category: sanitizeText(form.category),
      pages: form.pages ? parseInt(form.pages) : undefined,
      coverUrl: form.coverUrl,
      pdfUrl: form.pdfUrl || undefined,
      discountPercent: form.discountPercent ? parseInt(form.discountPercent) : undefined,
      discountEndsAt: form.discountEndsAt || undefined,
    });

    if (!parsed.success) {
      setErrors(parsed.error.errors.map((e) => e.message));
      return;
    }
    setErrors([]);

    const data = parsed.data;

    if (editingId) {
      setEbooks((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, ...data, pages: data.pages, coverUrl: data.coverUrl || "", pdfUrl: data.pdfUrl, paymentUrl: sanitizeText(form.paymentUrl), paymentPixUrl: sanitizeText(form.paymentPixUrl) }
            : e
        )
      );
    } else {
      const newEbook: Ebook = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        pages: data.pages,
        coverUrl: data.coverUrl || "",
        pdfUrl: data.pdfUrl,
        discountPercent: data.discountPercent,
        discountEndsAt: data.discountEndsAt,
        paymentUrl: sanitizeText(form.paymentUrl),
        paymentPixUrl: sanitizeText(form.paymentPixUrl),
        createdAt: new Date().toISOString(),
      };
      setEbooks((prev) => [...prev, newEbook]);
    }
    resetForm();
  };

  const handleEdit = (ebook: Ebook) => {
    setForm({
      title: ebook.title,
      description: ebook.description,
      price: ebook.price.toString(),
      category: ebook.category,
      pages: ebook.pages?.toString() || "",
      coverUrl: ebook.coverUrl,
      pdfUrl: ebook.pdfUrl || "",
      discountPercent: ebook.discountPercent?.toString() || "",
      discountEndsAt: ebook.discountEndsAt ? ebook.discountEndsAt.slice(0, 16) : "",
    });
    setCoverPreview(ebook.coverUrl || null);
    setPdfName(ebook.pdfUrl ? "arquivo.pdf" : null);
    setEditingId(ebook.id);
    setShowForm(true);
    setErrors([]);
  };

  const handleDelete = (id: string) => {
    setEbooks((prev) => prev.filter((e) => e.id !== id));
  };

  const handleLogin = () => {
    if (locked) return;
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      setPinError(false);
    } else {
      setPinError(true);
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 5) setLocked(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Área Restrita</h1>
          <p className="text-sm text-muted-foreground mb-6">Digite a senha para acessar o painel</p>
          {pinError && <p className="text-sm text-destructive mb-3">Senha incorreta. {locked ? "Bloqueado por excesso de tentativas." : `Tentativa ${attempts}/5`}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <Input
              type="password"
              placeholder="Senha"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="bg-secondary border-border mb-4 text-center text-lg tracking-widest"
              maxLength={20}
              disabled={locked}
              autoFocus
            />
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90" disabled={locked || !pin}>
              Entrar
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Painel Admin</h1>
            <p className="text-muted-foreground">Gerencie seus ebooks, preços e promoções</p>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ebook
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-lg p-6 mb-8">
            <h2 className="font-display font-semibold text-lg mb-4">
              {editingId ? "Editar Ebook" : "Novo Ebook"}
            </h2>

            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4">
                {errors.map((err, i) => (
                  <p key={i} className="text-sm text-destructive">{err}</p>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-secondary border-border" maxLength={200} />
              <Input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-secondary border-border" maxLength={50} />
              <Input placeholder="Preço (ex: 29.90)" type="number" step="0.01" min="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-secondary border-border" />
              <Input placeholder="Páginas" type="number" min="1" value={form.pages} onChange={(e) => setForm({ ...form, pages: e.target.value })} className="bg-secondary border-border" />

              <div className="md:col-span-2 border-t border-border/50 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-destructive" />
                  <span className="font-display font-semibold text-sm">Desconto por tempo limitado</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="% de desconto (ex: 30)" type="number" min="0" max="99" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} className="bg-secondary border-border" />
                  <Input type="datetime-local" value={form.discountEndsAt} onChange={(e) => setForm({ ...form, discountEndsAt: e.target.value })} className="bg-secondary border-border" />
                </div>
              </div>

              <div className="md:col-span-1">
                <input ref={coverInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleCoverUpload} className="hidden" />
                <Button type="button" variant="outline" onClick={() => coverInputRef.current?.click()} className="w-full h-10 justify-start gap-2">
                  <Upload className="w-4 h-4 text-primary" />
                  {coverPreview ? "Capa selecionada ✓" : "Upload da capa"}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">Tamanho recomendado: 800×1200px (proporção 2:3)</p>
                {coverPreview && <img src={coverPreview} alt="Preview" className="mt-2 h-20 rounded-md object-contain bg-[hsl(var(--card))]" />}
              </div>

              <div className="md:col-span-1">
                <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" onChange={handlePdfUpload} className="hidden" />
                <Button type="button" variant="outline" onClick={() => pdfInputRef.current?.click()} className="w-full h-10 justify-start gap-2">
                  <FileUp className="w-4 h-4 text-primary" />
                  {pdfName ? `PDF: ${pdfName}` : "Upload do PDF"}
                </Button>
              </div>

              <Input placeholder="Ou cole a URL da capa" value={form.coverUrl} onChange={(e) => { setForm({ ...form, coverUrl: e.target.value }); setCoverPreview(e.target.value); }} className="bg-secondary border-border md:col-span-2" maxLength={2000} />
              <Textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary border-border md:col-span-2" rows={3} maxLength={2000} />
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleSave} className="bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {ebooks.map((ebook, i) => (
            <motion.div key={ebook.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="glass rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-display font-semibold flex items-center gap-2">
                    {ebook.title}
                    {isDiscountActive(ebook) && (
                      <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full font-bold">
                        -{ebook.discountPercent}%
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{ebook.category} · {ebook.pages || "?"} págs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-gradient text-lg">R$ {ebook.price.toFixed(2).replace(".", ",")}</span>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(ebook)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(ebook.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Save, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Ebook } from "@/types/ebook";
import { SAMPLE_EBOOKS } from "@/types/ebook";

const AdminPanel = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>(SAMPLE_EBOOKS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    pages: "",
    coverUrl: "",
  });

  const resetForm = () => {
    setForm({ title: "", description: "", price: "", category: "", pages: "", coverUrl: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.title || !form.price) return;

    if (editingId) {
      setEbooks((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, title: form.title, description: form.description, price: parseFloat(form.price), category: form.category, pages: form.pages ? parseInt(form.pages) : undefined, coverUrl: form.coverUrl }
            : e
        )
      );
    } else {
      const newEbook: Ebook = {
        id: Date.now().toString(),
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        pages: form.pages ? parseInt(form.pages) : undefined,
        coverUrl: form.coverUrl,
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
    });
    setEditingId(ebook.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEbooks((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Painel Admin</h1>
            <p className="text-muted-foreground">Gerencie seus ebooks e preços</p>
          </div>
          <Button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Ebook
          </Button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-6 mb-8"
          >
            <h2 className="font-display font-semibold text-lg mb-4">
              {editingId ? "Editar Ebook" : "Novo Ebook"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Título"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-secondary border-border"
              />
              <Input
                placeholder="Categoria"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-secondary border-border"
              />
              <Input
                placeholder="Preço (ex: 29.90)"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-secondary border-border"
              />
              <Input
                placeholder="Páginas"
                type="number"
                value={form.pages}
                onChange={(e) => setForm({ ...form, pages: e.target.value })}
                className="bg-secondary border-border"
              />
              <Input
                placeholder="URL da capa (opcional)"
                value={form.coverUrl}
                onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
                className="bg-secondary border-border md:col-span-2"
              />
              <Textarea
                placeholder="Descrição"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary border-border md:col-span-2"
                rows={3}
              />
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
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-display font-semibold">{ebook.title}</h3>
                  <p className="text-sm text-muted-foreground">{ebook.category} · {ebook.pages || "?"} págs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-gradient text-lg">
                  R$ {ebook.price.toFixed(2).replace(".", ",")}
                </span>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(ebook)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(ebook.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
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

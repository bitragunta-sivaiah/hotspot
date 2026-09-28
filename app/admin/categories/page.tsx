"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import { useToast } from "@/lib/toast-store";

export default function AdminCategoriesPage() {
  const { categories, menu, addCategory, updateCategory, deleteCategory } = useAppData();
  const { show } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🍽️");
  const [showAdd, setShowAdd] = useState(false);

  const itemCount = (id: string) => menu.filter((m) => m.category === id).length;

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory({ id: name.toLowerCase().replace(/\s+/g, "-"), name, emoji, visible: true, order: categories.length + 1 });
    show("Category added");
    setName(""); setEmoji("🍽️"); setShowAdd(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">Category Management</h1>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary"><Plus size={18}/> Add Category</button>
      </div>

      {showAdd && (
        <form onSubmit={submitAdd} className="flex flex-wrap items-end gap-3 rounded-2xl border border-beige bg-white p-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Emoji</span>
            <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="w-16 rounded-lg border border-beige px-3 py-2 text-center" />
          </label>
          <label className="flex flex-1 min-w-[160px] flex-col gap-1 text-sm">
            <span className="font-medium">Category Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-beige px-3 py-2" />
          </label>
          <button type="submit" className="btn-primary">Save</button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.sort((a,b) => a.order - b.order).map((c) => (
          <div key={c.id} className="rounded-2xl border border-beige bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{c.emoji}</span>
              <div className="flex items-center gap-2 text-muted">
                <button onClick={() => updateCategory(c.id, { visible: !c.visible })} title="Toggle visibility" className="hover:text-chilli">
                  {c.visible ? <Eye size={16}/> : <EyeOff size={16}/>}
                </button>
                <button onClick={() => { deleteCategory(c.id); show("Category deleted"); }} className="hover:text-red-600"><Trash2 size={16}/></button>
              </div>
            </div>
            <p className="mt-3 font-display font-bold">{c.name}</p>
            <p className="text-sm text-muted">{itemCount(c.id)} Items</p>
            {!c.visible && <span className="badge mt-2 bg-beige text-muted">Hidden</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

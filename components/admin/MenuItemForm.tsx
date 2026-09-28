"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppData } from "@/lib/data-store";
import { useToast } from "@/lib/toast-store";
import { MenuItem, SpiceLevel } from "@/lib/types";

const emptyItem = (): MenuItem => ({
  id: `m-${Date.now()}`,
  slug: "",
  name: "",
  description: "",
  category: "starters",
  price: 0,
  image: "/food/starters.svg",
  isVeg: true,
  spiceLevel: "Medium",
  prepTimeMins: 15,
  rating: 4.5,
  available: true,
  bestseller: false,
  featured: false,
  ordersCount: 0,
});

export default function MenuItemForm({ initial }: { initial?: MenuItem }) {
  const { categories, addMenuItem, updateMenuItem, deleteMenuItem } = useAppData();
  const { show } = useToast();
  const router = useRouter();
  const isEdit = !!initial;
  const [form, setForm] = useState<MenuItem>(initial ?? emptyItem());
  const [ingredientsText, setIngredientsText] = useState(initial?.ingredients?.join(", ") ?? "");

  const set = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { show("Item name is required", "error"); return; }
    const slug = form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload: MenuItem = {
      ...form,
      slug,
      ingredients: ingredientsText ? ingredientsText.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
    };
    if (isEdit) {
      updateMenuItem(payload.id, payload);
      show("Menu item updated successfully.");
    } else {
      addMenuItem(payload);
      show("Menu item created successfully.");
    }
    router.push("/admin/menu");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-2xl border border-beige bg-white p-5 sm:grid-cols-2">
        <F label="Item Name"><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="f-input" /></F>
        <F label="Slug (optional)"><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="f-input" placeholder="auto-generated" /></F>
        <F label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="f-input">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </F>
        <F label="Price (₹)"><input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} className="f-input" /></F>
        <F label="Discount Price (optional)"><input type="number" value={form.discountPrice ?? ""} onChange={(e) => set("discountPrice", e.target.value ? Number(e.target.value) : undefined)} className="f-input" /></F>
        <F label="Food Image URL"><input value={form.image} onChange={(e) => set("image", e.target.value)} className="f-input" /></F>
        <F label="Spice Level">
          <select value={form.spiceLevel} onChange={(e) => set("spiceLevel", e.target.value as SpiceLevel)} className="f-input">
            <option>Mild</option><option>Medium</option><option>Spicy</option>
          </select>
        </F>
        <F label="Preparation Time (mins)"><input type="number" value={form.prepTimeMins} onChange={(e) => set("prepTimeMins", Number(e.target.value))} className="f-input" /></F>
        <F label="Calories (optional)"><input type="number" value={form.calories ?? ""} onChange={(e) => set("calories", e.target.value ? Number(e.target.value) : undefined)} className="f-input" /></F>
        <F label="Ingredients (comma separated)"><input value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} className="f-input" /></F>
        <F label="Description" className="sm:col-span-2">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="f-input" rows={3} />
        </F>
      </div>

      <div className="flex flex-wrap gap-6 rounded-2xl border border-beige bg-white p-5">
        <Toggle label="Vegetarian" checked={form.isVeg} onChange={(v) => set("isVeg", v)} />
        <Toggle label="Available" checked={form.available} onChange={(v) => set("available", v)} />
        <Toggle label="Bestseller" checked={form.bestseller} onChange={(v) => set("bestseller", v)} />
        <Toggle label="Featured" checked={form.featured} onChange={(v) => set("featured", v)} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">{isEdit ? "SAVE CHANGES" : "CREATE ITEM"}</button>
        {isEdit && (
          <button
            type="button"
            onClick={() => { deleteMenuItem(form.id); show("Menu item deleted"); router.push("/admin/menu"); }}
            className="rounded-full border-2 border-red-200 px-6 py-3 font-display font-semibold text-red-600 hover:bg-red-50"
          >
            Delete Item
          </button>
        )}
      </div>

      <style jsx global>{`
        .f-input { width: 100%; border-radius: 0.75rem; border: 1px solid #F2E8DD; padding: 0.55rem 0.85rem; font-size: 0.875rem; background: white; }
        .f-input:focus { outline: 2px solid #B5121B44; }
      `}</style>
    </form>
  );
}

function F({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className ?? ""}`}>
      <span className="font-medium text-charcoal">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-chilli" />
      {label}
    </label>
  );
}

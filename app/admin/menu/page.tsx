"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Copy, Trash2, Search } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import { useToast } from "@/lib/toast-store";
import { formatCurrency } from "@/lib/utils";

export default function AdminMenuPage() {
  const { menu, categories, deleteMenuItem, toggleAvailability, addMenuItem } = useAppData();
  const { show } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = useMemo(() => {
    return menu.filter((m) => {
      if (category !== "ALL" && m.category !== category) return false;
      if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [menu, query, category]);

  const duplicate = (id: string) => {
    const item = menu.find((m) => m.id === id);
    if (!item) return;
    addMenuItem({ ...item, id: `${item.id}-copy-${Date.now()}`, slug: `${item.slug}-copy-${Date.now()}`, name: `${item.name} (Copy)` });
    show("Menu item duplicated");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">Menu Management</h1>
        <Link href="/admin/menu/new" className="btn-primary"><Plus size={18}/> Add Item</Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-beige bg-white p-4">
        <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-full border border-beige px-3 py-2">
          <Search size={16} className="text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-beige px-3 py-2 text-sm">
          <option value="ALL">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-beige bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-beige text-left text-xs uppercase text-muted">
              <th className="p-3">Image</th><th className="p-3">Item</th><th className="p-3">Category</th><th className="p-3">Price</th>
              <th className="p-3">Availability</th><th className="p-3">Orders</th><th className="p-3">Rating</th><th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-beige last:border-0 hover:bg-cream/50">
                <td className="p-3"><div className="relative h-12 w-12 overflow-hidden rounded-lg bg-beige"><Image src={m.image} alt={m.name} fill className="object-cover" /></div></td>
                <td className="p-3 font-medium">{m.name}{m.bestseller && <span className="ml-2 badge bg-chilli text-cream">Bestseller</span>}</td>
                <td className="p-3 capitalize text-muted">{m.category}</td>
                <td className="p-3">{formatCurrency(m.price)}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleAvailability(m.id)}
                    className={`badge border ${m.available ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}
                  >
                    {m.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="p-3">{m.ordersCount}</td>
                <td className="p-3">⭐ {m.rating.toFixed(1)}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3 text-muted">
                    <Link href={`/admin/menu/${m.id}/edit`} className="hover:text-chilli"><Pencil size={16}/></Link>
                    <button onClick={() => duplicate(m.id)} className="hover:text-chilli"><Copy size={16}/></button>
                    <button onClick={() => { deleteMenuItem(m.id); show("Menu item deleted"); }} className="hover:text-red-600"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

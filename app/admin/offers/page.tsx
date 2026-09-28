"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { offers as seedOffers } from "@/data/customerData";
import { Offer } from "@/lib/types";
import { useToast } from "@/lib/toast-store";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>(seedOffers);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const { show } = useToast();

  const blank: Offer = { id: `o-${Date.now()}`, name: "", description: "", discountPercent: 10, couponCode: "", startDate: "2026-01-01", endDate: "2026-12-31", minOrder: 0, categories: [], usageLimit: 100, active: true };
  const [form, setForm] = useState<Offer>(blank);

  const openNew = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (o: Offer) => { setForm(o); setEditing(o); setShowForm(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setOffers((prev) => prev.map((o) => (o.id === editing.id ? form : o)));
      show("Offer updated");
    } else {
      setOffers((prev) => [...prev, form]);
      show("Offer created");
    }
    setShowForm(false);
  };

  const toggleActive = (id: string) => setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  const remove = (id: string) => { setOffers((prev) => prev.filter((o) => o.id !== id)); show("Offer deleted"); };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">Offers Management</h1>
        <button onClick={openNew} className="btn-primary"><Plus size={18}/> Create Offer</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="grid gap-3 rounded-2xl border border-beige bg-white p-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Offer Name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Coupon Code</span><input value={form.couponCode} onChange={(e) => setForm({ ...form, couponCode: e.target.value })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2"><span className="font-medium">Description</span><input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Discount %</span><input type="number" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: Number(e.target.value) })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Minimum Order (₹)</span><input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Start Date</span><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">End Date</span><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="f-input2" /></label>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Usage Limit</span><input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })} className="f-input2" /></label>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-primary">Save Offer</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border-2 border-beige px-6 py-3 text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {offers.map((o) => (
          <div key={o.id} className="rounded-2xl border border-beige bg-white p-5">
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold">{o.name}</h3>
              <span className={`badge ${o.active ? "bg-green-50 text-green-700 border border-green-200" : "bg-beige text-muted"}`}>{o.active ? "Active" : "Inactive"}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{o.description}</p>
            <p className="mt-2 font-display text-lg font-extrabold text-chilli">{o.discountPercent}% OFF</p>
            <p className="text-xs text-muted">Code: <b>{o.couponCode || "—"}</b> · Limit {o.usageLimit}</p>
            <div className="mt-3 flex items-center gap-3 text-muted">
              <button onClick={() => openEdit(o)} className="hover:text-chilli"><Pencil size={16}/></button>
              <button onClick={() => toggleActive(o.id)} className="text-xs font-semibold underline">{o.active ? "Deactivate" : "Activate"}</button>
              <button onClick={() => remove(o.id)} className="ml-auto hover:text-red-600"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`.f-input2 { border: 1px solid #F2E8DD; border-radius: 0.75rem; padding: 0.55rem 0.85rem; font-size: 0.875rem; }`}</style>
    </div>
  );
}

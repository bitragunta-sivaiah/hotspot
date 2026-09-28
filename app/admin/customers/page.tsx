"use client";
import { useMemo, useState } from "react";
import { customers as seedCustomers } from "@/data/customerData";
import { formatCurrency } from "@/lib/utils";

const FILTERS = ["All", "New", "Returning", "VIP", "Inactive", "Active"] as const;

export default function AdminCustomersPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return seedCustomers;
    return seedCustomers.filter((c) => (c.status as unknown as string) === filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-extrabold">Customers</h1>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${filter === f ? "border-chilli bg-chilli text-cream" : "border-beige bg-white hover:border-chilli"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-beige bg-white">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-beige text-left text-xs uppercase text-muted">
              <th className="p-3">Customer</th><th className="p-3">Phone</th><th className="p-3">Orders</th>
              <th className="p-3">Total Spent</th><th className="p-3">Last Order</th><th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-beige last:border-0 hover:bg-cream/50">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3 text-muted">{c.phone}</td>
                <td className="p-3">{c.ordersCount}</td>
                <td className="p-3">{formatCurrency(c.totalSpent)}</td>
                <td className="p-3 text-muted">{c.lastOrder}</td>
                <td className="p-3"><span className="badge bg-beige text-charcoal">{c.status as unknown as string}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

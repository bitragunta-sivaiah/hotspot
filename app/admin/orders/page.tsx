"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import { STATUS_LABEL, STATUS_COLOR } from "@/lib/statusConfig";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { OrderStatus } from "@/lib/types";
import EmptyState from "@/components/EmptyState";

export default function AdminOrdersPage() {
  const { orders } = useAppData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [sort, setSort] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  const filtered = useMemo(() => {
    let list = orders.filter((o) => {
      if (status !== "ALL" && o.status !== status) return false;
      if (query && !`${o.id} ${o.customerName} ${o.phone}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "newest") return +new Date(b.createdAt) - +new Date(a.createdAt);
      if (sort === "oldest") return +new Date(a.createdAt) - +new Date(b.createdAt);
      if (sort === "highest") return b.total - a.total;
      return a.total - b.total;
    });
    return list;
  }, [orders, query, status, sort]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">Order Management</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-beige bg-white p-4">
        <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-full border border-beige px-3 py-2">
          <Search size={16} className="text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-full border border-beige px-3 py-2 text-sm">
          <option value="ALL">All Statuses</option>
          {Object.keys(STATUS_LABEL).map((s) => <option key={s} value={s}>{STATUS_LABEL[s as OrderStatus]}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="rounded-full border border-beige px-3 py-2 text-sm">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Value</option>
          <option value="lowest">Lowest Value</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="NO ORDERS TODAY" subtitle="Your orders will appear here." emoji="📦" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-beige bg-white">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-beige text-left text-xs uppercase text-muted">
                <th className="p-3">Order ID</th><th className="p-3">Customer</th><th className="p-3">Phone</th>
                <th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Payment</th>
                <th className="p-3">Status</th><th className="p-3">Created</th><th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-beige last:border-0 hover:bg-cream/50">
                  <td className="p-3 font-semibold">{o.id}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3 text-muted">{o.phone}</td>
                  <td className="p-3">{o.items.length}</td>
                  <td className="p-3">{formatCurrency(o.total)}</td>
                  <td className="p-3">{o.paymentMethod}</td>
                  <td className="p-3"><span className={`badge border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span></td>
                  <td className="p-3 text-muted">{timeAgo(o.createdAt)}</td>
                  <td className="p-3">
                    <Link href={`/admin/orders/${o.id}`} className="inline-flex items-center gap-1 text-chilli hover:underline">
                      <Eye size={15} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

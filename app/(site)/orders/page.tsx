"use client";
import Link from "next/link";
import { useAppData } from "@/lib/data-store";
import { STATUS_LABEL, STATUS_COLOR } from "@/lib/statusConfig";
import { formatCurrency, timeAgo } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

export default function OrdersPage() {
  const { orders } = useAppData();

  if (orders.length === 0) {
    return <EmptyState title="NO ORDERS YET" subtitle="Start with something delicious." emoji="🧾" ctaLabel="Explore Menu" ctaHref="/menu" />;
  }

  const current = orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status));
  const previous = orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));

  return (
    <div className="container-hs max-w-3xl py-10">
      <h1 className="mb-6 font-display text-2xl font-extrabold">My Orders</h1>

      {current.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-3 font-display font-bold text-muted">Current Orders</h2>
          <div className="flex flex-col gap-3">
            {current.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-2xl border border-beige bg-white p-4 shadow-sm">
                <div>
                  <p className="font-display font-bold">{o.id}</p>
                  <p className="text-sm text-muted">{o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</p>
                  <p className="mt-1 font-semibold">{formatCurrency(o.total)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                  <Link href={`/track-order/${o.id}`} className="text-sm font-semibold text-chilli hover:underline">Track Order</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-display font-bold text-muted">Previous Orders</h2>
        <div className="flex flex-col gap-3">
          {previous.map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-2xl border border-beige bg-white p-4 shadow-sm">
              <div>
                <p className="font-display font-bold">{o.id}</p>
                <p className="text-xs text-muted">{timeAgo(o.createdAt)}</p>
                <p className="mt-1 font-semibold">{formatCurrency(o.total)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`badge border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                <Link href="/menu" className="text-sm font-semibold text-chilli hover:underline">Order Again</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

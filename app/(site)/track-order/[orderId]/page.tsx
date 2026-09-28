"use client";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle, Phone, MessageCircle } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import { STATUS_FLOW, STATUS_LABEL } from "@/lib/statusConfig";
import { formatCurrency } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";
import { restaurantData } from "@/data/restaurantData";

const TIMELINE_STEPS = ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED"] as const;

export default function TrackOrderPage() {
  const params = useParams<{ orderId: string }>();
  const { orders } = useAppData();
  const order = orders.find((o) => o.id === params.orderId);

  if (!order) {
    return <EmptyState title="ORDER NOT FOUND" subtitle="We couldn't find this order." emoji="📦" ctaLabel="Back to Menu" ctaHref="/menu" />;
  }

  if (order.status === "CANCELLED") {
    return <EmptyState title="ORDER CANCELLED" subtitle={`Order ${order.id} was cancelled.`} emoji="❌" ctaLabel="Order Again" ctaHref="/menu" />;
  }

  const currentIdx = TIMELINE_STEPS.indexOf(order.status as any);

  return (
    <div className="container-hs max-w-2xl py-10">
      <div className="rounded-2xl border border-beige bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Order ID</p>
            <p className="font-display text-2xl font-extrabold">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted">Estimated Arrival</p>
            <p className="font-display font-bold text-chilli">35–45 min</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {TIMELINE_STEPS.map((step, i) => {
            const done = i <= currentIdx;
            return (
              <div key={step} className="flex items-center gap-4">
                {done ? <CheckCircle2 className="text-chilli" size={22} /> : <Circle className="text-beige" size={22} />}
                <span className={`font-semibold ${done ? "text-charcoal" : "text-muted"}`}>{STATUS_LABEL[step]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-beige bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-display font-bold">Order Items</h3>
        <div className="flex flex-col gap-2 text-sm">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{it.name} × {it.qty}</span>
              <span>{formatCurrency(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-beige pt-3 font-display font-extrabold">
          <span>Total</span><span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-beige bg-white p-5 shadow-sm">
        <div>
          <p className="font-display font-bold">{restaurantData.name}</p>
          <p className="text-sm text-muted">Need help with your order?</p>
        </div>
        <div className="flex gap-2">
          <a href={`tel:${restaurantData.phone}`} className="grid h-10 w-10 place-items-center rounded-full bg-beige"><Phone size={18} /></a>
          <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-green-700"><MessageCircle size={18} /></a>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">This is simulated demo tracking. Status updates are driven by the restaurant's admin dashboard.</p>
    </div>
  );
}

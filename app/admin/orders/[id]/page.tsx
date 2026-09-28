"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppData } from "@/lib/data-store";
import { STATUS_LABEL, STATUS_COLOR, STATUS_FLOW, nextStatus, nextActionLabel } from "@/lib/statusConfig";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { useToast } from "@/lib/toast-store";
import EmptyState from "@/components/EmptyState";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { orders, updateOrderStatus } = useAppData();
  const { show } = useToast();
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return <EmptyState title="ORDER NOT FOUND" subtitle="This order doesn't exist." emoji="📦" ctaLabel="Back to Orders" ctaHref="/admin/orders" />;
  }

  const currentIdx = STATUS_FLOW.indexOf(order.status as any);
  const advance = () => {
    const ns = nextStatus(order.status);
    if (ns) { updateOrderStatus(order.id, ns); show(`Order ${order.id} marked ${STATUS_LABEL[ns]}`); }
  };
  const cancelOrder = () => { updateOrderStatus(order.id, "CANCELLED"); show(`Order ${order.id} cancelled`, "error"); };

  return (
    <div className="flex flex-col gap-5">
      <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm text-muted hover:text-chilli">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">{order.id}</h1>
          <p className="text-sm text-muted">Placed {timeAgo(order.createdAt)}</p>
        </div>
        <span className={`badge border text-sm ${STATUS_COLOR[order.status]}`}>{STATUS_LABEL[order.status]}</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-beige bg-white p-5">
            <h2 className="mb-3 font-display font-bold">Items</h2>
            <div className="flex flex-col gap-2 text-sm">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between border-b border-beige pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{it.name} × {it.qty}</p>
                    {it.customisations && it.customisations.length > 0 && (
                      <p className="text-xs text-muted">{it.customisations.join(" · ")}</p>
                    )}
                  </div>
                  <span>{formatCurrency(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
              <div className="flex justify-between text-muted"><span>Delivery</span><span>{formatCurrency(order.deliveryFee)}</span></div>
              <div className="flex justify-between text-muted"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-700"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
              <div className="mt-1 flex justify-between border-t border-beige pt-2 font-display font-extrabold"><span>Grand Total</span><span>{formatCurrency(order.total)}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-beige bg-white p-5">
            <h2 className="mb-3 font-display font-bold">Order Timeline</h2>
            <div className="flex flex-col gap-4">
              {STATUS_FLOW.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  {i <= currentIdx ? <CheckCircle2 className="text-chilli" size={20} /> : <Circle className="text-beige" size={20} />}
                  <span className={i <= currentIdx ? "font-medium" : "text-muted"}>{STATUS_LABEL[s]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-beige bg-white p-5">
            <h2 className="mb-3 font-display font-bold">Customer</h2>
            <p className="font-semibold">{order.customerName}</p>
            <p className="text-sm text-muted">{order.phone}</p>
            {order.email && <p className="text-sm text-muted">{order.email}</p>}
            <p className="mt-3 text-sm"><span className="font-medium">Address: </span>{order.address}</p>
            {order.notes && <p className="mt-2 text-sm text-muted"><span className="font-medium text-charcoal">Notes: </span>{order.notes}</p>}
            <p className="mt-2 text-sm"><span className="font-medium">Payment: </span>{order.paymentMethod}</p>
          </div>

          <div className="rounded-2xl border border-beige bg-white p-5">
            <h2 className="mb-3 font-display font-bold">Actions</h2>
            <div className="flex flex-col gap-2">
              {nextActionLabel(order.status) && (
                <button onClick={advance} className="btn-primary w-full">{nextActionLabel(order.status)}</button>
              )}
              {!["DELIVERED", "CANCELLED"].includes(order.status) && (
                <button onClick={cancelOrder} className="w-full rounded-full border-2 border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Cancel Order
                </button>
              )}
              <button onClick={() => window.print()} className="w-full rounded-full border-2 border-beige py-2.5 text-sm font-semibold hover:border-chilli">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

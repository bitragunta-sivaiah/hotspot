"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useAppData } from "@/lib/data-store";
import EmptyState from "@/components/EmptyState";
import { formatCurrency } from "@/lib/utils";
import { restaurantData } from "@/data/restaurantData";

export default function CartPage() {
  const { lines, updateQty, removeFromCart, subtotal } = useCart();
  const { menu } = useAppData();

  if (lines.length === 0) {
    return <EmptyState title="YOUR CART IS WAITING 🔥" subtitle="Add something delicious to get started." emoji="🛒" ctaLabel="Explore Menu" ctaHref="/menu" />;
  }

  const { deliveryFee: baseDelivery, freeDeliveryThreshold, taxPercent } = restaurantData.deliverySettings;
  const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : baseDelivery;
  const tax = Math.round(subtotal * (taxPercent / 100));
  const discount = subtotal > 500 ? 50 : 0;
  const total = subtotal + deliveryFee + tax - discount;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const recommended = menu.filter((m) => ["garlic-naan", "gulab-jamun"].includes(m.slug));

  return (
    <div className="container-hs grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 font-display text-2xl font-extrabold">Your Cart</h1>
        <div className="flex flex-col gap-4">
          {lines.map((l) => (
            <div key={`${l.itemId}-${l.customisations?.join(",")}`} className="flex gap-4 rounded-2xl border border-beige bg-white p-3 shadow-sm">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-beige">
                <Image src={l.image} alt={l.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold">{l.name}</p>
                {l.customisations && l.customisations.length > 0 && (
                  <p className="text-xs text-muted">{l.customisations.join(" · ")}</p>
                )}
                <p className="mt-1 font-display font-bold text-chilli">{formatCurrency(l.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(l.itemId, l.customisations)} aria-label="Remove" className="text-muted hover:text-chilli">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 rounded-full bg-beige px-2 py-1">
                  <button onClick={() => updateQty(l.itemId, l.qty - 1, l.customisations)}>
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">{l.qty}</span>
                  <button onClick={() => updateQty(l.itemId, l.qty + 1, l.customisations)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommended.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 font-display font-bold">You might also like</h3>
            <div className="flex gap-4 overflow-x-auto">
              {recommended.map((r) => (
                <div key={r.id} className="flex w-40 shrink-0 flex-col rounded-xl border border-beige bg-white p-2">
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-beige">
                    <Image src={r.image} alt={r.name} fill className="object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-semibold">{r.name}</p>
                  <p className="text-sm font-bold text-chilli">{formatCurrency(r.price)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-fit rounded-2xl border border-beige bg-white p-5 shadow-card">
        {remainingForFree > 0 ? (
          <div className="mb-5">
            <p className="mb-2 text-sm font-semibold">
              You're {formatCurrency(remainingForFree)} away from free delivery.
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-beige">
              <div className="h-full rounded-full bg-saffron transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <p className="mb-5 text-sm font-semibold text-green-700">🎉 You've unlocked free delivery!</p>
        )}

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Tax</span><span>{formatCurrency(tax)}</span></div>
          {discount > 0 && <div className="flex justify-between text-green-700"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
          <div className="mt-2 flex justify-between border-t border-beige pt-2 font-display text-base font-extrabold">
            <span>Total</span><span>{formatCurrency(total)}</span>
          </div>
        </div>

        <Link href="/checkout" className="btn-primary mt-5 w-full">PROCEED TO CHECKOUT</Link>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Minus, Plus, Flame } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/lib/toast-store";
import { VegBadge } from "@/components/Badges";
import { formatCurrency } from "@/lib/utils";
import { SpiceLevel } from "@/lib/types";
import EmptyState from "@/components/EmptyState";

export default function ItemDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { menu } = useAppData();
  const { addToCart } = useCart();
  const { show } = useToast();
  const item = menu.find((m) => m.slug === params.slug);

  const [qty, setQty] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>(item?.spiceLevel ?? "Medium");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOnTotal = useMemo(() => {
    if (!item?.addOns) return 0;
    return item.addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
  }, [item, selectedAddOns]);

  if (!item) {
    return <EmptyState title="ITEM NOT FOUND" subtitle="This dish may have been removed from the menu." emoji="🍽️" ctaLabel="Back to Menu" ctaHref="/menu" />;
  }

  const unitPrice = (item.discountPrice ?? item.price) + addOnTotal;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleAdd = () => {
    const customisations = [
      ...(item.addOns ?? []).filter((a) => selectedAddOns.includes(a.id)).map((a) => a.name),
      `Spice: ${spice}`,
    ];
    addToCart({
      itemId: item.id,
      name: item.name,
      price: unitPrice,
      image: item.image,
      qty,
      customisations,
      spiceLevel: spice,
    });
    show(`${item.name} added to cart`);
    router.push("/cart");
  };

  return (
    <div className="container-hs grid gap-10 py-10 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-beige shadow-card">
        <Image src={item.image} alt={item.name} fill className="object-cover" priority />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-3xl font-extrabold">{item.name}</h1>
          <VegBadge isVeg={item.isVeg} />
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-semibold">
            <Star size={16} className="fill-saffron text-saffron" /> {item.rating.toFixed(1)}
          </span>
          {item.spiceLevel && (
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Flame size={14} /> {item.spiceLevel}
            </span>
          )}
          {item.bestseller && <span className="badge bg-chilli text-cream">Bestseller</span>}
        </div>
        <p className="mt-4 text-2xl font-display font-extrabold text-chilli">{formatCurrency(unitPrice)}</p>
        <p className="mt-3 text-muted">{item.description}</p>

        {item.ingredients && (
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-charcoal">Ingredients: </span>
            {item.ingredients.join(", ")}
          </p>
        )}

        {item.addOns && item.addOns.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 font-display font-bold">Customisations</h3>
            <div className="flex flex-col gap-2">
              {item.addOns.map((a) => (
                <label key={a.id} className="flex cursor-pointer items-center justify-between rounded-xl border border-beige px-4 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(a.id)}
                      onChange={() => toggleAddOn(a.id)}
                      className="accent-chilli"
                    />
                    {a.name}
                  </span>
                  <span className="font-semibold">+{formatCurrency(a.price)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="mb-2 font-display font-bold">Spice Level</h3>
          <div className="flex gap-2">
            {(["Mild", "Medium", "Spicy"] as SpiceLevel[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpice(s)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  spice === s ? "border-chilli bg-chilli text-cream" : "border-beige hover:border-chilli"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-beige px-3 py-2">
            <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Minus size={16} />
            </button>
            <span className="w-4 text-center font-semibold">{qty}</span>
            <button aria-label="Increase" onClick={() => setQty((q) => q + 1)}>
              <Plus size={16} />
            </button>
          </div>
          <button onClick={handleAdd} disabled={!item.available} className="btn-primary flex-1 disabled:opacity-40">
            {item.available ? `Add to Cart · ${formatCurrency(unitPrice * qty)}` : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

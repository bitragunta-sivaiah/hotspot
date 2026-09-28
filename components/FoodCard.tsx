"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/lib/toast-store";
import { VegBadge, RatingStars, Pill } from "@/components/Badges";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FoodCard({ item }: { item: MenuItem }) {
  const { lines, addToCart, updateQty } = useCart();
  const { show } = useToast();
  const line = lines.find((l) => l.itemId === item.id && !l.customisations?.length);
  const qty = line?.qty ?? 0;

  const handleAdd = () => {
    addToCart({ itemId: item.id, name: item.name, price: item.discountPrice ?? item.price, image: item.image, qty: 1 });
    show(`${item.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-beige bg-white shadow-sm transition hover:shadow-card"
    >
      <Link href={`/item/${item.slug}`} className="relative block aspect-[5/4] overflow-hidden bg-beige">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 text-cream font-display font-semibold text-sm">
            Currently Unavailable
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.bestseller && <Pill tone="chilli">Bestseller</Pill>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/item/${item.slug}`} className="font-display font-semibold text-sm leading-snug hover:text-chilli">
            {item.name}
          </Link>
          <VegBadge isVeg={item.isVeg} />
        </div>
        <p className="line-clamp-2 text-xs text-muted">{item.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <RatingStars rating={item.rating} />
          <span className="font-display font-bold text-chilli">{formatCurrency(item.discountPrice ?? item.price)}</span>
        </div>
        <div className="mt-2">
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              disabled={!item.available}
              className="w-full rounded-full border-2 border-chilli py-1.5 text-sm font-display font-bold text-chilli transition hover:bg-chilli hover:text-cream disabled:opacity-40 disabled:pointer-events-none"
            >
              ADD
            </button>
          ) : (
            <div className="flex w-full items-center justify-between rounded-full bg-chilli px-3 py-1.5 text-cream">
              <button aria-label="Decrease" onClick={() => updateQty(item.id, qty - 1)}>
                <Minus size={16} />
              </button>
              <span className="font-semibold text-sm">{qty}</span>
              <button aria-label="Increase" onClick={() => updateQty(item.id, qty + 1)}>
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

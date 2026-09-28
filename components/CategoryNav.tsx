"use client";
import Link from "next/link";
import { useAppData } from "@/lib/data-store";
import { cn } from "@/lib/utils";

export default function CategoryNav({ active }: { active?: string }) {
  const { categories } = useAppData();
  return (
    <div className="no-scrollbar container-hs flex gap-3 overflow-x-auto py-4">
      {categories.filter((c) => c.visible).sort((a, b) => a.order - b.order).map((c) => (
        <Link
          key={c.id}
          href={`/menu/${c.id}`}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-display font-semibold transition",
            active === c.id
              ? "border-chilli bg-chilli text-cream"
              : "border-beige bg-white text-charcoal hover:border-chilli"
          )}
        >
          <span>{c.emoji}</span>
          {c.name}
        </Link>
      ))}
    </div>
  );
}

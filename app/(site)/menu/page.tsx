"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useAppData } from "@/lib/data-store";
import FoodCard from "@/components/FoodCard";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";

type Filter = "veg" | "nonveg" | "bestseller" | "spicy";

export default function MenuPage() {
  const { menu, categories } = useAppData();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);

  const toggleFilter = (f: Filter) =>
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      if (query && !`${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.includes("veg") && !item.isVeg) return false;
      if (filters.includes("nonveg") && item.isVeg) return false;
      if (filters.includes("bestseller") && !item.bestseller) return false;
      if (filters.includes("spicy") && item.spiceLevel !== "Spicy") return false;
      return true;
    });
  }, [menu, query, filters]);

  const visibleCategories = categories.filter((c) => c.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="container-hs py-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">OUR MENU</h1>
      </div>

      <div className="mx-auto mb-6 flex max-w-xl items-center gap-2 rounded-full border border-beige bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search biryani, chicken, paneer…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="no-scrollbar mb-8 flex justify-center gap-2 overflow-x-auto">
        {(["veg", "nonveg", "bestseller", "spicy"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-display font-semibold uppercase transition",
              filters.includes(f) ? "border-chilli bg-chilli text-cream" : "border-beige bg-white hover:border-chilli"
            )}
          >
            {f === "nonveg" ? "Non-Veg" : f}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="no-scrollbar hidden lg:flex lg:flex-col lg:gap-1 lg:sticky lg:top-24 lg:self-start">
          {visibleCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-beige">
              {c.emoji} {c.name}
            </a>
          ))}
        </aside>

        <div>
          {filtered.length === 0 ? (
            <EmptyState title="NOTHING FOUND" subtitle="Try searching for another dish." emoji="🔍" />
          ) : (
            visibleCategories.map((cat) => {
              const items = filtered.filter((i) => i.category === cat.id);
              if (items.length === 0) return null;
              return (
                <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-24">
                  <h2 className="mb-4 font-display text-xl font-bold">
                    {cat.emoji} {cat.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                      <FoodCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

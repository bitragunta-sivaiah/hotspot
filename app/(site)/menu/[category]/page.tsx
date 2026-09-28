"use client";
import { useAppData } from "@/lib/data-store";
import CategoryNav from "@/components/CategoryNav";
import FoodCard from "@/components/FoodCard";
import EmptyState from "@/components/EmptyState";
import { useParams } from "next/navigation";

export default function CategoryMenuPage() {
  const params = useParams<{ category: string }>();
  const { menu, categories } = useAppData();
  const category = categories.find((c) => c.id === params.category);
  const items = menu.filter((i) => i.category === params.category);

  return (
    <div>
      <CategoryNav active={params.category} />
      <div className="container-hs py-8">
        <h1 className="mb-6 font-display text-2xl font-extrabold">
          {category ? `${category.emoji} ${category.name}` : "Menu"}
        </h1>
        {items.length === 0 ? (
          <EmptyState title="NOTHING FOUND" subtitle="Try another category." emoji="🍽️" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

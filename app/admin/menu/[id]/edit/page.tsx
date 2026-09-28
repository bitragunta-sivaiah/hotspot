"use client";
import { useParams } from "next/navigation";
import { useAppData } from "@/lib/data-store";
import MenuItemForm from "@/components/admin/MenuItemForm";
import EmptyState from "@/components/EmptyState";

export default function EditMenuItemPage() {
  const params = useParams<{ id: string }>();
  const { menu } = useAppData();
  const item = menu.find((m) => m.id === params.id);

  if (!item) {
    return <EmptyState title="ITEM NOT FOUND" subtitle="This menu item doesn't exist." emoji="🍽️" ctaLabel="Back to Menu" ctaHref="/admin/menu" />;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-extrabold">Edit Menu Item</h1>
      <MenuItemForm initial={item} />
    </div>
  );
}

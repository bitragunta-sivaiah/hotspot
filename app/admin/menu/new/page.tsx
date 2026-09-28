import MenuItemForm from "@/components/admin/MenuItemForm";

export default function NewMenuItemPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-extrabold">Add Menu Item</h1>
      <MenuItemForm />
    </div>
  );
}

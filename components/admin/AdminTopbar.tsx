"use client";
import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { adminNotifications } from "@/data/customerData";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-beige bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-beige lg:hidden">
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-beige bg-cream px-3 py-1.5 text-sm text-muted sm:flex">
          <Search size={16} />
          <span>Search orders, menu, customers…</span>
          <kbd className="ml-4 rounded border border-beige bg-white px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
        </div>
      </div>

      <div className="relative">
        <button onClick={() => setOpen((o) => !o)} className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-beige">
          <Bell size={19} />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-chilli" />
        </button>
        {open && (
          <div className="absolute right-0 top-11 w-80 rounded-xl border border-beige bg-white p-2 shadow-card">
            <p className="px-2 py-1.5 text-xs font-bold uppercase text-muted">Notifications</p>
            {adminNotifications.map((n) => (
              <div key={n.id} className="rounded-lg px-2 py-2 text-sm hover:bg-cream">
                <p className="font-semibold">{n.title}</p>
                <p className="text-xs text-muted">{n.detail}</p>
                <p className="text-[11px] text-muted/70">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

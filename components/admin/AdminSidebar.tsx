"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, LayoutGrid, Users,
  BarChart3, Wallet, Tag, Star, Settings, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/lib/data-store";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/revenue", label: "Revenue", icon: Wallet },
  { href: "/admin/offers", label: "Offers", icon: Tag },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutAdmin } = useAppData();

  return (
    <div className="flex h-full w-64 flex-col bg-charcoal text-cream">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="HOTSPOT" width={110} height={30} className="brightness-0 invert" />
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden"><X size={20} /></button>
        )}
      </div>
      <p className="px-5 pb-4 text-[11px] font-bold uppercase tracking-widest text-cream/40">Admin Panel</p>

      <nav className="flex-1 overflow-y-auto px-3">
        {NAV.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onClose}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "bg-chilli text-cream" : "text-cream/70 hover:bg-white/5 hover:text-cream"
              )}
            >
              <n.icon size={18} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => { logoutAdmin(); router.push("/admin/login"); }}
        className="m-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-cream/70 hover:bg-white/5 hover:text-cream"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

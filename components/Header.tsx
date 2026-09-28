"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-beige bg-cream/95 backdrop-blur transition-all",
        scrolled ? "py-1 shadow-sm" : "py-3"
      )}
    >
      <div className="container-hs flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="HOTSPOT" width={140} height={38} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-semibold text-charcoal">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-chilli">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button aria-label="Search" className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-beige transition">
            <Search size={20} />
          </button>
          <Link href="/orders" aria-label="Account" className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-beige transition">
            <User size={20} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative grid place-items-center h-10 w-10 rounded-full hover:bg-beige transition">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-chilli text-[11px] font-bold text-cream">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            className="md:hidden grid place-items-center h-10 w-10 rounded-full hover:bg-beige transition"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-72 bg-cream p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Image src="/logo.svg" alt="HOTSPOT" width={120} height={32} />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-5 font-display text-lg font-semibold">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}>
                    {n.label}
                  </Link>
                ))}
                <Link href="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

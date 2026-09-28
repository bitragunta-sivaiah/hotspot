"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  Home, 
  Utensils, 
  Tag, 
  Info, 
  PhoneCall, 
  Package, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: Utensils },
  { href: "/offers", label: "Offers", icon: Tag, badge: "Hot" },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: PhoneCall },
];

export default function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Client-side hydration check for Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Track page scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FAST + SMOOTH ANIMATION VARIANTS
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "tween",
        ease: [0.22, 1, 0.36, 1], // Buttery smooth decelerating ease
        duration: 0.35,           // Fast overall duration
        when: "beforeChildren",
        staggerChildren: 0.04,    // Very fast stagger
      },
    },
    exit: {
      x: "100%",
      transition: { 
        type: "tween", 
        ease: [0.32, 0, 0.67, 0], // Accelerating ease-in for quick exit
        duration: 0.25 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 }, // Shorter travel distance feels faster
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.25
      }
    },
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-beige bg-cream/95 backdrop-blur transition-all duration-200",
          scrolled ? "py-2 shadow-sm" : "py-3.5"
        )}
      >
        <div className="container-hs flex items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0 transition hover:opacity-90">
            <Image src="/logo.svg" alt="HOTSPOT" width={130} height={35} priority className="h-8 w-auto md:h-9" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 font-display text-sm font-semibold text-charcoal">
            {NAV.map((n) => {
              const isActive = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "relative py-1 transition-colors hover:text-chilli",
                    isActive ? "text-chilli font-bold" : "text-charcoal"
                  )}
                >
                  {n.label}
                  {n.badge && (
                    <span className="ml-1.5 rounded-full bg-chilli/10 px-1.5 py-0.5 text-[10px] font-bold text-chilli uppercase tracking-wider">
                      {n.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-chilli"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }} // Snappier desktop indicator
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              className="hidden sm:grid place-items-center h-10 w-10 rounded-full text-charcoal hover:bg-beige/80 transition"
            >
              <Search size={20} />
            </button>

            <Link
              href="/orders"
              aria-label="Account"
              className="hidden sm:grid place-items-center h-10 w-10 rounded-full text-charcoal hover:bg-beige/80 transition"
            >
              <User size={20} />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative grid place-items-center h-10 w-10 rounded-full text-charcoal hover:bg-beige/80 transition"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-[20px] px-1 place-items-center rounded-full bg-chilli text-[11px] font-bold text-cream shadow-sm">
                  {count}
                </span>
              )}
            </Link>

            <button
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
              className="md:hidden grid place-items-center h-10 w-10 rounded-full text-charcoal hover:bg-beige/80 transition active:scale-95"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Portaled directly to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} // Fast fade for backdrop
                className="fixed inset-0 z-[9999] bg-charcoal/50 backdrop-blur-sm md:hidden"
                onClick={() => setMobileOpen(false)}
              >
                <motion.div
                  variants={drawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-cream shadow-2xl flex flex-col justify-between overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="flex items-center justify-between p-5 border-b border-beige/60">
                      <Image src="/logo.svg" alt="HOTSPOT" width={110} height={30} className="h-7 w-auto" />
                      <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="grid place-items-center h-9 w-9 rounded-full bg-beige/50 text-charcoal hover:bg-beige transition active:scale-90"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="p-4 pb-2">
                      <div className="relative flex items-center">
                        <Search className="absolute left-3 h-4 w-4 text-charcoal/50" />
                        <input
                          type="text"
                          placeholder="Search menu or offers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full rounded-xl bg-beige/40 py-2.5 pl-9 pr-4 text-sm text-charcoal placeholder-charcoal/50 outline-none focus:ring-2 focus:ring-chilli/30 border border-transparent focus:border-chilli/20 transition"
                        />
                      </div>
                    </div>

                    <nav className="p-4 space-y-1.5 font-display">
                      {NAV.map((n) => {
                        const Icon = n.icon;
                        const isActive = pathname === n.href;

                        return (
                          <motion.div key={n.href} variants={itemVariants}>
                            <Link
                              href={n.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all active:scale-[0.98]",
                                isActive
                                  ? "bg-chilli text-cream shadow-md shadow-chilli/20"
                                  : "text-charcoal hover:bg-beige/60"
                              )}
                            >
                              <div className="flex items-center gap-3.5">
                                <Icon size={20} className={isActive ? "text-cream" : "text-charcoal/70"} />
                                <span>{n.label}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                {n.badge && !isActive && (
                                  <span className="flex items-center gap-1 rounded-full bg-chilli/10 px-2 py-0.5 text-[10px] font-bold text-chilli uppercase">
                                    <Sparkles size={10} />
                                    {n.badge}
                                  </span>
                                )}
                                <ChevronRight
                                  size={16}
                                  className={cn(
                                    "transition-transform",
                                    isActive ? "text-cream" : "text-charcoal/40"
                                  )}
                                />
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>

                    <div className="px-4 py-2">
                      <div className="border-t border-beige/60 my-2" />
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/orders"
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-charcoal hover:bg-beige/60 transition active:scale-[0.98]",
                            pathname === "/orders" && "bg-beige/80 text-chilli"
                          )}
                        >
                          <div className="flex items-center gap-3.5">
                            <Package size={20} className="text-charcoal/70" />
                            <span>My Orders</span>
                          </div>
                          <ChevronRight size={16} className="text-charcoal/40" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div variants={itemVariants} className="p-4 border-t border-beige/60 bg-cream/50 space-y-3">
                    <Link
                      href="/cart"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-charcoal text-cream font-semibold text-sm hover:bg-charcoal/90 transition shadow-sm active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingCart size={18} />
                        <span>View Shopping Cart</span>
                      </div>
                      {count > 0 && (
                        <span className="rounded-full bg-chilli px-2 py-0.5 text-xs font-bold text-cream">
                          {count} {count === 1 ? "item" : "items"}
                        </span>
                      )}
                    </Link>

                    <p className="text-center text-[11px] text-charcoal/50">
                      © HOTSPOT Foods • Fresh & Hot
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
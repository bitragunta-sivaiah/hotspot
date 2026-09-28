"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartLine } from "@/lib/types";

const CART_KEY = "hotspot_cart_v1";

interface CartContextValue {
  lines: CartLine[];
  addToCart: (line: CartLine) => void;
  updateQty: (itemId: string, qty: number, customisations?: string[]) => void;
  removeFromCart: (itemId: string, customisations?: string[]) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(itemId: string, customisations?: string[]) {
  return `${itemId}::${(customisations ?? []).join(",")}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const addToCart = (line: CartLine) => {
    setLines((prev) => {
      const key = lineKey(line.itemId, line.customisations);
      const existing = prev.find((l) => lineKey(l.itemId, l.customisations) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.itemId, l.customisations) === key ? { ...l, qty: l.qty + line.qty } : l
        );
      }
      return [...prev, line];
    });
  };

  const updateQty = (itemId: string, qty: number, customisations?: string[]) => {
    setLines((prev) => {
      const key = lineKey(itemId, customisations);
      if (qty <= 0) return prev.filter((l) => lineKey(l.itemId, l.customisations) !== key);
      return prev.map((l) => (lineKey(l.itemId, l.customisations) === key ? { ...l, qty } : l));
    });
  };

  const removeFromCart = (itemId: string, customisations?: string[]) => {
    const key = lineKey(itemId, customisations);
    setLines((prev) => prev.filter((l) => lineKey(l.itemId, l.customisations) !== key));
  };

  const clearCart = () => setLines([]);

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.qty * l.price, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, addToCart, updateQty, removeFromCart, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

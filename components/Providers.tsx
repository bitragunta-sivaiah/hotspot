"use client";
import React from "react";
import { CartProvider } from "@/lib/cart-store";
import { DataProvider } from "@/lib/data-store";
import { ToastProvider } from "@/lib/toast-store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <CartProvider>
        <ToastProvider>{children}</ToastProvider>
      </CartProvider>
    </DataProvider>
  );
}

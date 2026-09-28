"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem, Category, Order, OrderStatus } from "@/lib/types";
import { menuItems as seedMenu } from "@/data/menuData";
import { categories as seedCategories } from "@/data/categoryData";
import { seedOrders } from "@/data/orderData";
import { generateOrderId } from "@/lib/utils";

const MENU_KEY = "hotspot_menu_v1";
const CATEGORY_KEY = "hotspot_categories_v1";
const ORDERS_KEY = "hotspot_orders_v1";
const AUTH_KEY = "hotspot_admin_auth_v1";

interface DataContextValue {
  menu: MenuItem[];
  categories: Category[];
  orders: Order[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleAvailability: (id: string) => void;
  toggleBestseller: (id: string) => void;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addCategory: (cat: Category) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function loadOrSeed<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seed;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<MenuItem[]>(seedMenu);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMenu(loadOrSeed(MENU_KEY, seedMenu));
    setCategories(loadOrSeed(CATEGORY_KEY, seedCategories));
    setOrders(loadOrSeed(ORDERS_KEY, seedOrders));
    try {
      setIsAdminLoggedIn(localStorage.getItem(AUTH_KEY) === "true");
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(MENU_KEY, JSON.stringify(menu)); }, [menu, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories)); }, [categories, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [orders, hydrated]);

  const addMenuItem = (item: MenuItem) => setMenu((prev) => [item, ...prev]);
  const updateMenuItem = (id: string, patch: Partial<MenuItem>) =>
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  const deleteMenuItem = (id: string) => setMenu((prev) => prev.filter((m) => m.id !== id));
  const toggleAvailability = (id: string) =>
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m)));
  const toggleBestseller = (id: string) =>
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, bestseller: !m.bestseller } : m)));

  const placeOrder = (orderInput: Omit<Order, "id" | "createdAt" | "status">) => {
    const order: Order = {
      ...orderInput,
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "PENDING",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const addCategory = (cat: Category) => setCategories((prev) => [...prev, cat]);
  const updateCategory = (id: string, patch: Partial<Category>) =>
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const deleteCategory = (id: string) => setCategories((prev) => prev.filter((c) => c.id !== id));

  const loginAdmin = (email: string, password: string) => {
    const ok = email === "admin@hotspot.demo" && password === "hotspot123";
    if (ok) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch {}
    }
    return ok;
  };
  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  return (
    <DataContext.Provider
      value={{
        menu,
        categories,
        orders,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        toggleBestseller,
        placeOrder,
        updateOrderStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useAppData must be used within DataProvider");
  return ctx;
}

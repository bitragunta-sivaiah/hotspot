import { Customer, Offer, Review, AdminNotification } from "@/lib/types";

export const customers: Customer[] = [
  { id: "cu1", name: "Rahul Kumar", phone: "+91 90000 00001", ordersCount: 18, totalSpent: 8420, lastOrder: "Today", status: "Active" as any },
  { id: "cu2", name: "Sneha Reddy", phone: "+91 90000 00002", ordersCount: 6, totalSpent: 2840, lastOrder: "Today", status: "Returning" as any },
  { id: "cu3", name: "Priya Sharma", phone: "+91 90000 00003", ordersCount: 24, totalSpent: 12680, lastOrder: "Yesterday", status: "VIP" as any },
  { id: "cu4", name: "Arjun Rao", phone: "+91 90000 00004", ordersCount: 2, totalSpent: 874, lastOrder: "2 days ago", status: "New" as any },
  { id: "cu5", name: "Kavya Nair", phone: "+91 90000 00005", ordersCount: 1, totalSpent: 329, lastOrder: "3 weeks ago", status: "Inactive" as any },
];

export const offers: Offer[] = [
  { id: "o1", name: "Biryani Combo", description: "Chicken Biryani + Chicken 65 + Soft Drink", discountPercent: 15, couponCode: "COMBO15", startDate: "2026-01-01", endDate: "2026-12-31", minOrder: 0, categories: ["biryani"], usageLimit: 500, active: true },
  { id: "o2", name: "Family Feast", description: "Chicken Biryani, Paneer Curry, Chicken 65, 4 Naan, 2 Drinks", discountPercent: 10, couponCode: "FAMILY10", startDate: "2026-01-01", endDate: "2026-12-31", minOrder: 0, categories: ["biryani", "curries"], usageLimit: 300, active: true },
  { id: "o3", name: "Lunch Special", description: "Biryani + Drink for lunch hours", discountPercent: 12, couponCode: "LUNCH12", startDate: "2026-01-01", endDate: "2026-12-31", minOrder: 0, categories: ["biryani"], usageLimit: 1000, active: true },
];

export const reviews: Review[] = [
  { id: "rv1", customer: "Rahul Kumar", rating: 5, text: "Great biryani, tastes homemade and generous portions!", date: "2026-09-20", status: "Published" },
  { id: "rv2", customer: "Sneha Reddy", rating: 4, text: "Butter chicken was rich and delicious, delivery was quick.", date: "2026-09-21", status: "Published" },
  { id: "rv3", customer: "Priya Sharma", rating: 5, text: "Best mutton biryani in Vijayawada, hands down.", date: "2026-09-22", status: "Published" },
  { id: "rv4", customer: "Arjun Rao", rating: 3, text: "Good food but delivery took longer than expected.", date: "2026-09-23", status: "Hidden" },
];

export const adminNotifications: AdminNotification[] = [
  { id: "n1", type: "order", title: "New order received", detail: "Order HS10248 · ₹649", time: "2 minutes ago" },
  { id: "n2", type: "stock", title: "Low-stock item", detail: "Chicken 65 · Only 8 portions remaining", time: "20 minutes ago" },
  { id: "n3", type: "review", title: "New review", detail: "★★★★★ \"Great biryani!\"", time: "1 hour ago" },
];

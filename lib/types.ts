export type SpiceLevel = "Mild" | "Medium" | "Spicy";

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string; // category id
  price: number;
  discountPrice?: number;
  image: string;
  isVeg: boolean;
  spiceLevel?: SpiceLevel;
  prepTimeMins: number;
  calories?: number;
  ingredients?: string[];
  rating: number;
  available: boolean;
  bestseller: boolean;
  featured: boolean;
  addOns?: AddOn[];
  ordersCount: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  visible: boolean;
  order: number;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  qty: number;
  customisations?: string[];
  spiceLevel?: SpiceLevel;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "COD" | "UPI" | "CARD" | "DEMO";
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
  status: "New" | "Returning" | "VIP" | "Inactive";
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  discountPercent: number;
  couponCode: string;
  startDate: string;
  endDate: string;
  minOrder: number;
  categories: string[];
  usageLimit: number;
  active: boolean;
}

export interface Review {
  id: string;
  customer: string;
  rating: number;
  text: string;
  date: string;
  status: "Published" | "Hidden";
}

export interface AdminNotification {
  id: string;
  type: "order" | "stock" | "review";
  title: string;
  detail: string;
  time: string;
}

export interface CartLine {
  itemId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  customisations?: string[];
  spiceLevel?: SpiceLevel;
}

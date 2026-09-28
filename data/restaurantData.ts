export const restaurantData = {
  name: "HOTSPOT",
  tagline: "Flavour that brings you back.",
  phone: "+91 98765 43210",
  email: "hello@hotspotrestaurant.in",
  address: "Main Road, Vijayawada, Andhra Pradesh",
  openingHours: "Mon–Sun · 11:00 AM – 11:00 PM",
  social: { instagram: "#", facebook: "#", youtube: "#" },
  stats: { years: "8+", menuItems: "50+", ordersServed: "10K+", rating: "4.8/5" },
  deliverySettings: {
    minimumOrder: 149,
    deliveryFee: 40,
    freeDeliveryThreshold: 799,
    taxPercent: 5,
  },
  paymentSettings: { upi: true, cash: true, card: true },
  operations: {
    acceptingOrders: true,
    autoAcceptOrders: false,
    estimatedPrepTimeMins: 25,
  },
  notificationSettings: { orderNotifications: true, sound: true, email: true, whatsapp: false },
};

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/lib/cart-store";
import { useAppData } from "@/lib/data-store";
import { useToast } from "@/lib/toast-store";
import { formatCurrency } from "@/lib/utils";
import { restaurantData } from "@/data/restaurantData";
import EmptyState from "@/components/EmptyState";
import { Banknote, Smartphone, CreditCard, Wallet } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  house: z.string().min(1, "Required"),
  street: z.string().min(1, "Required"),
  area: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  pincode: z.string().min(5, "Enter a valid pincode"),
  landmark: z.string().optional(),
  instructions: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const PAYMENTS = [
  { id: "COD", label: "Cash on Delivery", icon: Banknote },
  { id: "UPI", label: "UPI", icon: Smartphone },
  { id: "CARD", label: "Card", icon: CreditCard },
  { id: "DEMO", label: "Demo Payment", icon: Wallet },
] as const;

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const { placeOrder } = useAppData();
  const { show } = useToast();
  const router = useRouter();
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]["id"]>("UPI");
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (lines.length === 0) {
    return <EmptyState title="YOUR CART IS WAITING 🔥" subtitle="Add something before checking out." emoji="🛒" ctaLabel="Explore Menu" ctaHref="/menu" />;
  }

  const { deliveryFee: baseDelivery, freeDeliveryThreshold, taxPercent } = restaurantData.deliverySettings;
  const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : baseDelivery;
  const tax = Math.round(subtotal * (taxPercent / 100));
  const discount = subtotal > 500 ? 50 : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const onSubmit = (data: FormData) => {
    setSubmitting(true);
    const address = `${data.house}, ${data.street}, ${data.area}, ${data.city} - ${data.pincode}${data.landmark ? " (" + data.landmark + ")" : ""}`;
    setTimeout(() => {
      const order = placeOrder({
        customerName: data.fullName,
        phone: data.phone,
        email: data.email,
        address,
        items: lines.map((l) => ({ itemId: l.itemId, name: l.name, price: l.price, qty: l.qty, customisations: l.customisations, spiceLevel: l.spiceLevel })),
        subtotal,
        deliveryFee,
        tax,
        discount,
        total,
        paymentMethod: payment,
        notes: data.instructions,
      });
      clearCart();
      show("Order placed successfully!");
      router.push(`/order-success?orderId=${order.id}`);
    }, 700);
  };

  return (
    <div className="container-hs grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <section>
          <h2 className="mb-3 font-display text-lg font-bold">1 · Contact</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full Name" error={errors.fullName?.message}>
              <input {...register("fullName")} className="input" placeholder="Your name" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register("phone")} className="input" placeholder="+91 90000 00000" />
            </Field>
            <Field label="Email (optional)" error={errors.email?.message}>
              <input {...register("email")} className="input" placeholder="you@example.com" />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold">2 · Delivery Address</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="House / Flat" error={errors.house?.message}><input {...register("house")} className="input" /></Field>
            <Field label="Street" error={errors.street?.message}><input {...register("street")} className="input" /></Field>
            <Field label="Area" error={errors.area?.message}><input {...register("area")} className="input" /></Field>
            <Field label="City" error={errors.city?.message}><input {...register("city")} className="input" defaultValue="Vijayawada" /></Field>
            <Field label="Pincode" error={errors.pincode?.message}><input {...register("pincode")} className="input" /></Field>
            <Field label="Landmark (optional)"><input {...register("landmark")} className="input" /></Field>
          </div>
          <Field label="Delivery Instructions (optional)" className="mt-3">
            <textarea {...register("instructions")} className="input" rows={2} placeholder="e.g. Ring the bell twice" />
          </Field>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold">3 · Payment</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PAYMENTS.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setPayment(p.id)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-semibold transition ${
                  payment === p.id ? "border-chilli bg-chilli/5 text-chilli" : "border-beige hover:border-chilli"
                }`}
              >
                <p.icon size={20} />
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">This is a demo checkout. No real payment gateway is integrated.</p>
        </section>

        <button type="submit" disabled={submitting} className="btn-primary w-full lg:hidden">
          {submitting ? "Placing Order…" : `PLACE ORDER · ${formatCurrency(total)}`}
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-beige bg-white p-5 shadow-card">
        <h3 className="mb-3 font-display font-bold">Order Summary</h3>
        <div className="flex flex-col gap-2 text-sm">
          {lines.map((l) => (
            <div key={l.itemId} className="flex justify-between">
              <span>{l.name} × {l.qty}</span>
              <span>{formatCurrency(l.price * l.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2 border-t border-beige pt-3 text-sm">
          <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Tax</span><span>{formatCurrency(tax)}</span></div>
          {discount > 0 && <div className="flex justify-between text-green-700"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
          <div className="flex justify-between border-t border-beige pt-2 font-display text-base font-extrabold"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
        <button onClick={handleSubmit(onSubmit)} disabled={submitting} className="btn-primary mt-5 hidden w-full lg:flex">
          {submitting ? "Placing Order…" : "PLACE ORDER"}
        </button>
      </aside>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #F2E8DD;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          background: white;
        }
        .input:focus { outline: 2px solid #B5121B44; }
      `}</style>
    </div>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className ?? ""}`}>
      <span className="font-medium text-charcoal">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

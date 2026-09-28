import { offers } from "@/data/customerData";
import { Tag } from "lucide-react";

export default function OffersPage() {
  return (
    <div className="container-hs py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">HOT DEALS. HOT FLAVOURS.</h1>
        <p className="mt-2 text-muted">Grab these limited-time combos before they're gone.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div key={o.id} className="relative overflow-hidden rounded-2xl border border-beige bg-white p-6 shadow-card">
            <span className="badge bg-saffron/20 text-amber-800 absolute right-4 top-4">Limited Time</span>
            <Tag className="mb-3 text-chilli" size={22} />
            <h3 className="font-display text-xl font-extrabold">{o.name}</h3>
            <p className="mt-2 text-sm text-muted">{o.description}</p>
            <p className="mt-4 font-display text-2xl font-extrabold text-chilli">{o.discountPercent}% OFF</p>
            <p className="mt-1 text-xs text-muted">Use code <span className="font-bold text-charcoal">{o.couponCode}</span></p>
            <a href="/menu" className="btn-primary mt-5 w-full">ORDER NOW</a>
          </div>
        ))}
      </div>
    </div>
  );
}

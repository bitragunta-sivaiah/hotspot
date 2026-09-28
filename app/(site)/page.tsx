import Image from "next/image";
import Link from "next/link";
import { Flame, Star } from "lucide-react";
import CategoryNav from "@/components/CategoryNav";
import FoodCard from "@/components/FoodCard";
import { menuItems, getBestsellers } from "@/data/menuData";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const bestsellers = getBestsellers();
  const special = menuItems.find((m) => m.slug === "chicken-dum-biryani")!;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-beige to-cream">
        <div className="container-hs grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-24">
          <div className="animate-fade-up">
            <span className="badge bg-chilli/10 text-chilli mb-4">🔥 India's Boldest Flavours</span>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
              FLAVOUR THAT <span className="text-chilli">BRINGS YOU BACK.</span>
            </h1>
            <p className="mt-5 max-w-md text-muted">
              Bold Indian flavours, sizzling favourites and comfort food made fresh for every craving.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-primary">ORDER NOW</Link>
              <Link href="/menu" className="btn-secondary">EXPLORE MENU</Link>
            </div>

            <div className="mt-10 flex max-w-sm items-center gap-4 rounded-2xl border border-beige bg-white p-4 shadow-card">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-beige">
                <Image src={special.image} alt={special.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-chilli">🔥 Today's Special</span>
                <p className="font-display font-bold leading-tight">{special.name}</p>
                <p className="text-sm text-muted">Starting {formatCurrency(special.price)}</p>
              </div>
              <Link href={`/item/${special.slug}`} className="rounded-full bg-chilli px-3 py-2 text-xs font-bold text-cream">
                Order
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-chilli/10 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-card">
              <Image src={special.image} alt="HOTSPOT signature dish" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY NAV */}
      <CategoryNav />

      {/* BEST SELLERS */}
      <section className="container-hs py-14">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">CUSTOMER FAVOURITES</h2>
          <p className="mt-2 text-muted">The dishes our customers keep coming back for.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {bestsellers.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/menu" className="btn-secondary">VIEW FULL MENU</Link>
        </div>
      </section>

      {/* WHY HOTSPOT STRIP */}
      <section className="bg-charcoal py-14 text-cream">
        <div className="container-hs grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            ["8+", "Years"],
            ["50+", "Menu Items"],
            ["10K+", "Orders Served"],
            ["4.8/5", "Customer Rating"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-saffron">{stat}</p>
              <p className="mt-1 text-sm text-cream/70">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

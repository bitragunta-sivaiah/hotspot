import { Star } from "lucide-react";

export function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      className={`grid h-4 w-4 place-items-center border-2 rounded-sm ${
        isVeg ? "border-green-600" : "border-red-600"
      }`}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`} />
    </span>
  );
}

export function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal">
      <Star size={14} className="fill-saffron text-saffron" />
      {rating.toFixed(1)}
    </span>
  );
}

export function Pill({ children, tone = "chilli" }: { children: React.ReactNode; tone?: "chilli" | "saffron" | "muted" }) {
  const tones = {
    chilli: "bg-chilli text-cream",
    saffron: "bg-saffron/20 text-amber-800",
    muted: "bg-beige text-muted",
  } as const;
  return <span className={`badge ${tones[tone]}`}>{children}</span>;
}

"use client";
import { useState } from "react";
import { Star, Eye, EyeOff, Reply, Trash2 } from "lucide-react";
import { reviews as seedReviews } from "@/data/customerData";
import { Review } from "@/lib/types";
import { useToast } from "@/lib/toast-store";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const { show } = useToast();

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStarPct = Math.round((reviews.filter((r) => r.rating === 5).length / reviews.length) * 100);

  const togglePublish = (id: string) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === "Published" ? "Hidden" : "Published" } : r)));
  const remove = (id: string) => { setReviews((prev) => prev.filter((r) => r.id !== id)); show("Review deleted"); };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-extrabold">Reviews</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-beige bg-white p-5"><p className="text-sm text-muted">Average Rating</p><p className="font-display text-2xl font-extrabold">{avg}</p></div>
        <div className="rounded-2xl border border-beige bg-white p-5"><p className="text-sm text-muted">Total Reviews</p><p className="font-display text-2xl font-extrabold">2,486</p></div>
        <div className="rounded-2xl border border-beige bg-white p-5"><p className="text-sm text-muted">5-Star Percentage</p><p className="font-display text-2xl font-extrabold">{fiveStarPct}%</p></div>
      </div>

      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-beige bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{r.customer}</p>
              <span className={`badge ${r.status === "Published" ? "bg-green-50 text-green-700 border border-green-200" : "bg-beige text-muted"}`}>{r.status}</span>
            </div>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < r.rating ? "fill-saffron text-saffron" : "text-beige"} />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">{r.text}</p>
            <p className="mt-1 text-xs text-muted/70">{r.date}</p>
            <div className="mt-3 flex items-center gap-4 text-muted">
              <button onClick={() => togglePublish(r.id)} className="inline-flex items-center gap-1 text-xs font-semibold hover:text-chilli">
                {r.status === "Published" ? <EyeOff size={14}/> : <Eye size={14}/>} {r.status === "Published" ? "Hide" : "Publish"}
              </button>
              <button className="inline-flex items-center gap-1 text-xs font-semibold hover:text-chilli"><Reply size={14}/> Reply</button>
              <button onClick={() => remove(r.id)} className="ml-auto hover:text-red-600"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

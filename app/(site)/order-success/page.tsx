"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "HS10000";

  return (
    <div className="container-hs flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="grid h-24 w-24 place-items-center rounded-full bg-chilli/10"
      >
        <PartyPopper size={44} className="text-chilli" />
      </motion.div>
      <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">ORDER CONFIRMED 🔥</h1>
      <p className="mt-2 text-muted">Your HOTSPOT order has been received.</p>

      <div className="mt-6 rounded-2xl border border-beige bg-white px-8 py-4 shadow-card">
        <p className="text-xs uppercase tracking-wide text-muted">Order ID</p>
        <p className="font-display text-2xl font-extrabold text-chilli">{orderId}</p>
      </div>

      <p className="mt-4 text-sm text-muted">Estimated delivery: <span className="font-semibold text-charcoal">35–45 minutes</span></p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href={`/track-order/${orderId}`} className="btn-primary">TRACK ORDER</Link>
        <Link href="/menu" className="btn-secondary">CONTINUE ORDERING</Link>
      </div>
    </div>
  );
}

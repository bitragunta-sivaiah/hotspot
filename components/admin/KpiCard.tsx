import { ArrowUpRight, LucideIcon } from "lucide-react";

export default function KpiCard({
  label, value, change, icon: Icon, sub = "vs yesterday",
}: {
  label: string; value: string; change: string; icon: LucideIcon; sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-chilli/10 text-chilli"><Icon size={20} /></span>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
          <ArrowUpRight size={12} /> {change}
        </span>
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold">{value}</p>
      <p className="text-sm text-muted">{label} <span className="text-muted/60">· {sub}</span></p>
    </div>
  );
}

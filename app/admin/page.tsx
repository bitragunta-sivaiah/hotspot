"use client";
import { useState } from "react";
import { IndianRupee, ShoppingBag, Receipt, Users } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import KpiCard from "@/components/admin/KpiCard";
import { revenueByDay, ordersByStatus, categoryRevenue, topSellingItems, CHART_COLORS } from "@/data/analyticsData";
import { useAppData } from "@/lib/data-store";
import { STATUS_LABEL, STATUS_COLOR, nextStatus, nextActionLabel } from "@/lib/statusConfig";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { useToast } from "@/lib/toast-store";

const RANGES = ["Today", "Yesterday", "7 Days", "30 Days", "Custom"];

export default function AdminDashboardPage() {
  const [range, setRange] = useState("Today");
  const { orders, updateOrderStatus } = useAppData();
  const { show } = useToast();

  const liveOrders = orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status)).slice(0, 4);
  const recentOrders = orders.slice(0, 6);

  const advance = (id: string, current: any) => {
    const ns = nextStatus(current);
    if (ns) {
      updateOrderStatus(id, ns);
      show(`Order ${id} marked ${STATUS_LABEL[ns]}`);
    }
  };
  const cancel = (id: string) => {
    updateOrderStatus(id, "CANCELLED");
    show(`Order ${id} cancelled`, "error");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Good morning, Admin 👋</h1>
          <p className="text-sm text-muted">Here's what's happening with HOTSPOT today.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-beige bg-white p-1 text-sm">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-3 py-1.5 font-medium transition ${range === r ? "bg-chilli text-cream" : "text-muted hover:bg-beige"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Today's Revenue" value="₹48,620" change="+12.5%" icon={IndianRupee} />
        <KpiCard label="Orders" value="186" change="+8.4%" icon={ShoppingBag} />
        <KpiCard label="Average Order Value" value="₹261" change="+4.8%" icon={Receipt} />
        <KpiCard label="Customers" value="142" change="+11.2%" icon={Users} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 font-display font-bold">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueByDay}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B5121B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B5121B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip formatter={(v: number, name) => [name === "revenue" ? formatCurrency(v) : v, name === "revenue" ? "Revenue" : "Orders"]} />
              <Area type="monotone" dataKey="revenue" stroke="#B5121B" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display font-bold">Category Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryRevenue} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {categoryRevenue.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {categoryRevenue.map((c, i) => (
              <span key={c.name} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                {c.name} {c.value}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-display font-bold">Orders Overview</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ordersByStatus}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" stackId="a" fill="#16a34a" radius={[0,0,0,0]} />
            <Bar dataKey="Preparing" stackId="a" fill="#F59E0B" />
            <Bar dataKey="Pending" stackId="a" fill="#B5121B" />
            <Bar dataKey="Cancelled" stackId="a" fill="#6B625B" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display font-bold">Top Selling Items</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted">
                <th className="pb-2">#</th><th className="pb-2">Item</th><th className="pb-2">Orders</th><th className="pb-2">Revenue</th><th className="pb-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topSellingItems.map((t) => (
                <tr key={t.rank} className="border-t border-beige">
                  <td className="py-2.5 font-semibold">{t.rank}</td>
                  <td className="py-2.5">{t.item}</td>
                  <td className="py-2.5">{t.orders}</td>
                  <td className="py-2.5">{formatCurrency(t.revenue)}</td>
                  <td className="py-2.5 font-semibold text-green-600">↑ {t.trend}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display font-bold">Live Orders</h2>
          <div className="flex flex-col gap-3">
            {liveOrders.length === 0 && <p className="text-sm text-muted">No live orders right now.</p>}
            {liveOrders.map((o) => (
              <div key={o.id} className="rounded-xl border border-beige p-3">
                <div className="flex items-center justify-between">
                  <p className="font-display font-bold">{o.id}</p>
                  <span className={`badge border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                </div>
                <p className="text-xs text-muted">{o.customerName} · {o.items.length} items · {formatCurrency(o.total)}</p>
                <div className="mt-2 flex gap-2">
                  {nextActionLabel(o.status) && (
                    <button onClick={() => advance(o.id, o.status)} className="rounded-full bg-chilli px-3 py-1 text-xs font-semibold text-cream">
                      {nextActionLabel(o.status)}
                    </button>
                  )}
                  <button onClick={() => cancel(o.id)} className="rounded-full border border-beige px-3 py-1 text-xs font-semibold text-muted hover:border-red-300 hover:text-red-600">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-beige bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-display font-bold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted">
                <th className="pb-2">Order ID</th><th className="pb-2">Customer</th><th className="pb-2">Items</th>
                <th className="pb-2">Amount</th><th className="pb-2">Payment</th><th className="pb-2">Status</th><th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-beige">
                  <td className="py-2.5 font-semibold">{o.id}</td>
                  <td className="py-2.5">{o.customerName}</td>
                  <td className="py-2.5">{o.items.length} Items</td>
                  <td className="py-2.5">{formatCurrency(o.total)}</td>
                  <td className="py-2.5">{o.paymentMethod}</td>
                  <td className="py-2.5"><span className={`badge border ${STATUS_COLOR[o.status]}`}>{STATUS_LABEL[o.status]}</span></td>
                  <td className="py-2.5 text-muted">{timeAgo(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { useAppData } from "@/lib/data-store";
import { revenueByDay, categoryRevenue, paymentSplit, CHART_COLORS } from "@/data/analyticsData";
import { formatCurrency } from "@/lib/utils";

const RANGES = ["Today", "7 Days", "30 Days", "3 Months", "This Year", "Custom"];

export default function AdminRevenuePage() {
  const [range, setRange] = useState("7 Days");
  const { orders } = useAppData();

  const validOrders = orders.filter((o) => o.status !== "CANCELLED");
  const gross = validOrders.reduce((s, o) => s + o.subtotal, 0);
  const tax = validOrders.reduce((s, o) => s + o.tax, 0);
  const discounts = validOrders.reduce((s, o) => s + o.discount, 0);
  const delivery = validOrders.reduce((s, o) => s + o.deliveryFee, 0);
  const net = validOrders.reduce((s, o) => s + o.total, 0);
  const aov = validOrders.length ? net / validOrders.length : 0;

  const kpis = [
    ["Gross Revenue", formatCurrency(gross)],
    ["Net Revenue", formatCurrency(net)],
    ["Tax Collected", formatCurrency(tax)],
    ["Discounts Given", formatCurrency(discounts)],
    ["Delivery Revenue", formatCurrency(delivery)],
    ["Refunds", formatCurrency(0)],
    ["Average Order Value", formatCurrency(aov)],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold">Revenue Analytics</h1>
        <div className="flex flex-wrap gap-1 rounded-full border border-beige bg-white p-1 text-sm">
          {RANGES.map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-full px-3 py-1.5 font-medium transition ${range === r ? "bg-chilli text-cream" : "text-muted hover:bg-beige"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-beige bg-white p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Revenue by Day</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueByDay}>
              <defs>
                <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B5121B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B5121B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}K`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#B5121B" strokeWidth={2} fill="url(#rev2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryRevenue} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                {categoryRevenue.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Payment Method Split</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={paymentSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                {paymentSplit.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Orders by Day</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#F59E0B" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-beige bg-white p-5">
        <h2 className="mb-4 font-display font-bold">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-beige text-left text-xs uppercase text-muted">
                <th className="p-2">Transaction ID</th><th className="p-2">Order ID</th><th className="p-2">Customer</th>
                <th className="p-2">Method</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {validOrders.slice(0, 8).map((o, i) => (
                <tr key={o.id} className="border-b border-beige last:border-0">
                  <td className="p-2">TXN{1000 + i}</td>
                  <td className="p-2 font-medium">{o.id}</td>
                  <td className="p-2">{o.customerName}</td>
                  <td className="p-2">{o.paymentMethod}</td>
                  <td className="p-2">{formatCurrency(o.total)}</td>
                  <td className="p-2"><span className="badge bg-green-50 text-green-700 border border-green-200">Success</span></td>
                  <td className="p-2 text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

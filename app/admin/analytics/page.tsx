"use client";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { revenueByDay, hourlyOrders, categoryRevenue } from "@/data/analyticsData";
import { formatCurrency } from "@/lib/utils";

const dayOfWeekPerf = [
  { day: "Mon", score: 62 }, { day: "Tue", score: 68 }, { day: "Wed", score: 65 },
  { day: "Thu", score: 74 }, { day: "Fri", score: 82 }, { day: "Sat", score: 96 }, { day: "Sun", score: 88 },
];

const kpis = [
  ["Revenue (7d)", "₹2,93,000"],
  ["Orders (7d)", "1,015"],
  ["Average Order Value", "₹261"],
  ["Repeat Customers", "38%"],
  ["Cancellation Rate", "4.1%"],
  ["Conversion Rate", "3.2%"],
];

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-extrabold">Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-beige bg-white p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}K`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#B5121B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Order Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Hourly Order Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={1} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#B5121B" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-beige bg-white p-5">
          <h2 className="mb-4 font-display font-bold">Day-of-Week Performance</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dayOfWeekPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2E8DD" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#7F0D13" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-beige bg-chilli/5 p-5">
          <p className="text-xs font-bold uppercase text-chilli">Peak Order Time</p>
          <p className="mt-1 font-display text-xl font-extrabold">7:00 PM – 9:00 PM</p>
          <p className="text-sm text-muted">Average 42 orders/hour</p>
        </div>
        <div className="rounded-2xl border border-beige bg-white p-5">
          <p className="text-sm text-muted">Highest revenue day: <span className="font-semibold text-charcoal">Saturday</span></p>
          <p className="text-sm text-muted">Best-selling category: <span className="font-semibold text-charcoal">Biryani ({categoryRevenue[0].value}%)</span></p>
        </div>
      </div>
    </div>
  );
}

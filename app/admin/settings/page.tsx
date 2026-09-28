"use client";
import { useState } from "react";
import { restaurantData } from "@/data/restaurantData";
import { useToast } from "@/lib/toast-store";

export default function AdminSettingsPage() {
  const [form, setForm] = useState(restaurantData);
  const { show } = useToast();

  const save = (e: React.FormEvent) => { e.preventDefault(); show("Settings saved"); };

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-extrabold">Settings</h1>

      <Section title="Restaurant Information">
        <Grid>
          <F label="Restaurant Name"><input defaultValue={form.name} className="f-input3" /></F>
          <F label="Phone"><input defaultValue={form.phone} className="f-input3" /></F>
          <F label="Email"><input defaultValue={form.email} className="f-input3" /></F>
          <F label="Address"><input defaultValue={form.address} className="f-input3" /></F>
          <F label="Opening Hours"><input defaultValue={form.openingHours} className="f-input3" /></F>
        </Grid>
      </Section>

      <Section title="Delivery Settings">
        <Grid>
          <F label="Minimum Order (₹)"><input type="number" defaultValue={form.deliverySettings.minimumOrder} className="f-input3" /></F>
          <F label="Delivery Fee (₹)"><input type="number" defaultValue={form.deliverySettings.deliveryFee} className="f-input3" /></F>
          <F label="Free Delivery Threshold (₹)"><input type="number" defaultValue={form.deliverySettings.freeDeliveryThreshold} className="f-input3" /></F>
          <F label="Tax (%)"><input type="number" defaultValue={form.deliverySettings.taxPercent} className="f-input3" /></F>
        </Grid>
      </Section>

      <Section title="Payment Settings">
        <div className="flex flex-wrap gap-6">
          <Toggle label="UPI" defaultChecked={form.paymentSettings.upi} />
          <Toggle label="Cash on Delivery" defaultChecked={form.paymentSettings.cash} />
          <Toggle label="Card" defaultChecked={form.paymentSettings.card} />
        </div>
      </Section>

      <Section title="Restaurant Operations">
        <div className="flex flex-wrap gap-6">
          <Toggle label="Accepting Orders" defaultChecked={form.operations.acceptingOrders} />
          <Toggle label="Auto Accept Orders" defaultChecked={form.operations.autoAcceptOrders} />
        </div>
        <Grid className="mt-4">
          <F label="Estimated Preparation Time (mins)"><input type="number" defaultValue={form.operations.estimatedPrepTimeMins} className="f-input3" /></F>
        </Grid>
      </Section>

      <Section title="Notification Settings">
        <div className="flex flex-wrap gap-6">
          <Toggle label="Order Notifications" defaultChecked={form.notificationSettings.orderNotifications} />
          <Toggle label="Sound" defaultChecked={form.notificationSettings.sound} />
          <Toggle label="Email" defaultChecked={form.notificationSettings.email} />
          <Toggle label="WhatsApp" defaultChecked={form.notificationSettings.whatsapp} />
        </div>
      </Section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        This is a demo settings panel. In production, authentication, data storage, payments, notifications and
        order tracking shown here would be backed by a real database, secure auth, a payment gateway and real-time
        events instead of localStorage.
      </div>

      <button type="submit" className="btn-primary w-fit">Save Settings</button>
      <style jsx global>{`.f-input3 { border: 1px solid #F2E8DD; border-radius: 0.75rem; padding: 0.55rem 0.85rem; font-size: 0.875rem; width: 100%; }`}</style>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-beige bg-white p-5">
      <h2 className="mb-4 font-display font-bold">{title}</h2>
      {children}
    </div>
  );
}
function Grid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-4 sm:grid-cols-2 ${className ?? ""}`}>{children}</div>;
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1 text-sm"><span className="font-medium">{label}</span>{children}</label>;
}
function Toggle({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-chilli" />
      {label}
    </label>
  );
}

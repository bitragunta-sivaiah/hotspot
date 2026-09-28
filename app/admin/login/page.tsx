"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppData } from "@/lib/data-store";
import { useToast } from "@/lib/toast-store";

export default function AdminLoginPage() {
  const { loginAdmin } = useAppData();
  const { show } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("admin@hotspot.demo");
  const [password, setPassword] = useState("hotspot123");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      show("Welcome back, Admin!");
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.svg" alt="HOTSPOT" width={150} height={40} />
        </div>
        <h1 className="mb-1 text-center font-display text-xl font-bold">Admin Login</h1>
        <p className="mb-6 text-center text-sm text-muted">Sign in to manage HOTSPOT</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-beige px-3 py-2.5" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl border border-beige px-3 py-2.5" />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={() => setRemember((r) => !r)} className="accent-chilli" />
              Remember Me
            </label>
            <a href="#" className="text-chilli hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="btn-primary w-full">LOGIN</button>
        </form>

        <p className="mt-6 rounded-xl bg-cream p-3 text-center text-xs text-muted">
          Demo credentials — <b>admin@hotspot.demo</b> / <b>hotspot123</b>
          <br />Demo authentication only, not production security.
        </p>
      </div>
    </div>
  );
}

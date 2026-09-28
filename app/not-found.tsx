import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream text-center px-4">
      <div className="text-6xl">🌶️</div>
      <h1 className="font-display text-3xl font-extrabold">PAGE NOT FOUND</h1>
      <p className="text-muted">The page you're looking for has wandered off the menu.</p>
      <Link href="/" className="btn-primary mt-2">Back to Home</Link>
    </div>
  );
}

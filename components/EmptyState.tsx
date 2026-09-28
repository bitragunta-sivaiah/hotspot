import Link from "next/link";

export default function EmptyState({
  emoji = "🔥",
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  emoji?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="text-5xl">{emoji}</div>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="text-muted">{subtitle}</p>
      {ctaLabel && ctaHref && (
        <Link href={ctaHref} className="btn-primary mt-3">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

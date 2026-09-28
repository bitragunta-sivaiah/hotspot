import Image from "next/image";

export default function AboutPage() {
  const stats = [
    ["8+", "Years"],
    ["50+", "Menu Items"],
    ["10K+", "Orders Served"],
    ["4.8/5", "Customer Rating"],
  ];
  return (
    <div>
      <section className="container-hs grid gap-10 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            BORN FROM A LOVE FOR <span className="text-chilli">BOLD FLAVOURS.</span>
          </h1>
          <p className="mt-5 text-muted">
            HOTSPOT was created around the idea that great Indian food should be flavourful, generous and
            memorable. From sizzling tandoori to slow-cooked dum biryani, every dish is made fresh, using
            recipes rooted in tradition and a passion for bold, honest spice.
          </p>
          <p className="mt-4 text-muted">
            What started as a small kitchen obsessed with getting the perfect biryani dum has grown into a
            neighbourhood favourite for families, students, professionals and food lovers looking for a
            proper feast — whether dining in, taking away, or ordering straight to their door.
          </p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-card">
          <Image src="/food/kitchen.svg" alt="HOTSPOT kitchen" fill className="object-cover" />
        </div>
      </section>

      <section className="bg-charcoal py-14 text-cream">
        <div className="container-hs grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold text-saffron">{stat}</p>
              <p className="mt-1 text-sm text-cream/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-hs grid gap-4 py-14 sm:grid-cols-3">
        {[
          ["/food/chef.svg", "Our Chef"],
          ["/food/kitchen.svg", "Our Kitchen"],
          ["/food/interior.svg", "Our Space"],
        ].map(([src, label]) => (
          <div key={label} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
            <Image src={src} alt={label} fill className="object-cover" />
          </div>
        ))}
      </section>
    </div>
  );
}

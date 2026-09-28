import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-20">
      <div className="container-hs grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Image src="/logo.svg" alt="HOTSPOT" width={140} height={38} className="brightness-0 invert" />
          <p className="mt-4 text-sm text-cream/60">Bold Indian flavours, made fresh for every craving.</p>
          <div className="mt-5 flex gap-3">
            <Instagram size={18} className="text-cream/70" />
            <Facebook size={18} className="text-cream/70" />
            <Youtube size={18} className="text-cream/70" />
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">HOTSPOT</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/about" className="hover:text-saffron">About</Link></li>
            <li><Link href="/menu" className="hover:text-saffron">Menu</Link></li>
            <li><Link href="/offers" className="hover:text-saffron">Offers</Link></li>
            <li><Link href="/contact" className="hover:text-saffron">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Customer Support</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/orders" className="hover:text-saffron">Track Order</Link></li>
            <li><Link href="/orders" className="hover:text-saffron">Order History</Link></li>
            <li><Link href="/contact" className="hover:text-saffron">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-saffron">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li className="leading-relaxed">5-11-110, 3/A, beside HP PETROL BUNK, Jai Jawahar Nagar, Yapral, Secunderabad, Telangana 500087</li>
            <li><a href="tel:09666766697" className="hover:text-saffron">09666766697</a></li>
            <li>hello@hotspotrestaurant.in</li>
            <li>Everyday: 11:00 AM – 11:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © 2026 HOTSPOT. All Rights Reserved. · Website concept by SyntaxOnline.
      </div>
    </footer>
  );
}
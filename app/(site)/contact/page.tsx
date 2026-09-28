import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { restaurantData } from "@/data/restaurantData";

export default function ContactPage() {
  // Overriding with your specific location details
  const address = "5-11-110, 3/A, beside HP PETROL BUNK, Jai Jawahar Nagar, Yapral, Secunderabad, Telangana 500087";
  const phone = "09666766697";
  const whatsappNumber = "919666766697"; // Formatted for the WhatsApp API (Country Code + Number)
  const email = "hello@hotspotrestaurant.in";
  const openingHours = "Everyday: 11:00 AM – 11:00 PM";
  
  // URL-safe string for Google Maps embeds and direction links
  const mapQuery = "5-11-110,+3/A,+beside+HP+PETROL+BUNK,+Jai+Jawahar+Nagar,+Yapral,+Secunderabad,+Telangana+500087";

  return (
    <div className="container-hs grid gap-10 py-14 md:grid-cols-2">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Get in Touch</h1>
        <p className="mt-2 text-muted">We'd love to have you at {restaurantData.name}.</p>

        <div className="mt-8 flex flex-col gap-5">
          <InfoRow icon={<MapPin size={20} />} title="Address" value={address} />
          <InfoRow icon={<Phone size={20} />} title="Phone" value={phone} />
          <InfoRow icon={<Mail size={20} />} title="Email" value={email} />
          <InfoRow icon={<Clock size={20} />} title="Opening Hours" value={openingHours} />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={`tel:${phone}`} className="btn-primary">Call Now</a>
          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <MessageCircle size={18}/> WhatsApp
          </a>
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Get Directions
          </a>
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-2xl border border-beige bg-beige shadow-card sm:aspect-square md:aspect-auto md:h-full">
        <iframe
          title="HOTSPOT location map"
          className="h-full w-full"
          loading="lazy"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-chilli/10 text-chilli">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
        <p className="font-semibold leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
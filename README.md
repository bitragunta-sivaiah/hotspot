# HOTSPOT — Restaurant Ordering Platform + Admin Dashboard

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000 for the customer site, and http://localhost:3000/admin for the admin dashboard.

## Admin demo login
- Email: admin@hotspot.demo
- Password: hotspot123

## Notes
- This is a self-contained DEMO. Cart, orders, menu, categories, and admin auth are persisted in the browser's localStorage (not a real database).
- When the admin changes an order's status or a menu item's availability, it updates the shared in-browser store immediately, so the customer-facing pages (tracking, menu) reflect it live in the same browser session.
- No real payment gateway, real-time backend, or production authentication is wired up — see the note in /admin/settings for what a production build would replace these with.
- The HOTSPOT logo is a placeholder SVG (public/logo.svg) built in the brand's chilli-red palette, since no logo file was uploaded to this chat. Swap it out with the real logo file at any time.
- Food images are placeholder graphics (placehold.co) labelled with each dish name — swap `image` fields in `data/menuData.ts` with real photography for production.

## About the food images
No external photo service could be safely and reliably hotlinked for 32 menu items (Unsplash's old "Source" random-image API was shut down in 2024, and pulling from live web search results would mean using other people's copyrighted photography inside a commercial-styled demo). Instead, `public/food/*.svg` are original, self-contained illustrations — one distinct flat-design icon per category (biryani, tandoori, curries, rice, breads, desserts, beverages, starters) in the HOTSPOT palette. They always render, need no network call, and are trivial to swap: just point `image` in `data/menuData.ts` at your own photography (local files in `/public` or your own image host) once you have it.

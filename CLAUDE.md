# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Run production server
```

ESLint is intentionally disabled during builds (`next.config.js` sets `eslint.ignoreDuringBuilds: true`).

## Architecture

**Stack:** Next.js 14 App Router, React 18, TypeScript (strict), Tailwind CSS, Zustand, Framer Motion, Recharts

**Routing:** Three main routes via App Router — `/dashboard`, `/store`, `/checkout`. The root `/` redirects to `/dashboard`. All are client-heavy pages; charts use dynamic imports with `ssr: false` to avoid hydration issues with Recharts.

**State:** Zustand cart store in `lib/store.ts`, persisted to `localStorage` under the key `luxe-cart`. Theme (dark/light) is managed via Context API in `components/ThemeProvider.tsx` — it reads/writes `localStorage` and applies a class on `<html>`. The ThemeProvider must be wrapped in a client boundary to avoid SSR hydration mismatches.

**Data:** All product and dashboard data is static mock data — `lib/products.ts` and `lib/dashboardData.ts`. No API calls or backend.

**Layout:** `app/layout.tsx` renders `Sidebar`, `CartDrawer`, and `Toaster` globally. The sidebar handles both desktop (fixed left) and mobile (top bar + drawer) layouts.

**Path alias:** `@/*` resolves to the project root, so `@/components/...`, `@/lib/...`, `@/types/...` etc.

## Key Conventions

- **Currency:** All prices are in euros (€), styled to match a luxury European fashion brand.
- **Images:** External images come from Unsplash (`images.unsplash.com`, `plus.unsplash.com`) — these domains are whitelisted in `next.config.js`.
- **Fonts:** DM Sans for body text, Playfair Display for headings/display — both loaded via `next/font/google` in `app/layout.tsx`.
- **Dark mode:** Tailwind class-based (`darkMode: 'class'`). All components should carry `dark:` variants.
- **Animations:** Framer Motion is used throughout. Prefer `motion` components and `AnimatePresence` for enter/exit transitions rather than CSS transitions for interactive elements.
- **Notifications:** `react-hot-toast` via `useToast` — already mounted globally in the root layout.
- **Custom Tailwind classes:** `btn-primary` and `btn-outline` are defined in `globals.css` as `@apply` layers.

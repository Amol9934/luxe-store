# LUXE Store 🛍️

A premium European-style e-commerce frontend built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Features

- 🛒 Product listing with category filters
- 🔍 Product detail modal with image gallery
- 🛍️ Slide-in cart drawer with quantity controls
- 💳 Full checkout flow (mock — no backend)
- 🌙 Dark / Light mode toggle
- 💾 Persistent cart via localStorage
- 🔔 Toast notifications
- ⏳ Loading skeletons
- 📱 Fully responsive (mobile-first)
- ✨ Smooth Framer Motion animations throughout

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Zustand** (cart state management)
- **react-hot-toast** (notifications)
- **lucide-react** (icons)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

## Folder Structure

```
luxe-store/
├── app/
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout (Navbar, Cart, Toaster)
│   ├── page.tsx             # Home page (product grid)
│   └── checkout/
│       └── page.tsx         # Checkout page (2-step flow)
├── components/
│   ├── ThemeProvider.tsx    # Dark/light mode context
│   ├── Navbar.tsx           # Top navigation bar
│   ├── CartDrawer.tsx       # Slide-in cart sidebar
│   ├── ProductCard.tsx      # Product grid card
│   ├── ProductModal.tsx     # Product detail modal
│   └── ProductSkeleton.tsx  # Loading skeleton
├── lib/
│   ├── products.ts          # Sample product data
│   └── store.ts             # Zustand cart store
└── types/
    └── index.ts             # TypeScript types
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repo
4. Click **Deploy** — done! ✅

CI/CD is automatic: every `git push` triggers a new deployment.
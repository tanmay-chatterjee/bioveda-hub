# BioVeda Hub

**Premium B2B Platform for Pharmaceutical-Grade Ayurvedic & Herbal Botanical Extracts**

> Wholesale raw materials for pharmaceutical, nutraceutical, and cosmetic industries.
> GMP & ISO certified | COA guaranteed | Organic & Ayurvedic sourcing

🌿 **Live:** [www.biovedahub.com](https://www.biovedahub.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSR/ISR/SSG) |
| Styling | Tailwind CSS |
| Animations | Framer Motion (LazyMotion) |
| 3D Hero | Three.js + React Three Fiber |
| Headless CMS | Sanity.io |
| Lead Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel |

---

## Quick Start

### Prerequisites
- Node.js 18+
- A [Sanity](https://sanity.io) account (free tier: 10K documents)
- A [Supabase](https://supabase.com) account (free tier)
- A [Resend](https://resend.com) account (free tier: 3K emails/month)

### 1. Clone and install

```bash
git clone https://github.com/tanmaychatterjee/bioveda-hub.git
cd bioveda-hub
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Fill in the values (see sections below)
```

### 3. Set up Sanity CMS

```bash
# Install Sanity CLI
npm install -g sanity

# Create a new Sanity project at sanity.io/manage
# Copy your projectId and dataset name

# Start Sanity Studio locally
cd sanity && sanity dev
```

Add your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`.

Generate a read token: Sanity → Settings → API → Tokens → Add API token (Viewer) → copy to `SANITY_API_TOKEN`.

### 4. Set up Supabase database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → **New Query**
3. Paste and run the contents of `supabase-migration.sql`
4. Copy your project URL and anon key from **Settings → API**
5. Copy your service role key from **Settings → API** (keep this server-only!)

### 5. Set up Resend email

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key → copy to `RESEND_API_KEY`
4. Update `NOTIFICATION_EMAIL` to your sales team email

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_viewer_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Server-only!

# Email
RESEND_API_KEY=re_your_api_key
NOTIFICATION_EMAIL=sales@biovedahub.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ISR Webhook secret (random string, shared with Sanity webhook)
REVALIDATION_SECRET=your_random_secret_string
```

---

## Project Structure

```
bioveda-hub/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (fonts, providers, nav, footer)
│   ├── page.tsx              # Homepage
│   ├── products/             # Product catalog + detail pages
│   ├── about/                # About page
│   ├── certifications/       # Certifications page
│   ├── contact/              # Contact/enquiry page
│   └── api/                  # API routes (enquiry, revalidate)
├── components/
│   ├── ui/                   # Primitive UI components
│   │   ├── IngredientCard    # Framer Motion layoutId expand/collapse
│   │   ├── EnquiryModal      # Radix Dialog + react-hook-form
│   │   └── ...
│   ├── sections/             # Page section components
│   ├── 3d/                   # Three.js/R3F components
│   ├── layout/               # Navigation, Footer, FloatingCTA
│   └── providers/            # React context providers
├── lib/                      # Utilities, clients, queries
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript types
├── sanity/                   # Sanity Studio config + schemas
└── supabase-migration.sql    # Database migration
```

---

## Adding Products to the CMS

1. Run `cd sanity && sanity dev` to open Sanity Studio at `localhost:3333`
2. Click **Product** → **Create new document**
3. Fill in: Name, Slug, Category, Botanical Name, Standardization, Description, etc.
4. Upload a Hero Image
5. Set **Featured** = true to show on the homepage
6. **Publish** the document

The site will refresh within 1 hour via ISR, or immediately via the webhook.

### Setting up the ISR webhook

1. In Sanity: Settings → API → Webhooks → Add webhook
2. URL: `https://your-site.vercel.app/api/revalidate?secret=YOUR_REVALIDATION_SECRET&tag=products`
3. Dataset: `production`, Events: `create`, `update`, `delete`
4. Now publishing in Sanity immediately refreshes the website

---

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Settings → Environment Variables → add all from .env.local
```

Or connect the GitHub repo in Vercel dashboard for automatic deployments on push.

---

## SEO Keywords

This platform is optimised for:
- `ayurvedic extracts wholesale`
- `herbal raw materials bulk`
- `organic botanical extracts`
- `aayush certified extracts`
- `pharmaceutical grade herbal ingredients`
- `bioveda hub`
- `curcumin extract wholesale`
- `neem extract supplier india`
- `health benefits herbal extracts`
- `herbal extract enquiries`

---

## Database Schema

The `enquiries` table captures:
- Company contact details
- Product interests (array)
- Volume requirements
- Compliance needs (GMP, Halal, Organic, etc.)
- UTM tracking
- CRM status lifecycle

See `supabase-migration.sql` for the complete schema.

---

## License

Private — All rights reserved. © 2024 BioVeda Hub.

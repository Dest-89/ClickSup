# ToriToriLand - ClickBank Supplement Directory

## Overview
A Next.js 16 affiliate marketing directory for ClickBank supplements. Uses GitHub as a serverless database to store listings, blog posts, and settings.

## Tech Stack
- **Framework**: Next.js 16.1.1 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4, shadcn/ui components
- **Database**: GitHub API (JSON/MD files stored in repo)
- **Auth**: Session-based admin authentication

## Project Structure
```
src/
├── app/
│   ├── admin/           # Admin dashboard (listings, blog, settings)
│   ├── api/             # API routes (admin, forms)
│   ├── blog/            # Public blog pages
│   ├── supplements/     # Supplement listing pages
│   ├── contact/         # Contact form
│   └── newsletter/      # Newsletter signup
├── components/
│   ├── admin/           # Admin forms (ListingForm, PostForm, SettingsForm)
│   └── ui/              # shadcn/ui components
└── lib/
    ├── githubDb.ts      # GitHub API wrapper for CRUD operations
    ├── seed.ts          # Initial data seeding (30 supplements, 8 blog posts)
    ├── auth.ts          # Password hashing utilities
    ├── session.ts       # Session management
    └── schemas.ts       # Data validation schemas
```

## GitHub Database
Data is stored in the `data/` folder of the ClickSup repo:
- `data/settings.json` - Site configuration
- `data/listings/index.json` - Supplement listing index
- `data/listings/{id}.json` - Individual listing data
- `data/blog/index.json` - Blog post index
- `data/blog/{slug}.md` - Blog post content (markdown)
- `data/inbox/` - Contact/newsletter submissions

## Environment Variables
Required in `.env`:
```
GITHUB_OWNER=Dest-89
GITHUB_REPO=ClickSup
GITHUB_BRANCH=main
GITHUB_TOKEN=<fine-grained token with Contents read/write>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=<bcrypt hash>
SESSION_SECRET=<random string>
CLICKBANK_ID=<your-clickbank-affiliate-id>
```

**Important**: The `CLICKBANK_ID` is used in affiliate hoplinks but is NOT visible on pages. It's injected server-side into the hoplinks stored in the GitHub database.

## Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Supplement Categories (9 Total)
The directory organizes supplements into these categories:

| Category | Description | Example Products |
|----------|-------------|------------------|
| `fat-loss` | Weight loss & metabolism | Mitolyn, Java Burn, Puravive, All Day Slimming Tea |
| `testosterone` | Men's health & vitality | Prostadine, Alpha Tonic, Red Boost, EndoPeak |
| `sleep` | Sleep support & recovery | Resurge, Sleep Guard Plus, Relaxium Sleep |
| `nootropics` | Brain health & cognitive | Neuro-Thrive, Genius Wave, Mind Vitality |
| `joint` | Joint health & mobility | Joint Genesis, Balmorex Pro, Joint Restore Gummies |
| `gut` | Digestive health | SynoGut, BioFit, Gut Vita |
| `immune` | Immune support | Immune Defense 4X, Mushroom Defense, Vitamin D3+K2 |
| `keto` | Ketogenic diet support | Keto Complete, Keto Trim, Perfect Keto MCT |
| `other` | Specialty supplements | ProDentim, Sugar Defender, Quietum Plus |

## Blog Post Categories
The blog covers health & wellness topics:

| Topic | Blog Posts |
|-------|------------|
| Weight Loss | "Science Behind Metabolism Boosters", "5 Natural Weight Management Tips" |
| Men's Health | "Men's Health After 40 Guide" |
| Sleep | "Sleep and Weight Loss Connection" |
| Gut Health | "Gut Health 101: Microbiome Guide" |
| Brain Health | "Nootropics Explained" |
| Supplements | "How to Choose Quality Supplements" |
| Keto | "Keto Diet Supplements Guide" |

## Key Features
- **Supplement Directory**: Browse/search 30 ClickBank supplements with affiliate hoplinks
- **Category Filtering**: Filter supplements by 9 health categories
- **Admin Dashboard**: CRUD for listings and blog posts at `/admin`
- **Blog**: 8 Markdown-based blog posts with SEO metadata
- **Forms**: Contact and newsletter with GitHub-based storage
- **Auto-seeding**: Creates comprehensive sample data on first run

## Admin Access
The `/admin` dashboard requires authentication:
- Protected by session-based authentication
- Requires `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` environment variables
- Login at `/admin/login`

## Deployment
Recommended: **Vercel** (free tier, full Next.js support)

1. Push to GitHub
2. Import repo at vercel.com/new
3. Add environment variables:
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`
   - `GITHUB_TOKEN` (fine-grained token with Contents read/write)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
   - `CLICKBANK_ID`
4. Deploy

**Troubleshooting Build Errors**:
- "Bad credentials" error: Check that `GITHUB_TOKEN` is valid and has Contents permissions
- Token must be a fine-grained personal access token with repository access to `Dest-89/ClickSup`

Note: GitHub Pages won't work - this app needs a server for API routes and admin features.

## Important Notes
- The `githubDb.ts` handles all GitHub API interactions
- 404s on GET requests return `null` (not errors) for graceful handling
- Admin routes are protected by session authentication
- All data mutations create commits in the GitHub repo
- Affiliate IDs are stored via environment variable, not hardcoded in source
- Seed data includes 30 real ClickBank supplement products across 9 categories
- Blog posts are SEO-optimized with proper markdown formatting

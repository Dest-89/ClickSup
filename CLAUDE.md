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
    ├── seed.ts          # Initial data seeding
    ├── auth.ts          # Password hashing utilities
    ├── session.ts       # Session management
    └── schemas.ts       # Data validation schemas
```

## GitHub Database
Data is stored in the `data/` folder of this repo:
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
CLICKBANK_ID=dst11
```

## Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Features
- **Supplement Directory**: Browse/search ClickBank supplements with affiliate hoplinks
- **Admin Dashboard**: CRUD for listings and blog posts at `/admin`
- **Blog**: Markdown-based blog with SEO metadata
- **Forms**: Contact and newsletter with GitHub-based storage
- **Auto-seeding**: Creates sample data on first run

## Admin Access
The `/admin` dashboard is **private** and only accessible to the owner (Dest-89).
- Protected by session-based authentication
- Requires `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` environment variables
- Do not share admin credentials

## Deployment
Recommended: **Vercel** (free tier, full Next.js support)

1. Push to GitHub
2. Import repo at vercel.com/new
3. Add environment variables (from `.env.example`)
4. Deploy

Note: GitHub Pages won't work - this app needs a server for API routes and admin features.

## Important Notes
- The `githubDb.ts` handles all GitHub API interactions
- 404s on GET requests return `null` (not errors) for graceful handling
- Admin routes are protected by session authentication
- All data mutations create commits in the GitHub repo

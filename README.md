# ClickBank Supplement Directory

A production-quality demo web app built with Next.js 14, Tailwind CSS, and Shadcn/UI, using GitHub as a database.

## Features
- **Dynamic Directory**: Manage supplement listings via an admin dashboard.
- **Blog System**: MDX-based blog with full CRUD.
- **GitHub-as-DB**: No traditional database required; content is stored as JSON/MD files in a repo.
- **Admin Dashboard**: Secure access to manage all site content.
- **SEO Optimized**: Dynamic metadata, sitemap, and robots.txt.
- **Integrations**: Placeholders for GTM and Encharge webhooks.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Auth**: Custom session cookies + bcrypt
- **Validation**: Zod
- **Database**: GitHub API (Filesystem)

## Setup Instructions

### 1. GitHub Repository
Create a new private or public GitHub repository to store the data.

### 2. Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
GITHUB_TOKEN=your-pat-token

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-hash
SESSION_SECRET=your-long-secret

CLICKBANK_ID=dst11
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Installation
```bash
npm install
```

### 4. Run Locally
```bash
npm run dev
```
The app will automatically seed the GitHub repository with sample data on the first run if it's empty.

### 5. Deployment (Vercel)
1. Push your code to a GitHub repo.
2. Connect the repo to Vercel.
3. Add all environment variables from `.env.local` to Vercel's project settings.
4. Deploy.

## Admin Dashboard
Access the dashboard at `/admin`.
- **Login**: Use the `ADMIN_EMAIL` and the password corresponding to `ADMIN_PASSWORD_HASH`.
- **Listings**: Create, edit, and publish supplement listings.
- **Blog**: Write and manage blog posts using Markdown.
- **Settings**: Update site-wide settings and ClickBank ID.

## ClickBank Integration
The ClickBank ID `dst11` is displayed in the footer and used in affiliate hoplinks. You can update this in the Admin Settings.

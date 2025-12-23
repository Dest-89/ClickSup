# ToriToriLand - Supplement Directory (Vanilla)

## Overview
A vanilla HTML/CSS/JS affiliate marketing directory for health supplements. Uses GitHub as a serverless database - no build step, no framework, deploys to GitHub Pages.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (no frameworks)
- **Database**: GitHub API (Markdown/JSON files stored in repo)
- **Hosting**: GitHub Pages (static, zero build)
- **Auth**: Token-based admin (user provides their own GitHub token)

## Architecture Philosophy
- **Public reads**: No authentication needed - fetches from `raw.githubusercontent.com`
- **Admin writes**: User enters their GitHub token in admin panel (stored in sessionStorage)
- **No server needed**: Pure client-side, static hosting compatible

## Project Structure
```
ToriToriLand/
├── assets/
│   ├── css/styles.css       # Natural Wellness theme
│   └── js/
│       ├── api.js           # GitHub API wrapper with caching
│       ├── templates.js     # HTML template generators
│       ├── ui.js            # UI interactions
│       └── headerFooter.js  # Component loader
├── components/
│   ├── header.html          # Site header
│   └── footer.html          # Site footer
├── content/
│   ├── supplements/
│   │   ├── categories.json  # Supplement categories
│   │   └── items/           # Individual supplement .md files
│   └── blog/
│       ├── categories.json  # Blog categories
│       └── posts/           # Blog post .md files
├── index.html               # Homepage
├── supplements.html         # Supplement directory
├── supplement.html          # Individual supplement page
├── blog.html                # Blog listing
├── post.html                # Individual blog post
├── about.html               # About page
├── contact.html             # Contact form
├── admin.html               # Admin CMS dashboard
├── privacy.html             # Privacy policy
├── terms.html               # Terms of service
└── 404.html                 # Error page
```

## Content Format

### Supplement Markdown (content/supplements/items/*.md)
```yaml
---
id: mitolyn
name: Mitolyn
category: fat-loss
brand: Mitolyn Labs
rating: 4.8
featured: true
status: published
imageUrl: https://example.com/image.jpg
shortDescription: Brief description for cards
affiliateHoplink: https://hop.clickbank.net/?affiliate=ID&vendor=mitolyn
benefits:
  - Benefit 1
  - Benefit 2
ingredients:
  - Ingredient 1
  - Ingredient 2
warnings:
  - Warning 1
createdAt: 2025-01-01
updatedAt: 2025-01-15
---

Full markdown content here...
```

### Blog Post Markdown (content/blog/posts/*.md)
```yaml
---
title: Post Title
slug: post-slug
category: wellness
excerpt: Brief excerpt for cards
author: Author Name
status: published
featuredImage: https://example.com/image.jpg
tags:
  - health
  - supplements
createdAt: 2025-01-01
updatedAt: 2025-01-15
---

Full markdown content here...
```

## Supplement Categories
| ID | Name | Description |
|----|------|-------------|
| fat-loss | Weight Loss | Metabolism boosters |
| testosterone | Men's Health | Vitality products |
| sleep | Sleep Support | Natural sleep aids |
| nootropics | Brain Health | Cognitive enhancement |
| joint | Joint Care | Mobility support |
| gut | Gut Health | Digestive health |
| immune | Immunity | Immune support |
| keto | Keto Diet | Ketogenic support |

## API Configuration (assets/js/api.js)
```javascript
const CONFIG = {
  owner: 'Dest-89',
  repo: 'ToriToriLand',
  branch: 'main',
  contentPaths: {
    supplementCategories: 'content/supplements/categories.json',
    supplements: 'content/supplements/items',
    blogCategories: 'content/blog/categories.json',
    blogPosts: 'content/blog/posts'
  }
};
```

## Caching Strategy
- **Memory cache**: Session-persistent Map (fastest)
- **sessionStorage**: 5-10 minute TTL for lists
- **localStorage**: 30 minute TTL for categories
- Admin operations bypass cache entirely

## Deployment

### GitHub Pages (Recommended)
1. Push to GitHub
2. Go to Settings > Pages
3. Select `main` branch, root folder
4. Site will be live at `https://username.github.io/ToriToriLand`

### Alternative: Vercel/Netlify
- No build command needed
- Publish directory: `/` (root)

## Admin Access
1. Navigate to `/admin.html`
2. Enter your GitHub Personal Access Token (needs Contents read/write permission)
3. Create/edit/delete supplements and blog posts
4. Token is stored in browser sessionStorage (cleared on tab close)

## Theme: Natural Wellness
- **Primary**: Sage Green (#6B8E6B)
- **Secondary**: Forest Green (#2D5A3D)
- **Background**: Warm Cream (#F9F7F4)
- **Text**: Dark Charcoal (#2D3436)
- **Fonts**: Poppins (headings), Source Serif 4 (body)

## Key Features
- No build step - pure static HTML/CSS/JS
- GitHub as database - version controlled content
- Public reads without auth - fast, CDN-cached
- Admin CMS - browser-based content management
- Mobile-first responsive design
- SEO-optimized with proper meta tags
- Affiliate hoplinks for ClickBank products

## Important Notes
- Never commit GitHub tokens to the repo
- Affiliate ID should be in hoplinks, not environment variables
- Content changes create commits visible in repo history
- Cache can be cleared by users via browser dev tools

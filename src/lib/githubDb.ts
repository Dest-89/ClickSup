const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

async function ghFetch(path: string, options: RequestInit = {}) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error("GitHub credentials not configured");
  }

  const url = `${BASE_URL}/${path}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      ...options.headers,
    },
  });

  if (res.status === 404 && (!options.method || options.method === "GET")) {
    return null;
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "GitHub API error");
  }

  return res.json();
}

export async function getFile(path: string) {
  const data = await ghFetch(path);
  if (!data) return null;
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return {
    content,
    sha: data.sha,
  };
}

export async function upsertFile(path: string, content: string, message: string) {
  const existing = await getFile(path);
  const body: any = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: GITHUB_BRANCH,
  };

  if (existing) {
    body.sha = existing.sha;
  }

  const res = await fetch(`${BASE_URL}/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upsert file");
  }

  return res.json();
}

export async function deleteFile(path: string, message: string) {
  const existing = await getFile(path);
  if (!existing) return;

  const res = await fetch(`${BASE_URL}/${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sha: existing.sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete file");
  }
}

// Typed Helpers
export async function getSettings() {
  const file = await getFile("data/settings.json");
  return file ? JSON.parse(file.content) : null;
}

export async function updateSettings(settings: any) {
  return upsertFile("data/settings.json", JSON.stringify(settings, null, 2), "Update settings");
}

export async function listListings() {
  const file = await getFile("data/listings/index.json");
  return file ? JSON.parse(file.content) : [];
}

export async function getListing(id: string) {
  const file = await getFile(`data/listings/${id}.json`);
  return file ? JSON.parse(file.content) : null;
}

export async function upsertListing(listing: any) {
  // Update individual file
  await upsertFile(`data/listings/${listing.id}.json`, JSON.stringify(listing, null, 2), `Update listing ${listing.id}`);
  
  // Update index with fields needed for card display
  const index = await listListings();
  const filtered = index.filter((item: any) => item.id !== listing.id);
  filtered.push({
    id: listing.id,
    name: listing.name,
    category: listing.category,
    featured: listing.featured,
    status: listing.status,
    updatedAt: listing.updatedAt,
    // Card display fields
    imageUrl: listing.imageUrl,
    shortDescription: listing.shortDescription,
    rating: listing.rating,
  });
  await upsertFile("data/listings/index.json", JSON.stringify(filtered, null, 2), "Update listings index");
}

export async function deleteListing(id: string) {
  await deleteFile(`data/listings/${id}.json`, `Delete listing ${id}`);
  const index = await listListings();
  const filtered = index.filter((item: any) => item.id !== id);
  await upsertFile("data/listings/index.json", JSON.stringify(filtered, null, 2), "Update listings index after delete");
}

export async function listPosts() {
  const file = await getFile("data/blog/index.json");
  return file ? JSON.parse(file.content) : [];
}

export async function getPost(slug: string) {
  const file = await getFile(`data/blog/${slug}.md`);
  if (!file) return null;
  // Simple frontmatter parser could be added here or handled in the route
  return file.content;
}

export async function upsertPost(slug: string, content: string, metadata: any) {
  await upsertFile(`data/blog/${slug}.md`, content, `Update post ${slug}`);
  
  const index = await listPosts();
  const filtered = index.filter((item: any) => item.slug !== slug);
  filtered.push({
    slug,
    title: metadata.title,
    status: metadata.status,
    updatedAt: metadata.updatedAt,
  });
  await upsertFile("data/blog/index.json", JSON.stringify(filtered, null, 2), "Update blog index");
}

export async function deletePost(slug: string) {
  await deleteFile(`data/blog/${slug}.md`, `Delete post ${slug}`);
  const index = await listPosts();
  const filtered = index.filter((item: any) => item.slug !== slug);
  await upsertFile("data/blog/index.json", JSON.stringify(filtered, null, 2), "Update blog index after delete");
}

export async function storeInboxMessage(type: "contact" | "newsletter", payload: any) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await upsertFile(`data/inbox/${type}/${timestamp}.json`, JSON.stringify(payload, null, 2), `New ${type} message`);
}

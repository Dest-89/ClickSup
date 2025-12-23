"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import matter from "gray-matter";

export default function PostForm({ initialData, rawContent }: { initialData?: any, rawContent?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const metadata = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      status: formData.get("status"),
      updatedAt: new Date().toISOString(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    const content = formData.get("content") as string;
    const fullContent = matter.stringify(content, metadata);

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        body: JSON.stringify({ ...metadata, content: fullContent }),
      });

      if (res.ok) {
        toast.success("Post saved");
        router.push("/admin/blog");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error);
      }
    } catch (error) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{initialData ? "Edit Post" : "New Post"}</h1>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Post"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={initialData?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={initialData?.slug} required placeholder="how-to-lose-weight" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" name="excerpt" defaultValue={initialData?.excerpt} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea id="content" name="content" defaultValue={rawContent} rows={20} required />
      </div>

      <div className="w-32 space-y-2">
        <Label>Status</Label>
        <Select name="status" defaultValue={initialData?.status || "draft"}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}

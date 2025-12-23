"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ListingForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData);
    
    // Process arrays and booleans
    data.ingredients = data.ingredients.split(",").map((s: string) => s.trim()).filter(Boolean);
    data.benefits = data.benefits.split(",").map((s: string) => s.trim()).filter(Boolean);
    data.warnings = data.warnings.split(",").map((s: string) => s.trim()).filter(Boolean);
    data.tags = data.tags.split(",").map((s: string) => s.trim()).filter(Boolean);
    data.featured = formData.get("featured") === "on";
    data.rating = parseFloat(data.rating) || 0;
    data.updatedAt = new Date().toISOString();
    data.createdAt = initialData?.createdAt || new Date().toISOString();

    try {
      const res = await fetch("/api/admin/listings", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Listing saved");
        router.push("/admin/listings");
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
        <h1 className="text-2xl font-bold">{initialData ? "Edit Listing" : "New Listing"}</h1>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Listing"}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="id">ID (Slug)</Label>
          <Input id="id" name="id" defaultValue={initialData?.id} required placeholder="sample-fat-burner" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={initialData?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" defaultValue={initialData?.brand} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={initialData?.category || "fat-loss"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["fat-loss", "testosterone", "sleep", "nootropics", "joint", "gut", "immune", "keto", "other"].map(c => (
                <SelectItem key={c} value={c} className="capitalize">{c.replace("-", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input id="shortDescription" name="shortDescription" defaultValue={initialData?.shortDescription} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longDescription">Long Description (Markdown)</Label>
        <Textarea id="longDescription" name="longDescription" defaultValue={initialData?.longDescription} rows={10} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="affiliateHoplink">Affiliate Hoplink</Label>
          <Input id="affiliateHoplink" name="affiliateHoplink" defaultValue={initialData?.affiliateHoplink} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={initialData?.imageUrl} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
          <Input id="ingredients" name="ingredients" defaultValue={initialData?.ingredients?.join(", ")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits (comma separated)</Label>
          <Input id="benefits" name="benefits" defaultValue={initialData?.benefits?.join(", ")} />
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Switch id="featured" name="featured" defaultChecked={initialData?.featured} />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={initialData?.status || "draft"}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
}

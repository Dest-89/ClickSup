"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Settings updated");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="siteName">Site Name</Label>
        <Input id="siteName" name="siteName" defaultValue={initialData?.siteName} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clickBankId">ClickBank ID</Label>
        <Input id="clickBankId" name="clickBankId" defaultValue={initialData?.clickBankId} required />
        <p className="text-xs text-gray-500">Current ID: dst11</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input id="contactEmail" name="contactEmail" type="email" defaultValue={initialData?.contactEmail} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="footerText">Footer Text</Label>
        <Input id="footerText" name="footerText" defaultValue={initialData?.footerText} />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}

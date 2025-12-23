import { protectAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/githubDb";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettings() {
  await protectAdmin();
  const settings = await getSettings();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>
      <SettingsForm initialData={settings} />
    </div>
  );
}

import { protectAdmin } from "@/lib/auth";
import PostForm from "@/components/admin/PostForm";

export default async function NewPost() {
  await protectAdmin();
  return <PostForm />;
}

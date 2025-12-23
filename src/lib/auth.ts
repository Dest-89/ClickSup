import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "./session";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function protectAdmin() {
  const session = await getSession();
  if (!session.user?.isAdmin) {
    redirect("/admin/login");
  }
  return session;
}

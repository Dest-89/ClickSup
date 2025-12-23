import { NextResponse } from "next/server";
import { storeInboxMessage } from "@/lib/githubDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const webhook = process.env.ENCHARGE_WEBHOOK_CONTACT;

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await storeInboxMessage("contact", body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

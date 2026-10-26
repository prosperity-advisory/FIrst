import { NextResponse } from "next/server";

// Direct Line standard token endpoint (Bot Framework)
// More universally accessible than the Power VA-specific endpoint
const DIRECTLINE_TOKEN_URL =
  "https://directline.botframework.com/v3/directline/tokens/generate";

export const dynamic = "force-dynamic";

export async function GET() {
  const secret = process.env.DIRECT_LINE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Chat service is temporarily unavailable" },
      { status: 500 }
    );
  }

  try {
    // Use the standard Bot Framework Direct Line token generation endpoint
    const res = await fetch(DIRECTLINE_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("[chat-token] Direct Line returned", res.status, text);
      return NextResponse.json(
        { error: "Failed to fetch token", status: res.status, detail: text },
        { status: res.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json({
      token: data.token,
      conversationId: data.conversationId,
    });
  } catch (err) {
    console.error("[chat-token] Fetch error:", err);
    return NextResponse.json(
      { error: "Unable to connect to chat service", detail: String(err) },
      { status: 502 }
    );
  }
}

import { NextResponse } from "next/server";

// Direct Line standard token endpoint (Bot Framework)
// More universally accessible than the Power VA-specific endpoint
const DIRECTLINE_TOKEN_URL =
  "https://directline.botframework.com/v3/directline/tokens/generate";

const SECRET =
  "BViSbHcuBbLdabZIh7xUXkb15pGV0wPs4C2uM04HYyC17YJ84paqJQQJ99CDACYeBjFAArohAAABAZBS4M6n.2hEtfCgiW4eIHqUbHTcVIEYz6CoSRjnO4IRz6CIc7Pz3Bjxu4njvJQQJ99CDACYeBjFAArohAAABAZBS3ten";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Use the standard Bot Framework Direct Line token generation endpoint
    const res = await fetch(DIRECTLINE_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET}`,
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

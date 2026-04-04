import { NextResponse } from "next/server";

const TOKEN_ENDPOINT =
  "https://unitedstates.api.powerva.microsoft.com/api/botmanagement/v1/directline/directlinetoken?botId=80518000-d02e-f111-88b4-6045bd08b490";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("[chat-token] Power VA returned", res.status, text);
      return NextResponse.json(
        { error: "Failed to fetch token", status: res.status, detail: text },
        { status: res.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("[chat-token] Fetch error:", err);
    return NextResponse.json(
      { error: "Unable to connect to chat service", detail: String(err) },
      { status: 502 }
    );
  }
}

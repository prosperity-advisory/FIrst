import { NextResponse } from "next/server";

const TOKEN_ENDPOINT =
  "https://unitedstates.api.powerva.microsoft.com/api/botmanagement/v1/directline/directlinetoken?botId=80518000-d02e-f111-88b4-6045bd08b490";

export async function GET() {
  try {
    const res = await fetch(TOKEN_ENDPOINT);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch token" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({ token: data.token });
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to chat service" },
      { status: 502 }
    );
  }
}

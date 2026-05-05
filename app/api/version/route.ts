import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    instance: "client",
    supabase: process.env.NEXT_PUBLIC_SUPABASE_URL,
    deployedAt: new Date().toISOString(),
  });
}

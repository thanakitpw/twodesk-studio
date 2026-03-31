import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path || typeof path !== "string" || path.trim().length === 0) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const normalizedPath = path.trim().slice(0, 500); // guard against oversized paths

    const { error } = await supabaseAdmin.from("page_views").insert({
      path: normalizedPath,
    });

    if (error) {
      console.error("page_views insert error:", error);
      return NextResponse.json(
        { error: "Failed to record page view" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    console.error("pageview API error");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

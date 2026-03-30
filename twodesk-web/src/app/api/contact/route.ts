import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required");
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.push("Invalid email format");
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      errors.push("Message is required");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin.from("messages").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      project_type: projectType?.trim() || null,
      message: message.trim(),
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch {
    console.error("Contact API error");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

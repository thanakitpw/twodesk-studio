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

    // Send email notification via Resend (optional — skip if no API key)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        const adminEmail =
          process.env.ADMIN_EMAIL || "admin@twodesk.co";

        await resend.emails.send({
          from: "Twodesk Website <noreply@twodesk.co>",
          to: adminEmail,
          subject: `New message from ${name.trim()}`,
          html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:28px 32px;">
              <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.08em;">TWO DESKS</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:15px;color:#333333;line-height:1.5;">
                มีข้อความใหม่จากแบบฟอร์มติดต่อบนเว็บไซต์
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">ชื่อ</span>
                    <span style="font-size:14px;color:#000000;font-weight:500;">${name.trim()}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">Email</span>
                    <span style="font-size:14px;color:#000000;">${email.trim()}</span>
                  </td>
                </tr>
                ${
                  phone?.trim()
                    ? `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">โทรศัพท์</span>
                    <span style="font-size:14px;color:#000000;">${phone.trim()}</span>
                  </td>
                </tr>`
                    : ""
                }
                ${
                  projectType?.trim()
                    ? `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
                    <span style="font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">ประเภทโปรเจค</span>
                    <span style="font-size:14px;color:#000000;">${projectType.trim()}</span>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:8px;">ข้อความ</span>
                    <p style="margin:0;font-size:14px;color:#333333;line-height:1.7;white-space:pre-wrap;">${message.trim()}</p>
                  </td>
                </tr>
              </table>
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #eeeeee;">
                <a href="https://twodesk.co/admin/messages" style="display:inline-block;padding:10px 20px;background:#000000;color:#ffffff;text-decoration:none;font-size:13px;border-radius:4px;letter-spacing:0.04em;">
                  ดูใน Admin Panel
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f4;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:#999999;">
                Email นี้ถูกส่งอัตโนมัติจากระบบ Two Desks Studio
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `.trim(),
        });
      } catch (emailError) {
        // Log but don't fail the request — message already saved to DB
        console.error("Failed to send email notification:", emailError);
      }
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

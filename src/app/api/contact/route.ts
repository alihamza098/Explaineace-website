import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";

const MAX_LEN = { name: 120, email: 200, company: 200, short: 120, message: 4000 } as const;
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

/** Best-effort per-instance rate limit (resets on cold start; use a shared store for strict limits). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    hits.forEach((v, k) => {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    });
  }
  return recent.length > MAX_HITS;
}

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Strip control characters / line breaks so values are safe in email headers and subjects. */
const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n\t]+/g, " ").trim();
const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later or use WhatsApp / email directly." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
    if (str(body?.website).trim()) {
      return NextResponse.json({ success: true });
    }

    const name = oneLine(str(body?.name));
    const email = oneLine(str(body?.email));
    const company = oneLine(str(body?.company));
    const projectType = oneLine(str(body?.projectType));
    const videoLength = oneLine(str(body?.videoLength));
    const selectedPackage = oneLine(str(body?.selectedPackage));
    const message = str(body?.message).trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (
      name.length > MAX_LEN.name ||
      email.length > MAX_LEN.email ||
      company.length > MAX_LEN.company ||
      projectType.length > MAX_LEN.short ||
      videoLength.length > MAX_LEN.short ||
      selectedPackage.length > MAX_LEN.short ||
      message.length > MAX_LEN.message
    ) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    // HTML-escaped copies for the email template only
    const h = {
      name: esc(name),
      email: esc(email),
      company: esc(company),
      projectType: esc(projectType),
      videoLength: esc(videoLength),
      selectedPackage: esc(selectedPackage),
      message: esc(message),
    };

    const emailSubject = selectedPackage
      ? `🎬 New Lead: ${name} inquiring about [${selectedPackage}]`
      : `🎬 New EXPLAINERACE Inquiry from ${name} (${company || "Direct Client"})`;

    // 1. PRIMARY: Resend API (Most reliable, free, lands in inbox in 1s)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "EXPLAINERACE Inquiry <onboarding@resend.dev>",
            to: [siteConfig.contactEmail],
            reply_to: email,
            subject: emailSubject,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f111a; color: #ffffff; border-radius: 12px; border: 1px solid #23293e;">
                <div style="border-bottom: 1px solid #2a314d; padding-bottom: 16px; margin-bottom: 20px;">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #6366f1; letter-spacing: 1px;">New Website Inquiry</span>
                  <h1 style="font-size: 22px; font-weight: 800; margin: 8px 0 0 0; color: #ffffff;">${h.selectedPackage || "Video Project Inquiry"}</h1>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; width: 140px; font-weight: 600;">Client Name:</td>
                    <td style="padding: 10px 0; color: #ffffff; font-weight: 700;">${h.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Work Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${encodeURIComponent(email)}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${h.email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Company / URL:</td>
                    <td style="padding: 10px 0; color: #ffffff;">${h.company || "Not provided"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Package Selected:</td>
                    <td style="padding: 10px 0; color: #a5b4fc; font-weight: 700;">${h.selectedPackage || "Custom"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Video Category:</td>
                    <td style="padding: 10px 0; color: #ffffff;">${h.projectType || "General"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #1a2035;">
                    <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Target Length:</td>
                    <td style="padding: 10px 0; color: #ffffff;">${h.videoLength || "Not specified"}</td>
                  </tr>
                </table>

                <div style="background-color: #171c2b; border: 1px solid #23293e; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin: 0 0 8px 0; letter-spacing: 0.5px;">Project Details / Message:</h3>
                  <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0; margin: 0; white-space: pre-wrap;">${h.message}</p>
                </div>

                <div style="text-align: center; padding-top: 10px;">
                  <a href="mailto:${encodeURIComponent(email)}?subject=Re:%20${encodeURIComponent(emailSubject)}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 700;">Reply to ${h.name}</a>
                </div>
              </div>
            `,
          }),
        });

        if (resendResponse.ok) {
          const resendData = await resendResponse.json();
          return NextResponse.json({ success: true, provider: "resend", data: resendData });
        } else {
          const errData = await resendResponse.json().catch(() => null);
          console.error("Resend delivery failed:", errData);
        }
      } catch (resendErr) {
        console.error("Resend API error:", resendErr);
      }
    }

    // 2. SECONDARY: Web3Forms (if configured)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            subject: emailSubject,
            from_name: `${name} (EXPLAINERACE Inquiry)`,
            name,
            email,
            company: company || "Not provided",
            selectedPackage: selectedPackage || "Custom",
            projectType,
            videoLength,
            message,
          }),
        });

        if (web3Response.ok) {
          const web3Data = await web3Response.json();
          return NextResponse.json({ success: true, provider: "web3forms", data: web3Data });
        }
      } catch (web3Err) {
        console.error("Web3Forms API error:", web3Err);
      }
    }

    // 3. FALLBACK: FormSubmit via AJAX
    const payload = {
      "Selected Package": selectedPackage || "Custom / General Inquiry",
      "Client Name": name,
      "Work Email": email,
      "Company / Website": company || "Not provided",
      "Project Category": projectType || "General Inquiry",
      "Requested Video Length": videoLength || "Not specified",
      "Project Details": message,
      _subject: emailSubject,
      _replyto: email,
      _template: "table",
    };

    const response = await fetch(
      `https://formsubmit.co/ajax/${siteConfig.contactEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: siteConfig.siteUrl,
          Referer: `${siteConfig.siteUrl}/contact`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || (result && result.success === "false")) {
      console.warn("FormSubmit failed:", result);
      return NextResponse.json(
        {
          error:
            result?.message ||
            "Unable to deliver form inquiry at this moment. Please use WhatsApp or email directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      provider: "formsubmit",
      data: result,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email inquiry. Please reach out via WhatsApp or email directly." },
      { status: 500 }
    );
  }
}

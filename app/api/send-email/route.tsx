import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/utils/contactFormSchema";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Príliš veľa pokusov. Skúste to znova o chvíľu." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const { name, email, company, message } = validationResult.data;

    const { data, error } = await resend.emails.send({
      from: "TomexTrade Web Dotazník <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "michalandrejcaknew@gmail.com"],
      subject: `Contact Form: ${name}`,
      react: (
        <EmailTemplate
          name={name}
          email={email}
          company={company || ""}
          message={message}
        />
      ),
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nepodarilo sa odoslať email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email bol úspešne odoslaný", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Vnútorná chyba servera" },
      { status: 500 }
    );
  }
}

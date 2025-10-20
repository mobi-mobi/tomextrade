import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/utils/contactFormSchema";
import EmailTemplate from "@/components/EmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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
      from: "Tomex Web Dotazník <onboarding@resend.dev>",
      to: ["michalandrejcaknew@gmail.com"],
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

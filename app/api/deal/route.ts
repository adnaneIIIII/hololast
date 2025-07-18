import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const contact = await prisma.deal.create({
      data: {
        email,
      },
    });

    const subject = `New Contact Form Submission from ${email}`;
    const htmlContent = `
      <h2>New deal</h2>
      <p><strong>New email:</strong> ${email} </p>
    `;

    resend.emails.send({
      from: "support@mntdigital.com",
      to: "support@mntdigital.com",
      subject: "Hello World",
      html: htmlContent,
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phone, message } = body;

    const contact = await prisma.contactform.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        message,
      },
    });

    const subject = `New Contact Form Submission from ${firstname} ${lastname}`;
    const htmlContent = `
      <h2>New Message</h2>
      <p><strong>Name:</strong> ${firstname} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>message:</strong> ${message}</p>
    `;

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "zarveo@gmail.com",
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

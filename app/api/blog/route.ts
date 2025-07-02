import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, category } = body;

    const contact = await prisma.blog.create({
      data: {
        title,
        content,
        category,
      },
    });

    const subject = `New Contact Form Submission from ${title}`;
    const htmlContent = `
      <h2>New Post</h2>
      <p><strong>Name:</strong> ${title} </p>
      <p><strong>Product:</strong> ${content}</p>
      <p><strong>Country:</strong> ${category}</p>
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



export async function GET(req: NextRequest) {
  try {
    // Fetch all contacts
    const contacts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" }, // Optional: order by newest
    });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, category, author, tags, imgUrl } = body;

    const contact = await prisma.blog.create({
      data: {
        title,
        content,
        category,
        author,
        tags,
        imgUrl, // Placeholder image URL
      },
    });

    const subject = `New Contact Form Submission from ${title}`;
    const htmlContent = `
      <h2>New Post</h2>
      <p><strong>title:</strong> ${title} </p>
      <p><strong>content:</strong> ${content}</p>
      <p><strong>category:</strong> ${category}</p>
      <p><strong>author:</strong> ${author}</p>
      <p><strong>tags:</strong> ${tags}</p>
      <p><strong>imgUrl:</strong> ${imgUrl}</p>
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

export async function GET() {
  try {
    const contacts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch contacts" }), {
      status: 500,
    });
  }
}

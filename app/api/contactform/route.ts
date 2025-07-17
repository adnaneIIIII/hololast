import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phone, message } = body;

    // Save to database
    const contact = await prisma.contactform.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        message,
      },
    });

    // Send email notification
    const subject = `New Contact Form Submission from ${firstname} ${lastname}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${firstname} ${lastname}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This email was sent from the contact form on nmt.com
        </p>
      </div>
    `;
    const Content = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Thank you for contacting us!
        </h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p>Hi ${firstname},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          
          <h3 style="color: #333; margin-top: 25px;">Your Message Summary:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
            <p><strong>Name:</strong> ${firstname} ${lastname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <div style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 3px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="margin-top: 25px;">
            We typically respond within 24 hours during business days. If you have any urgent questions, 
            please don't hesitate to contact us directly.
          </p>
        </div>
        
        <div style="background: #007bff; color: white; padding: 20px; border-radius: 5px; text-align: center; margin-top: 30px;">
          <p style="margin: 0;"><strong>NMT Team</strong></p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">nmt.com</p>
        </div>
      </div>
    `;

    // Send the email - await the promise
    await resend.emails.send({
      from: "contact@mntdigital.com", // Use your verified domain
      to: "zarveo@gmail.com",   // Your receiving email

      subject: subject,
      html: htmlContent,
      // Optional: Add reply-to header so you can reply directly to the sender
      replyTo: email,
    });



      await resend.emails.send({
      from: "contact@mntdigital.com", // Use your verified domain
      to: email,   // Your receiving email
      subject: "Thank you for contacting NMT - We received your message",
      html: Content,

    });



    return NextResponse.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      contact 
    });

  } catch (error) {
    console.error("Error submitting form:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Failed to submit form",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
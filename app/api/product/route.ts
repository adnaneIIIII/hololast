import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Product_name, description, shortdescription, price, compareAtPrice, images } = body;

    const product = await prisma.products.create({
      data: {
        Product_name,
        description,
        shortdescription,
        price: parseFloat(price),
        compareAtPrice: parseFloat(compareAtPrice),
        images: Array.isArray(images) ? images : [images],
      },
    });

    return NextResponse.json({ success: true, product });
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
    const products = await prisma.products.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}
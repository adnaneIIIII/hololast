import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(blog), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

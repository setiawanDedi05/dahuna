import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  try {
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        img: data.image_url,
      },
    });
    redirect("/dashboard");
  } catch (error) {
    redirect("/sign-in");
  }
}

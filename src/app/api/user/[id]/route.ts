import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import prisma from "@/helper/db";

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  const body: any = await request.json();
  console.log(body);
  const session = await getServerSession(authOptions);
  if (!session) {
    NextResponse.json({ error: "You are not signed in yet." }, { status: 403 });
  }
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (user) {
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: body.name,
        phoneNumber: body.phoneNumber,
        birthDate:  new Date(body.birthDate),
        occupation: body.occupation,
      },
    });
    return NextResponse.json(updatedUser);
  }
}


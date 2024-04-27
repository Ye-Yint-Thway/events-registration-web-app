import prisma from "@/helper/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const session = getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in first." });
  }
  const userInEvent = await prisma.event.findUnique({where: {id: body.eventId, users: {some: {userId: body.userId}}}, })
  if (userInEvent){
    return NextResponse.json({error: "User already registered."}, {status: 409})
  }
  const registeredevent = await prisma.event.update({
    data: { users: { create: [{ user: {connect: {id: body.userId}} }] } }, 
    // data: { users: {create: {connect: {id: body.userId}}}},
    where: { id: body.eventId },
  });
  return NextResponse.json(registeredevent);
}

export async function DELETE(req: Request){
  const body = await req.json();
  const session = getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in first." });
  }
  const deleteUser = await prisma.userEvents.deleteMany({where: {eventId: body.eventId, userId: body.userId}})
 return NextResponse.json(deleteUser) 
}

export async function GET() {
 const  userEvents = await prisma.userEvents.findMany();
 return NextResponse.json(userEvents);
}
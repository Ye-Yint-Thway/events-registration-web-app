import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/helper/db";

export async function GET() {
  try {
    const events = await prisma.event.findMany(); 
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ error: "Failed to fetch events" });
  }
}

export async function POST(req: Request){
  const session = getServerSession();
  if(!session){  return NextResponse.json({error: "Please log in first."});
  }  
  const body = await req.json();
  const event = await prisma.event.create({data: {title: body.title, category: body.category, description: body.description, location: body.location, date: new Date(body.date), time: body.time, photoURL: body.photoURL}})
  return NextResponse.json(event);
}




import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {id: string}}){
    
    const body: any = await req.json();
    const userEvent = await prisma.userEvents.findUnique({ where: { id: params.id } });
    console.log(body)
    if(!userEvent){
        return NextResponse.json({ error: "Event does not exist" }, { status: 404 });
    }
     const changeStatus = await prisma.userEvents.update({
        data: { status: body.status },
        where: { id : params.id},
     })
     return NextResponse.json(changeStatus);
} 


import prisma from "@/helper/db";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, {params: {id }}: {params : {id: string}}){
    try {
        if(id){
            const data = await prisma.event.delete({where: {id}})
           return NextResponse.json(data);
        
        }
        else {
            return NextResponse.json({error: "Invalid ID"}, {status: 403});
            }
        
    } catch (error) {
        return NextResponse.json(error);
    }
  }
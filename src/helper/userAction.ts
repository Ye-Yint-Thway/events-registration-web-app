"use server";

import prisma from "./db"

const getUser = async () =>{
  const user = await prisma.user.findMany();
  return user;
}

const getOneUser = async (email: string) =>{
  const user = await prisma.user.findFirst({where: {email}})
  return user;
}

export {getUser, getOneUser}
import prisma from "@/helper/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "inspector";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            authorization: { params: { prompt: "select_account" } },
        }),
    ],
    session: {
        strategy: "jwt"
    }
};
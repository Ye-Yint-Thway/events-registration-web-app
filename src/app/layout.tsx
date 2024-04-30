import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/helper/NextAuthProvider";
import QueryProvider from "@/helper/QueryProvider";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Register",
  description: "A web app where admin can create events and user can register",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <QueryProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

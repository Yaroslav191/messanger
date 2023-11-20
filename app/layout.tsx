import Header from "@/component/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/component/Providers";

export const metadata: Metadata = {
   title: "Messanger",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className="max-w-screen-xl mx-auto px-4 overflow-x-hidden">
            <Providers>
               <Header />
               {children}
            </Providers>
         </body>
      </html>
   );
}

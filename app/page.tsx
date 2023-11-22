"use client";

import { useSession } from "next-auth/react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { useModalStore } from "@/store/ModalStore";

import Image from "next/image";

export default function Home() {
   const { data: session } = useSession();

   return (
      <main className="relative">
         <MessageList />
         {session && <ChatInput />}
      </main>
   );
}

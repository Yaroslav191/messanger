"use client";

import { useSession } from "next-auth/react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

import Image from "next/image";
import { useEffect, useState } from "react";
import { databases } from "@/appwrite";

export default function Home() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({} as MessagesResponse);
  const [loadMessages, setLoadMessages] = useState({} as Message);

  useEffect(() => {
    const getMessages = async () => {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
      );

      setData(res as MessagesResponse);
    };

    getMessages();
  }, [loadMessages]);

  return (
    <main>
      {session ? (
        <>
          <MessageList
            messages={data.documents}
            setLoadMessages={setLoadMessages}
            loadMessages={loadMessages}
          />

          <ChatInput
            message={message}
            setMessage={setMessage}
            setLoadMessages={setLoadMessages}
          />
        </>
      ) : (
        <>
          <div className="h-[70vh] w-full flex justify-center items-center  flex-col">
            <div className="mb-10 text-[#0766de] text-2xl">
              Welcome to the message app
            </div>
            <Image
              src="https://links.papareact.com/jne"
              width={150}
              height={50}
              alt="Avatar image"
            />
          </div>
        </>
      )}
    </main>
  );
}

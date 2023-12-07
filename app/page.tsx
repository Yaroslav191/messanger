"use client";

import { useSession } from "next-auth/react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

import Image from "next/image";
import { useEffect, useState } from "react";
import { databases } from "@/appwrite";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({} as MessagesResponse);
  const [loadMessages, setLoadMessages] = useState({} as Message);
  const router = useRouter();

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

  useEffect(() => {
    if (!session) router.push("/authorization");
    else router.push("/");
  }, [session]);

  return (
    <main>
      {session && (
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
      )}
    </main>
  );
}

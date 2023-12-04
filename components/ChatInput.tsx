"use cleient";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import React from "react";
import { useSession } from "next-auth/react";

const ChatInput = ({
  message,
  setMessage,
  setLoadMessages,
}: {
  message: string;
  setMessage: (message: string) => void;
  setLoadMessages: (loadMessage: Message) => void;
}) => {
  const { data: session, status } = useSession();
  const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    const messageToSend = message;

    setMessage("");

    const id = uuid();

    const newMessage: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      userame: session?.user?.name || "",
      profileImage: session?.user?.image || "",
      email: session?.user?.email || "",
    };

    const uploadMessageToUpstash = async () => {
      try {
        const res = await fetch("/api/addMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newMessage }),
        });

        const data = await res.json();

        setLoadMessages(newMessage);
      } catch (error) {
        console.log(error);
      }
    };

    uploadMessageToUpstash();
  };

  return (
    <form
      className="flex fixed bottom-0 z-50 px-10 py-5 space-x-2 border-t border-gray-100 w-full bg-white"
      onSubmit={addMessage}>
      <input
        className="flex-1 mr-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        type="text"
        placeholder="Enter message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={!message}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        Send
      </button>
    </form>
  );
};

export default ChatInput;

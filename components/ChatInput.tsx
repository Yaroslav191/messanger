"use cleient";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import React from "react";

const ChatInput = () => {
   const [message, setMessage] = useState("");

   const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!message) return;

      const messageToSend = message;

      setMessage("");

      const id = uuid();

      const newMessage: newMessage = {
         id,
         message: messageToSend,
         created_at: Date.now(),
         userame: "Yaroslav",
         profileImage:
            "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
         email: "yarslavv86@gmail.com",
      };

      const uploadMessageToUpstash = async () => {
         const res = fetch("/api/addMessage", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ newMessage }),
         });

         const data = await res.json();
      };
   };

   return (
      <form
         className="flex fixed bottom-0 z-50 px-10 py-5 space-x-2 border-t border-gray-100 w-full"
         onSubmit={addMessage}
      >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
         >
            Send
         </button>
      </form>
   );
};

export default ChatInput;

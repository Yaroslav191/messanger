"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clientPusher } from "@/pusher";
import { useSession } from "next-auth/react";

const MessageList = ({
  messages,
  setLoadMessages,
  loadMessages,
}: {
  messages: MessageResponse[];
  setLoadMessages: (loadMessage: Message) => void;
  loadMessages: Message;
}) => {
  const bottomRef = useRef(null);
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const isUser = session?.user;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      setLoadMessages({} as Message);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      console.log("scroll");
    }, 2000);
  }, []);

  return (
    <>
      <ul className="space-y-5 px-5 pt-8 pb-32 w-full ">
        {messages &&
          messages.map((item) => {
            return (
              <li
                key={item.id}
                className={`flex w-full ${
                  isUser?.email === JSON.parse(item.message).email &&
                  "justify-end"
                }`}>
                <div
                  className={`flex-shrink-0 ${
                    isUser?.email === JSON.parse(item.message).email &&
                    "order-2"
                  }`}>
                  <Image
                    src={JSON.parse(item.message).profileImage}
                    width={50}
                    height={50}
                    alt="profile-image"
                    className="rounded-full mx-2"
                  />
                </div>

                <div>
                  <p
                    className={`text-[0.65rem] px-[2px] pb-[2px] text-red-400 ${
                      isUser?.email === JSON.parse(item.message).email
                        ? "text-blue-400 text-right"
                        : "text-red-400 "
                    }`}>
                    {JSON.parse(item.message).userame}
                  </p>

                  <div className="flex items-end">
                    <div
                      className={`px-3 py-2 rounded-lg w-fit text-white bg-red-400 ${
                        isUser?.email === JSON.parse(item.message).email
                          ? "bg-blue-400 ml-auto order-2"
                          : "bg-red-400"
                      }`}>
                      <p>{JSON.parse(item.message).message}</p>
                    </div>
                    <p
                      className={`text-[0.65rem] italic px-2 text-gray-300 ${
                        isUser?.email === JSON.parse(item.message).email &&
                        "text-right"
                      }`}>
                      {new Date(
                        JSON.parse(item.message).created_at
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div ref={bottomRef} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MessageList;

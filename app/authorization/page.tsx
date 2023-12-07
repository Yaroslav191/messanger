"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session]);

  return (
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
  );
};

export default page;

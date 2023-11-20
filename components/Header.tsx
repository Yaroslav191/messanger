"use client";

import React from "react";
import { useSession, getSession, signIn } from "next-auth/react";
import Image from "next/image";
import SignBtn from "./SignBtn";

const Header = () => {
   const { data: session, status } = useSession();
   console.log(session);
   return <div className="flex justify-between h-[100px] items-center">
            <div>
               {session?.user?.image && 
               <div className="flex flex-row-reverse">
                  <div className="ml-3 text-sm">
                     <div className="text-cyan-500">Loggeg as</div>
                     <div className="font-medium">{session?.user?.name}</div>
                  </div>
                  <div>
                        <Image src={session?.user?.image} width={50} height={50} alt="Avatar iamge" className="rounded-full"/>
                  </div>
                  
               </div>
            }
               

            </div>
            <SignBtn/>
   </div>;
};

export default Header;

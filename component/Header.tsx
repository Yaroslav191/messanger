"use client";

import React from "react";
import { useSession, getSession } from "next-auth/react";

const Header = () => {
   const { data: session, status } = useSession();
   console.log(status);
   return <div>Header</div>;
};

export default Header;

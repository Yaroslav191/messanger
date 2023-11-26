import { useSession, signIn, signOut } from "next-auth/react";

export default function SignBtn() {
   const { data: session } = useSession();
   if (session) {
      return (
         <>
            <button
               onClick={() => signOut()}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
               Sign out
            </button>
         </>
      );
   }
   return (
      <>
         <button
            onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
            Sign in
         </button>
      </>
   );
}

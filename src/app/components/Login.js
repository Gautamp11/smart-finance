"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>
          <IoIosLogOut className="text-2xl cursor-pointer" />
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="bg-primary px-4 py-2 rounded m-2 text-light font-bold hover:scale-98 transition-transform"
        onClick={() => signIn("google")}
      >
        Sign in
      </button>
    </>
  );
}

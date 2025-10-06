"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import Loader from "./Loader";
import LoaderMini from "./LoaderMini";

export default function Login() {
  const { data: session, status } = useSession();

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
        className="cursor-pointer bg-primary px-4 py-2 rounded m-2 text-light font-bold hover:bg-accent hover:scale-98 transition-transform"
        onClick={() => signIn("google")}
        // disabled={status === "loading"}
      >
        {status === "loading" ? <LoaderMini /> : "Sign In"}
      </button>
    </>
  );
}

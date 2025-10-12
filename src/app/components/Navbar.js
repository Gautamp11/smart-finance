"use client";
import Link from "next/link";
import Login from "./Login";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const Navbar = ({ href }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    // Dark background with light text
    <>
      {status === "authenticated" && (
        <nav className="p-4 flex items-center justify-between text-white ">
          <div className="font-bold  text-2xl">Smart Finance</div>
          <ul className="flex  gap-6 items-center font-semibold text-md">
            <li className="p-2 transition-all">
              <Link
                href="/dashboard"
                className={`p-2 transition-all block ${
                  pathname === "/dashboard"
                    ? "bg-primary text-light rounded hover:scale-98"
                    : "hover:scale-98 hover:bg-primary hover:text-light hover:rounded"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="p-2 transition-all">
              <Link
                href="/summary"
                className={`p-2 transition-all block ${
                  pathname === "/summary"
                    ? "bg-primary text-light rounded hover:scale-98"
                    : "hover:scale-98 hover:bg-primary hover:text-light hover:rounded"
                }`}
              >
                Summary
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center gap-2">
                {user?.image ? (
                  <img
                    src={user?.image}
                    className="w-10 h-10 rounded-full"
                    alt="user profile"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </div>
                )}
              </Link>
            </li>
            <li>
              <Login />
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

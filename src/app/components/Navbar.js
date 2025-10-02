"use client";
import Link from "next/link";
import Login from "./Login";
import { usePathname } from "next/navigation";

export const Navbar = ({ href, user }) => {
  const pathname = usePathname();

  return (
    // Dark background with light text
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
            <img
              src={user?.image}
              className="w-10 h-10 rounded-full"
              alt="user profile"
            />
          </Link>
        </li>
        <li>
          <Login />
        </li>
      </ul>
    </nav>
  );
};

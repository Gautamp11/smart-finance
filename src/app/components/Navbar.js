import Link from "next/link";
import Login from "./Login";

export const Navbar = ({ user }) => {
  return (
    // Dark background with light text
    <nav className="p-4 flex items-center justify-between">
      <div className="font-bold ml-16 text-xl">Smart Finance</div>
      <ul className="flex mr-16 gap-6 items-center">
        <li className="p-2 hover:scale-98 hover:bg-primary hover:text-light hover:rounded hover:p-2  transition-all ">
          <Link href="/" className=" no-underline">
            Home
          </Link>
        </li>
        <li className="p-2 hover:scale-98 hover:bg-primary hover:text-light hover:rounded hover:p-2  transition-all ">
          <Link href="/dashboard" className=" no-underline">
            Dashboard
          </Link>
        </li>
        <li className="p-2 hover:scale-98 hover:bg-primary hover:text-light hover:rounded hover:p-2  transition-all ">
          <Link href="/about" className=" no-underline">
            About
          </Link>
        </li>

        <li>
          <Link
            href="/profile"
            className=" no-underline"
            className="flex items-center gap-2"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={user?.image}
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

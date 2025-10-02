import { getServerSession } from "next-auth";
import { Navbar } from "../components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

export default async function Layout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      {/* <Navbar user={session?.user} /> */}
      <div className="max-w-7xl min-h-screen p-12">{children}</div>
    </>
  );
}

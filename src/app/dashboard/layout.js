import { getServerSession } from "next-auth";
import { Navbar } from "../components/Navbar";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getServerSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="p-6">{children}</main>
    </>
  );
}

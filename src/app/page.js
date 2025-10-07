import { redirect } from "next/navigation";
import Login from "./components/Login";
import { auth } from "./_lib/auth";

export default async function HomePage() {
  const session = await auth();
  console.log(session);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col  justify-center items-center p-16">
      <h1 className="text-5xl font-bold mb-4">Welcome to Smart Finance</h1>
      <p className="text-xl mb-8 text-white">
        Plan your Budget and observe it later.
      </p>
      <Login />
    </main>
  );
}

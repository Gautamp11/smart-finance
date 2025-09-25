import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "./components/Login";

export default async function HomePage() {
  const session = await getServerSession();

  // If logged in, send user straight to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not logged in, show landing/login
  return (
    <main>
      <h1 className="text-4xl font-bold mb-4">Welcome to Smart Finance</h1>
      <p className="text-lg mb-8 text-gray-700">
        Plan your Budget and observe it later.
      </p>
      <Login />
    </main>
  );
}

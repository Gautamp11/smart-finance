import { redirect } from "next/navigation";
import Login from "./components/Login";
import { auth } from "./_lib/auth";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col text-center justify-center items-center mt-40 p-16">
      <h1 className="text-4xl sm:text-5xl  font-bold mb-4">
        Welcome to Smart<span className="text-primary"> Finance</span>
      </h1>
      <p className="text-xl mb-8 text-gray-300">
        Plan your Budget and observe it later.
      </p>
      <Login />
    </div>
  );
}

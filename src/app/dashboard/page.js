import { auth } from "../_lib/auth";
import { getFinancialData } from "../_lib/dataService";
import Dashboard from "../components/Dashboard";

export default async function DashboardPage({ searchParams }) {
  const { user } = await auth();
  const userId = user?.id;

  const today = new Date();
  const currentMonthKey = today.toISOString().slice(0, 7);

  const monthKey = searchParams.month || currentMonthKey;
  const data = await getFinancialData({ userId, monthKey });

  return (
    <Dashboard
      initialFinancialData={data}
      userId={userId}
      initialMonthKey={monthKey}
    />
  );
}

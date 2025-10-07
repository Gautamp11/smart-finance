import { auth } from "../_lib/auth";
import { getAllFinancialData } from "../_lib/dataService";
import { Navbar } from "../components/Navbar";
import Summary from "../components/Summary";

const SummaryPage = async () => {
  const { user } = await auth();

  const data = await getAllFinancialData(user?.id);

  return (
    <div>
      <main>
        <Summary user={user} financialData={data} />
      </main>
    </div>
  );
};

export default SummaryPage;

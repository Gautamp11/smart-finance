"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Summary = () => {
  const router = useRouter();
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Load all monthly data from localStorage
    const allData = [];
    const current = new Date();

    for (let i = -12; i <= 0; i++) {
      const date = new Date(current.getFullYear(), current.getMonth() + i, 1);
      const monthKey = date.toISOString().slice(0, 7);
      const savedData = localStorage.getItem(`financialData_${monthKey}`);

      if (savedData) {
        const data = JSON.parse(savedData);
        const totals = calculateTotals(data);

        allData.push({
          month: monthKey,
          label: date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
          }),
          data: data,
          totals: totals,
        });
      }
    }

    setMonthlyData(allData.reverse()); // Show latest first
  }, []);

  const calculateTotals = (financialData) => {
    const totalIncome = Object.values(financialData.income).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalExpenses = Object.values(financialData.expenses).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalBills = Object.values(financialData.bills).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalBalance = Object.values(financialData.balance).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalInvestments = Object.values(financialData.investments).reduce(
      (sum, val) => sum + val,
      0
    );
    const totalSavings = financialData.savings.amount;

    const netWorth = totalBalance + totalInvestments + totalSavings;
    const disposableIncome = totalIncome - totalExpenses - totalBills;
    const savingsRate =
      totalIncome > 0 ? (disposableIncome / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      totalBills,
      totalBalance,
      totalInvestments,
      totalSavings,
      netWorth,
      disposableIncome,
      savingsRate: Math.round(savingsRate),
    };
  };

  const navigateToMonth = (month) => {
    router.push(`/?month=${month}`);
  };

  const navigateToDashboard = () => {
    router.push("/");
  };

  if (monthlyData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Data Available
          </h1>
          <p className="text-gray-600 mb-6">
            You haven't added any financial data yet.
          </p>
          <button
            onClick={navigateToDashboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 text-light">
          <div>
            <h1 className="text-3xl font-bold ">Monthly Summaries</h1>
            <p className="text-gray-400">Overview of your financial progress</p>
          </div>
          <button
            onClick={navigateToDashboard}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monthlyData.map((month) => (
            <div
              key={month.month}
              className="bg-slate-200 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigateToMonth(month.month)}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  {month.label}
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Income</p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{month.totals.totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expenses</p>
                    <p className="text-lg font-bold text-red-600">
                      ₹{month.totals.totalExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Disposable</p>
                    <p
                      className={`text-lg font-bold ${
                        month.totals.disposableIncome >= 0
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹{month.totals.disposableIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Savings Rate</p>
                    <p
                      className={`text-lg font-bold ${
                        month.totals.savingsRate >= 20
                          ? "text-green-600"
                          : month.totals.savingsRate >= 10
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {month.totals.savingsRate}%
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Net Worth</p>
                  <p className="text-xl font-bold text-purple-600">
                    ₹{month.totals.netWorth.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <p className="text-sm text-blue-600 font-medium text-center">
                  Click to edit this month
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for months without data */}
        {monthlyData.length < 12 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              You have data for {monthlyData.length} month(s). Add more data to
              see complete yearly overview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;

"use client";
import { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const defaultData = {
    income: { salary: 51307, bonus: 6579 },
    expenses: {
      food: 6000,
      rent: 8000,
      emi: 0,
      kitty: 2000,
      misc: 1000,
      sip: 8000,
    },
    investments: {
      "grow stocks": 128000,
      "kotak stocks": 47115,
      "mutual funds": 130000,
    },
    bills: { hdfc: 1280, idfc: 998, flipkart: 521, amazon: 0 },
    balance: { hdfc: 59650, pnb: 76, kotak: 2800, idfc: 0 },
    savings: { savings: 0 },
  };

  const [financialData, setFinancialData] = useState(defaultData);

  // Load from localStorage once on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`financialData_${currentMonth}`);
    if (savedData) {
      setFinancialData(JSON.parse(savedData));
    }
  }, [currentMonth]);

  // Save to localStorage whenever financialData changes
  useEffect(() => {
    localStorage.setItem(
      `financialData_${currentMonth}`,
      JSON.stringify(financialData)
    );
  }, [financialData, currentMonth]);

  // Unified handler for all form changes
  const handleDataChange = (category, key, value) => {
    const numericValue = parseFloat(value) || 0;

    setFinancialData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: numericValue,
      },
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
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
    const savingAfterExpense = totalBalance - totalExpenses;
    const totalSavings = savingAfterExpense + financialData.savings.savings;

    const netWorth = totalBalance + totalInvestments + savingAfterExpense;
    const disposableIncome = totalIncome - totalExpenses - totalBills;

    return {
      totalIncome,
      totalExpenses,
      totalBills,
      totalBalance,
      totalSavings,
      totalInvestments,
      savingAfterExpense,
      netWorth,
      disposableIncome,
    };
  };

  const totals = calculateTotals();

  // Generate month options (12 months in the past, the current month, and 3 future months)
  const generateMonthOptions = () => {
    const options = [];
    const now = new Date(); // Use 'now' for clarity
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Loop from 12 months in the past (i = -12) up to 3 months in the future (i = 3)
    // This gives 12 past + current + 3 future = 16 months total.
    for (let i = -12; i <= 3; i++) {
      // Create a new Date object for the 1st of the month offset by 'i'
      const date = new Date(currentYear, currentMonth + i, 1);

      // Format the value as YYYY-MM (e.g., "2025-10") for easy sorting/storage
      const year = date.getFullYear();
      // getMonth() is 0-indexed, so add 1 and pad to 2 digits
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const value = `${year}-${month}`;

      // Format the label as "Month Year" (e.g., "October 2025")
      const label = date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      });

      options.push({ value, label });
    }

    return options;
  };

  const monthOptions = generateMonthOptions();

  const navigateToSummary = () => {
    router.push("/summary");
  };

  return (
    <div className="w-full min-h-screen  p-4">
      {/* Header with Month Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-light">Financial Dashboard</h1>
          <p className="text-gray-400">Manage your monthly finances</p>
        </div>

        <div>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="px-4 py-2 border border-slate-500 rounded-lg bg-slate-500 outline-none focus:ring-1 focus:ring-light "
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={navigateToSummary}
            className="mx-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
          >
            View All Summaries
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 ">
          <h3 className="text-sm text-gray-500">Net Worth</h3>
          <p className="text-xl font-bold text-green-600">
            ₹{totals.netWorth.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Disposable Income</h3>
          <p className="text-xl font-bold text-blue-600">
            ₹{totals.disposableIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Total Income</h3>
          <p className="text-xl font-bold text-green-600">
            ₹{totals.totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Total Expenses</h3>
          <p className="text-xl font-bold text-red-600">
            ₹{totals.totalExpenses.toLocaleString()}
          </p>
        </div>{" "}
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Total Investments</h3>
          <p className="text-xl font-bold text-green-600">
            ₹{totals.totalInvestments.toLocaleString()}
          </p>
        </div>{" "}
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Current Bank Balance</h3>
          <p className="text-xl font-bold text-green-600">
            ₹{totals.totalBalance.toLocaleString()}
          </p>
        </div>{" "}
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Savings after expenses</h3>
          <p className="text-xl font-bold text-blue-600">
            ₹{totals.savingAfterExpense.toLocaleString()}
          </p>
        </div>{" "}
        <div className="bg-gray-200 transition-all hover:bg-gray-300 p-4 rounded-lg shadow-sm mb-2 border">
          <h3 className="text-sm text-gray-500">Total Savings</h3>
          <p className="text-xl font-bold text-blue-600">
            ₹{totals.totalSavings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Current Month Display */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-800">
          Editing:{" "}
          {new Date(currentMonth).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
          })}
        </h2>
      </div>

      {/* Form Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormCard
          category="income"
          data={financialData.income}
          onDataChange={handleDataChange}
        />
        <FormCard
          category="expenses"
          data={financialData.expenses}
          onDataChange={handleDataChange}
        />
        <FormCard
          category="investments"
          data={financialData.investments}
          onDataChange={handleDataChange}
        />
        <FormCard
          category="bills"
          data={financialData.bills}
          onDataChange={handleDataChange}
        />
        <FormCard
          category="balance"
          data={financialData.balance}
          onDataChange={handleDataChange}
        />
        <FormCard
          category="savings"
          data={financialData.savings}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;

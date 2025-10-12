"use client";
import { useEffect, useMemo, useState } from "react";
import FormCard from "./FormCard";
import { useRouter } from "next/navigation";
import Card from "../_ui/Card";
import { DollarSign, TrendingUp, TrendingDown, BookOpen } from "lucide-react";
import { calculateTotals } from "../utils/calculateTotals";
import { updateFinancialData } from "../_lib/dataService";
import debounce from "debounce";
import { toast } from "sonner";

const Dashboard = ({ initialFinancialData, userId, initialMonthKey }) => {
  const [financialData, setFinancialData] = useState(
    initialFinancialData || {
      income: {},
      expenses: {},
      investments: {},
      bills: {},
      balance: {},
      savings: {},
    }
  );
  const router = useRouter();
  const [monthKey, setMonthKey] = useState(initialMonthKey);
  const [isSaving, setIsSaving] = useState(false);

  // Create debounced save function directly
  const debouncedSave = useMemo(
    () =>
      debounce(async (dataToSave) => {
        if (!userId || !monthKey) return;

        setIsSaving(true);
        try {
          await updateFinancialData({
            userId,
            monthKey,
            updatedData: dataToSave,
          });
          toast.success("Saved");
        } catch (error) {
          toast.error("Failed to save");
        } finally {
          setIsSaving(false);
        }
      }, 1500), // 1.5 second delay
    [userId, monthKey]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.clear();
    };
  }, [debouncedSave]);

  // Handle data changes
  function handleDataChange(category, key, value) {
    const numericValue = parseFloat(value) || 0;

    const updatedData = {
      ...financialData,
      [category]: {
        ...financialData[category],
        [key]: numericValue,
      },
    };

    setFinancialData(updatedData);
    debouncedSave(updatedData);
  }

  // Add new field to category
  const handleAddField = (category, fieldName) => {
    if (!fieldName.trim()) return;

    const updatedData = {
      ...financialData,
      [category]: {
        ...financialData[category],
        [fieldName.trim()]: 0,
      },
    };

    setFinancialData(updatedData);
    debouncedSave(updatedData);
    toast.success(`Added ${fieldName} field`);
  };

  // Delete field from category
  const handleDeleteField = (category, fieldName) => {
    const updatedCategory = { ...financialData[category] };
    delete updatedCategory[fieldName];

    const updatedData = {
      ...financialData,
      [category]: updatedCategory,
    };

    setFinancialData(updatedData);
    debouncedSave(updatedData);
    toast.success(`Deleted ${fieldName} field`);
  };

  // Calculate totals
  const totals = calculateTotals(financialData);

  const summaryCards = [
    {
      title: "Net Worth",
      value: totals.netWorth,
      valueClassName: "text-purple-600",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      title: "Total Income",
      value: totals.totalIncome,
      valueClassName: "text-green-600",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      title: "Disposable Income",
      value: totals.disposableIncome,
      valueClassName:
        totals.disposableIncome >= 0 ? "text-blue-600" : "text-red-600",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      title: "Total Outflow (E+B)",
      value: totals.totalExpenses + totals.totalBills,
      valueClassName: "text-red-600",
      icon: <TrendingDown className="w-4 h-4" />,
    },
    {
      title: "Total Investments",
      value: totals.totalInvestments,
      valueClassName: "text-green-600",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      title: "Current Bank Balance",
      value: totals.totalBalance,
      valueClassName: "text-green-600",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      title: "Cash Flow after Expenses",
      value: totals.savingAfterExpense,
      valueClassName:
        totals.savingAfterExpense >= 0 ? "text-blue-600" : "text-red-600",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      title: "Savings",
      value: totals.savings,
      valueClassName: "text-blue-600",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  // Generate month options
  const generateMonthOptions = () => {
    const options = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    for (let i = -12; i <= 3; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const value = `${year}-${month}`;
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
    <div className="w-full min-h-screen p-4">
      {/* Header with Month Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-light">Financial Dashboard</h1>
          <p className="text-gray-400">Manage your monthly finances</p>
        </div>

        <div className="flex">
          <select
            value={monthKey}
            onChange={(e) => setMonthKey(e.target.value)}
            className="cursor-pointer px-4 py-2 border border-slate-500 rounded-lg bg-slate-500 outline-none focus:ring-1 focus:ring-light"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={navigateToSummary}
            className="cursor-pointer mx-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
          >
            View All Summaries
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-10">
        {summaryCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            valueClassName={card.valueClassName}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Current Editing Month Display */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-bold text-gray-400">
          Editing:{" "}
          {new Date(monthKey).toLocaleDateString("en-IN", {
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
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
        <FormCard
          category="expenses"
          data={financialData.expenses}
          onDataChange={handleDataChange}
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
        <FormCard
          category="investments"
          data={financialData.investments}
          onDataChange={handleDataChange}
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
        <FormCard
          category="bills"
          data={financialData.bills}
          onDataChange={handleDataChange}
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
        <FormCard
          category="balance"
          data={financialData.balance}
          onDataChange={handleDataChange}
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
        <FormCard
          category="savings"
          data={financialData.savings}
          onDataChange={handleDataChange}
          onAddField={handleAddField}
          onDeleteField={handleDeleteField}
        />
      </div>
    </div>
  );
};

export default Dashboard;

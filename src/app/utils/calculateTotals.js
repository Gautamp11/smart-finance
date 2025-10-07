export const calculateTotals = (financialData) => {
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
  const disposableIncome = totalIncome - totalExpenses - totalBills;
  const savingAfterExpense = disposableIncome + totalBalance;
  const netWorth = totalBalance + totalInvestments + disposableIncome;
  const savings = financialData.savings.savings;
  const totalSavings = savingAfterExpense + financialData.savings.savings;
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
    savings,
  };
};

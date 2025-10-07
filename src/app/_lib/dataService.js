import { supabase } from "./supabase";

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createUser(user) {
  const { data, error } = await supabase.from("users").insert([user]).select();
  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function getFinancialData({ userId, monthKey }) {
  let { data, error } = await supabase
    .from("financial_data")
    .select("data")
    .eq("user_id", userId)
    .eq("month_key", monthKey)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data.data;
}

// In your dataService file - FIX THIS FUNCTION
export async function updateFinancialData({ userId, monthKey, updatedData }) {
  // parameter name should be updatedData
  const rowToUpsert = {
    user_id: userId,
    month_key: monthKey,
    data: updatedData, // This should be updatedData, not financialData
  };

  console.log("Upserting data:", rowToUpsert); // Add logging for debugging

  const { data, error } = await supabase
    .from("financial_data")
    .upsert(rowToUpsert, { onConflict: ["user_id", "month_key"] })
    .select();

  if (error) {
    console.error("Supabase Error during UPSERT:", error);
    throw new Error(`Failed to save financial data: ${error.message}`);
  }

  return data[0];
}

export async function getAllFinancialData(userId) {
  let { data, error } = await supabase
    .from("financial_data")
    .select("data, month_key")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

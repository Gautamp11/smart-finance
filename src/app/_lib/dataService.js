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
    // If no data found, return default structure with common fields
    if (error.code === "PGRST116") {
      // PGRST116 = no rows returned
      console.log("No existing data found, returning default structure");

      const defaultData = {
        income: {
          salary: 0,
          bonus: 0,
          other: 0,
        },
        expenses: {
          rent: 0,
          food: 0,
          transportation: 0,
          sip: 0,
          entertainment: 0,
          healthcare: 0,
        },
        investments: {
          stocks: 0,
          mutual_funds: 0,
        },
        bills: {
          credit_card: 0,
          internet: 0,
          electricity: 0,
        },
        balance: {
          main_bank: 0,
          savings_account: 0,
        },
        savings: {
          savings: 0,
        },
      };

      // Optionally save this default structure to database
      try {
        await supabase.from("financial_data").insert({
          user_id: userId,
          month_key: monthKey,
          data: defaultData,
        });
        console.log("Default data created for new user");
      } catch (insertError) {
        console.log("Could not save default data to DB, using local default");
      }

      return defaultData;
    }
    console.error("Database error:", error);
    throw new Error("Failed to fetch data");
  }

  return data?.data;
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

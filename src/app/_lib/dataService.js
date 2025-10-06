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

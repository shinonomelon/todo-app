"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export async function deleteTodo(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

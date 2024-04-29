"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export async function checkTodo(id: string, is_done: boolean) {
  const supabase = createClient();

  const { error } = await supabase
    .from("todos")
    .update({ is_done: !is_done })
    .eq("id", id)
    .select();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

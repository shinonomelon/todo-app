"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export async function editTodo(formData: FormData, todoId: string) {
  const supabase = createClient();
  const text = formData.get("todo") as string;

  const { error } = await supabase.from("todos").update({ text: text }).eq("id", todoId).select();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

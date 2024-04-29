"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export async function createTodo(formData: FormData) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const todoData = {
    text: formData.get("todo") as string,
    user_id: session.user.id,
  };

  const { error } = await supabase.from("todos").insert(todoData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

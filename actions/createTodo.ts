"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";
import { z } from "zod";

export async function createTodo(formData: FormData) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
    return;
  }

  const schema = z.object({
    text: z.string().min(1),
    user_id: z.string(),
  });

  const parse = schema.safeParse({
    text: formData.get("todo"),
    user_id: session.user?.id,
  });

  if (!parse.success) {
    throw new Error("Failed to create todo");
  }

  try {
    const { error } = await supabase.from("todos").insert(parse.data);

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
  } catch (e) {
    throw new Error("Failed to create todo");
  }
}

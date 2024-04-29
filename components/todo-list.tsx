import { createClient } from "@/libs/supabase/server";

import { TodoItem } from "./todo-item";

export async function TodoList() {
  const supabase = createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("created_at", { ascending: false });

  return (
    <ul className="mt-8 flex flex-col">
      {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
}

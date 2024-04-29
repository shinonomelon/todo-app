import { Suspense } from "react";

import { CreateTodoForm } from "@/components/create-todo-form";
import { TodoList } from "@/components/todo-list";

export default async function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center p-8 md:px-24">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <CreateTodoForm />
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </main>
  );
}

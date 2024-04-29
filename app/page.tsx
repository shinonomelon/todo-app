import { Suspense } from "react";

import { CreateTodoForm } from "@/components/create-todo-form";
import { TodoList } from "@/components/todo-list";

export default async function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <CreateTodoForm />
      <div className="w-full">
        <Suspense fallback={<div>loading...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </main>
  );
}

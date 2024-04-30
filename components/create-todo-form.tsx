"use client";

import { useRef } from "react";

import { createTodo } from "@/actions/createTodo";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-500 p-2 font-semibold text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    >
      {pending ? "Creating todo..." : "Create Todo"}
    </button>
  );
}
export function CreateTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="mt-8 flex w-full flex-col space-y-2"
      ref={formRef}
      action={async (formData: FormData) => {
        const todoName = formData.get("todo") as string;
        if (todoName === "") {
          alert("Please enter a todo name");
          return;
        }

        if (formRef.current) {
          formRef.current.reset();
        }
        await createTodo(todoName);
      }}
    >
      <label>
        <input
          placeholder="type new todo"
          id="todo"
          type="text"
          name="todo"
          className="w-full rounded-md px-2 py-1 text-xl font-bold outline"
        />
      </label>

      <SubmitButton />
    </form>
  );
}

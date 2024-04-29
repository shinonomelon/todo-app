/* eslint-disable react/jsx-no-duplicate-props */
"use client";

import { useRef } from "react";

import { createTodo } from "@/actions/createTodo";
import { useFormStatus } from "react-dom";

export function CreateTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

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
      <button type="submit" className="rounded-md bg-blue-500 p-2 font-semibold text-white">
        {pending ? "Creating todo..." : "Create Todo"}
      </button>
    </form>
  );
}

"use client";

import { useTransition } from "react";

import { checkTodo } from "@/actions/checkTodo";
import { deleteTodo } from "@/actions/deleteTodo";
import { clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";

type Todo = {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  is_done: boolean;
};

export function TodoItem({ todo }: { todo: Todo }) {
  const [isCheckPending, startCheckTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  return (
    <li className="group flex items-center justify-between space-x-4 rounded-md p-2 hover:bg-gray-100">
      <div className="flex items-center">
        <input
          type="checkbox"
          disabled={isCheckPending}
          className="size-6 rounded border border-gray-300"
          defaultChecked={todo.is_done}
          onClick={() => {
            startCheckTransition(() => checkTodo(todo.id, todo.is_done));
          }}
        />
        <div className="ml-5 flex flex-col">
          <span className={clsx("text-xl font-bold", todo.is_done && "text-gray-400 line-through")}>
            {todo.text}
          </span>

          <div className="text-gray-600">
            <span className="hidden md:inline">Updated at・</span>
            <time>
              {formatDistanceToNow(new Date(todo.created_at), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </time>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <button className="font-semibold text-blue-600">Edit</button>
        <button
          id={todo.id}
          disabled={isDeletePending}
          className="font-semibold text-red-600"
          onClick={() => {
            startDeleteTransition(() => deleteTodo(todo.id));
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

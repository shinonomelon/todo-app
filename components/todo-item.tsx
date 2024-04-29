"use client";

import { useTransition } from "react";

import { deleteTodo } from "@/actions/deleteTodo";
import { formatDistanceToNow } from "date-fns";

type Props = {
  todo: {
    id: string;
    text: string;
    created_at: string;
  };
};

export function TodoItem({ todo }: Props) {
  const [isDeletePending, startDeleteTransition] = useTransition();

  return (
    <li className="group flex items-center justify-between space-x-4 rounded-md p-2 hover:bg-gray-100">
      <div className="flex items-center">
        <input type="checkbox" className="size-6 rounded border border-gray-300" />
        <div className="ml-5 flex flex-col">
          <span className="text-xl font-bold">{todo.text}</span>
          <div className="text-gray-600">
            Updated at・
            <time>
              {formatDistanceToNow(new Date(todo.created_at), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </time>
          </div>
        </div>
      </div>
      <div className="space-x-2">
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

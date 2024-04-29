"use client";

import { ReactNode, useState } from "react";

import { editTodo } from "@/actions/editTodo";
import { Todo } from "@/types/todo";

export function EditForm({ children, todo }: { children: ReactNode; todo: Todo }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="font-semibold text-blue-600" onClick={openModal}>
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div
              // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
              className="inline-block transform overflow-hidden rounded-lg bg-white p-8 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                  Edit Todo
                </h3>
              </div>
              <form
                className="mt-8 flex w-full flex-col space-y-2"
                action={async (formData) => {
                  await editTodo(formData, todo.id);
                  setIsOpen(false);
                }}
              >
                <label>
                  <input
                    id="todo"
                    type="text"
                    name="todo"
                    defaultValue={todo.text}
                    className="w-full rounded-md px-2 py-1 text-xl font-bold outline"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 p-2 font-semibold text-white"
                >
                  Edit todo
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { createTodo } from "./actions";

export async function CreateTodoForm() {
  return (
    <form className="mt-8 flex w-full flex-col space-y-2">
      <label>
        <input
          placeholder="type new todo"
          id="todo"
          type="text"
          name="todo"
          className="w-full rounded-md px-2 py-1 text-xl font-bold outline"
        />
      </label>
      <button
        formAction={createTodo}
        type="submit"
        className="rounded-md bg-blue-500 p-2 font-semibold text-white"
      >
        Add
      </button>
    </form>
  );
}

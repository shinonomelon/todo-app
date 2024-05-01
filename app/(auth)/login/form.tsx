"use client";

import { login, signup } from "./actions";

export function LoginForm() {
  return (
    <form className="mx-auto mt-8 flex w-full max-w-sm flex-col space-y-2">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full rounded-md px-2 py-1 text-xl font-bold outline"
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full rounded-md px-2 py-1 text-xl font-bold outline"
      />
      <button
        type="submit"
        formAction={login}
        className="rounded-md bg-blue-500 p-2 font-semibold text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Login
      </button>{" "}
      <button
        type="submit"
        formAction={signup}
        className="rounded-md bg-blue-500 p-2 font-semibold text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Signup
      </button>
    </form>
  );
}

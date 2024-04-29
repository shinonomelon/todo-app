import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <header className="mx-auto flex max-w-3xl justify-end p-4 font-semibold text-emerald-600">
      {user ? (
        <form action={signOut}>
          <button className="rounded-md px-4 py-2 no-underline hover:bg-gray-200">Logout</button>
        </form>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
}

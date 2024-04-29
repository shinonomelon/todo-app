import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/");
  }
  return <>{children}</>;
}

import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";

import { Header } from "@/components/header";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}

import { headers } from "next/headers";
import { auth } from "@/shared/lib/utils";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <h1>Dashboard: Hello {session.user.email}</h1>;
}

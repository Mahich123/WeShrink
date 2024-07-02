import { UserForm } from "@/components/Form";
import { validataRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validataRequest();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#f0eee2]  p-5 rounded-lg">
        <UserForm />
      </div>
    </main>
  );
}

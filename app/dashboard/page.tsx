import { validataRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserForm } from "@/components/Form";
import { getUser } from "../actions/auth.actions";

export default async function DashBoard() {
  
  const { user } = await validataRequest();



  if (!user) {
    return redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="font-bold text-sm md:text-lg text-center text-balance">
            Tired of Links Longer Than Your Explanations?
          </h1>
          <p className="mt-2 text-xs md:text-base text-center text-gray-600">
            Trim it down! Because nobody wants to read that long URL
          </p>
        </div>
        <div className="bg-[#f0eee2]  p-5 rounded-lg">
          <UserForm />
        </div>
      </div>
    </main>
  );
}

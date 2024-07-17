"use client";

import { validataRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserForm } from "@/components/Form";
import { getUser, showData } from "../actions/auth.actions";
import { useUserContext } from "@/lib/UserContext";
import { Separator } from "@/components/ui/separator";
import List from "@/components/List";

export default function DashBoard() {
  const userData = useUserContext();

  if (!userData || !userData.user || !userData.user.id) {
    return redirect("/");
  }

  const { linkData } = userData;

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
      <Separator className="max-w-[988px]" />

      <div>
      {/* <List linkData={linkData} /> */}
      </div>
    </main>
  );
}

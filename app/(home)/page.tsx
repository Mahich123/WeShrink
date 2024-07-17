"use client"
import { UserForm } from "@/components/Form";
import List from "@/components/List";
import { Separator } from "@/components/ui/separator";
import { validataRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { showData } from "../actions/auth.actions";
import { useUserContext } from "@/lib/UserContext";

export default  function Home() {
  const userData = useUserContext();

  if (!userData || !userData.user || !userData.user.id) {
    return redirect("/");
  }

 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div className="w-[18rem] flex flex-col items-center">
        <div className="bg-[#f0eee2] p-5 rounded-lg">
          <UserForm />
        </div>
      </div>

      <Separator className="my-4 max-w-[988px]" />

      <div>
      {/* <List />s */}
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { validataRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signout } from "../actions/auth.actions";


export default async function DashBoard() {
  const {user} = await validataRequest()

  if(!user) {
    return redirect('/')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     welcome to your dashboard

   <p> {JSON.stringify(user)}</p>


    
    </main>


  );
}

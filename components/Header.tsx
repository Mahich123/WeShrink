import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { validataRequest } from "@/lib/auth";
import { signout } from "@/app/actions/auth.actions";

const Header = async () => {
    const {user} = await validataRequest()

  
  return (
    <div className="max-w-[988px] mx-auto sticky top-0 backdrop-blur-md px-6 sm:px-2 h-[12vh] rounded-md bg-white/30 ">
      <div className="w-full h-0.5 mt-3 bg-gray-700 animate-expand"></div>

      <div className=" pt-6 flex flex-1 justify-between items-center w-full">
        <div className="hidden cursor-pointer border border-black lg:flex lg:items-center gap-3 p-2 rounded-xl">
          <Link href="https://github.com/Mahich123/weshrink">
            <Github size={30} />
          </Link>
        </div>

        <div className="relative">
          <h2 className="text-[22px] sm:text-2xl lalezar-regular ">
            WeSh <span className="diff">rink</span>
          </h2>

          <h2 className="absolute lalezar-regular text-[22px] sm:text-2xl  left-[55%] transform rotate-45">
            rink
          </h2>
          <div className="absolute  top-[65px] left-[70%]  w-[48px] h-[10px] bg-[#5A5959] border rounded-[50%]"></div>
        </div>

        {
            !user? (
                <Link href={"/account/signup"}>
                    <Button>Get Access</Button>
                </Link>
            ) : (
                <form action={signout}>
                    <Button type="submit">Sign out</Button>
                </form>
                
            )
        }
        
        
      </div>
    </div>
  );
};

export default Header;

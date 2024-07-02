"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signup } from "../../actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignUpformSchema } from "@/types";


export default function UserAccount() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpformSchema>) {
    const res = await signup(values);

    if (!res?.success) {
      const errorMessage =
        res?.success ||
        "Duplicate entry or you may already have an account";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } else if (res?.success) {
      toast({
        variant: "default",
        description: (
          <div className="flex items-center">
            <PartyPopper size={24} />
            <p>Account Created Successfully</p>
          </div>
        ),
      });

      router.push("/dashboard");
    }
  }

  const goToSignin = () => {
    return router.push("/account/signin");
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md p-6 ">

        <div>
        <div className="relative flex justify-center items-center py-9">
          <h2 className="text-[22px]  lalezar-regular ">
            WeSh <span className="diff">rink</span>
          </h2>

          <h2 className="absolute lalezar-regular text-[22px]   bottom-[5%] left-[53%] transform rotate-45">
            rink
          </h2>
          <div className="absolute  top-[95%] right-[32%]  w-[40px] h-[9px] bg-[#5A5959] border rounded-[50%]"></div>
        </div>

        <p className="text-center py-9 font-semibold">Get Started by Creating an Account</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Jack" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="***" {...field} type="password" />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="***" {...field} type="password" />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <Button
              variant={"outline"}
              className="w-full"
              type="button"
              onClick={() => goToSignin()}
            >
              Sign In{" "}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

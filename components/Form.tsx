"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


const formSchema = z.object({
  Link: z.string().url(),
  name: z.string(),
});

export const UserForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Link: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
  }

  return (
    <>
      <div className="lg:w-[20vw]">
        <Form {...form}>
          <form
            className="max-w-md w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your url name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="Link"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Enter your long url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/" {...field} />
                  </FormControl>

                  <FormDescription>
                    your link should must be start with https
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" variant="outline">
              Submit
            </Button>
          </form>
        </Form>
      </div>

    
    </>
  );
};
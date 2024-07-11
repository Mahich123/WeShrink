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
import { createLink } from "@/app/actions/auth.actions";
import { useUserContext } from "@/lib/UserContext";
import { genShortLink } from "@/lib/shortCode";

const formSchema = z.object({
  Link: z.string().url(),
  name: z.string(),
});

export const UserForm = () => {
  const user = useUserContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Link: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const shortCode = await genShortLink();
    console.log(shortCode);

    const shortenedUrl = `${document.location.protocol}//${document.location.host}/${shortCode}`;

    console.log(shortenedUrl);

    const username = user?.username ?? "Guest";
    
    const email = user?.email ?? "not-provided";

    const formData = {
      name: values.name,
      longurl: values.Link,
      user: username,
      email:email,
      shortCode,
      shortenedUrl,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const res = await createLink(formData);

    // console.log(res)

    if (res) {
      form.reset()
      return {
        success: true,
        message: "Link successfully created",
        
      };
      
    } else {
      return {
        success: false,
        message: "Error creating link",
      }
    }

  
  }

  return (
    <>
      <div className="">
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

"use client"
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";

type User = {
  id?: string;
  username?: string;
  email?: string;
  role?: "user" | "admin";
} ;

type Props = {
  children: ReactNode;
};

const UserContext = createContext<User | null>(null);

function useFetchUser() {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      try {
        const res = await fetch("/api/validateUser");
        console.log(res)

        if (res.headers.get("content-type") !== "application/json") {
          throw new Error("Expected JSON response");
        }

        if (!res.ok) {
          throw new Error("Error fetching session");
        }

        const data = await res.json();

        console.log("fetched user data: ", data)
        return data;
      } catch (error) {
        console.error(error);
        throw new Error("Session not found");
      }
    },
  });
}

export const useUserContext = () => {
  const context = useContext(UserContext);



  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export const UserProvider = ({ children }: Props) => {
  const { data: user, isLoading, error } = useFetchUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const value: User | null = user ? { ...user } : null;

  if(!value) {
    return redirect("/")
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

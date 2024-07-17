"use client";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";

type User = {
  id?: string;
  username?: string;
  email?: string;
  role?: "user" | "admin";
};

type Props = {
  children: ReactNode;
};

type LinkData = {
  id?: string;
  name?: string;
  longurl?: string;
  shortenedUrl?: string;
};

type UserData = {
  user?: User;
  linkData?: LinkData;
};

const UserContext = createContext<UserData | null>(null);

function useFetchUser() {
  return useQuery<UserData>({
    queryKey: ["user"],
    queryFn: async (): Promise<UserData> => {
      try {
        const res = await fetch("/api/validateUser");
        console.log("Response from /api/validateUser:", res);

        if (res.headers.get("content-type") !== "application/json") {
          throw new Error("Expected JSON response");
        }

        if (!res.ok) {
          throw new Error("Error fetching session");
        }

        const data = await res.json();
        console.log("Fetched user data:", data);
        return data;
      } catch (error) {
        console.error("Error in useFetchUser:", error);
        throw new Error("Session not found");
      }
    },
  });
}

function useFetchLink() {
  return useQuery({
    queryKey: ["linkData"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/urlData");
        console.log("Response from /api/urlData:", res);

        if (!res.ok) {
          throw new Error("Error fetching session");
        }

        const data = await res.json();
        console.log("Fetched link data:", data);
        return data;
      } catch (error) {
        console.error("Error in useFetchLink:", error);
        throw new Error("Failed to fetch link data");
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
  const { data: userData, isLoading, error } = useFetchUser();
  const { data: linkData } = useFetchLink();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const value: UserData = {
    user: userData?.user,
    linkData: linkData as LinkData,
  };

  console.log("Context value:", value);

  if (!value.user) {
    console.log("User not found, redirecting...");
    return redirect("/");
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

"use server";

import { z } from "zod";
// import { SignUpformSchema } from "../account/signup/page";
import * as argon2 from "argon2";
import { generateId } from "lucia";

import { urls, userTable } from "@/lib/schema";
import { lucia, validataRequest } from "@/lib/auth";
import { cookies } from "next/headers";
// import { SignInformSchema } from "../account/signin/page";
import { eq } from "drizzle-orm";
import db from "@/lib";
import { SignInformSchema, SignUpformSchema } from "@/types";

export const signup = async (values: z.infer<typeof SignUpformSchema>) => {
  // console.log(values);

  const hashedPassword = await argon2.hash(values.password);
  //   console.log(hashedPassword)
  const userId = generateId(15);
  //   console.log(userId)

  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        email: values.email,
        username: values.username,
        hashedPassword,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });
    // console.log("res:", res);

    const session = lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie((await session).id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    // window.location.reload();
    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export const signin = async (values: z.infer<typeof SignInformSchema>) => {
  try {
    const existinguser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, values.email))
      .limit(1);

    if (!existinguser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const { id, hashedPassword } = existinguser[0];

    if (!hashedPassword) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    const validPass = await argon2.verify(hashedPassword, values.password);

    if (!validPass) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    const session = lucia.createSession(id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie((await session).id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    window.location.reload();

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    console.error(error);
  }
};

export const signout = async () => {
  try {
    const { session } = await validataRequest();

    if (!session) {
      return {
        success: false,
        message: "Unauthorize",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createSessionCookie((await session).id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    window.location.reload();

    return {
      success: true,
      message: "You are Signed Out. We Hope You will Return Soon! ",
    };
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const userData = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!userData) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      username: userData[0].username,
      email: userData[0].email,
      role: userData[0].role,
    };
  } catch (error) {
    console.error(error);
  }
};

type linkData = {
  name: string;
  longurl: string;
  user: string;
  email: string;
  shortCode: string;
  shortenedUrl: string;
  expiresAt: Date;
};

export const createLink = async ({
  name,
  longurl,
  user,
  email,
  shortCode,
  shortenedUrl,
  expiresAt,
}: linkData) => {
  try {
    await db.insert(urls).values({
      name,
      longurl,
      user,
      email,
      shortCode,
      shortenedUrl,
      expiresAt,
      expired: false,
    });

    return {
      success: true,
      data: {
        name,
        longurl,
        user,
        email,
        shortCode,
        shortenedUrl,
        expiresAt: expiresAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating link", error);

    return {
      success: false,
      message: "Error creating link",
    };
  }
};

type UserId = {
  id: string;
};

export const showData = async (user: UserId) => {
  try {
    const data = await db.select().from(urls).where(eq(urls.user, user?.id))
    
    return {
      success: true,
      data: data
    };
  
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: "user data not found"
    }
  }
};

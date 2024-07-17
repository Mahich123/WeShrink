"use server";

import db from "@/lib";
import { validataRequest } from "@/lib/auth";
import { urls } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { user, session } = await validataRequest();

    if (!user || !session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const data = await db.select().from(urls).where(eq(urls.user, user?.id));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
};

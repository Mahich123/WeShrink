"use server";


import { getUser } from "@/app/actions/auth.actions";
import { validataRequest } from "@/lib/auth";
import {NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { user, session } = await validataRequest();


    if (!user || !session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userData = await getUser(user.id);

    if (!userData?.success) {
      return NextResponse.json(
        { error: "User Data not found" },
        { status: 404 },
      );
    }

    // console.log("userdata: ",userData)
    return NextResponse.json({
      id: user.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
};


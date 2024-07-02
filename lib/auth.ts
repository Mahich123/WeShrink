import { Lucia } from "lucia";
import adapter from "./schema";
import { cache } from "react";
import { cookies } from "next/headers";


export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

// export const validataRequest = cache(async () => {
// 	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	
// 	if (!sessionId) return {
// 		user:null,
// 		session: null
// 	};
// 	const { user, session } = await lucia.validateSession(sessionId);
// 	try {
// 		if (session && session.fresh) {
// 			const sessionCookie = lucia.createSessionCookie(session.id);
// 			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 		}
// 		if (!session) {
// 			const sessionCookie = lucia.createBlankSessionCookie();
// 			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 		}
// 	} catch {
// 		// Next.js throws error when attempting to set cookies when rendering page
// 	}
// 	return {
// 		user ,
// 		session
// 	};
// });

export const validataRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  
	if (!sessionId) {
	  return {
		user: null,
		session: null,
	  };
	}
  
	try {
	  const { user, session } = await lucia.validateSession(sessionId);
  
	  if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	  } else if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	  }
  
	  return {
		user,
		session,
	  };
	} catch (error) {
	  console.error(error);
	  return {
		user: null,
		session: null,
	  };
	}
  });



// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
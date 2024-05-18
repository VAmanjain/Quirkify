
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  console.log("Middleware executed ");

  const authToken = request.cookies.get("next-auth.session-token")?.value;

  console.log(authToken);

  if (
    request.nextUrl.pathname === "/api/auth/providers" ||
    request.nextUrl.pathname === "/api/auth/session" ||
    request.nextUrl.pathname === "/api/auth/callback/google"||
    request.nextUrl.pathname === "/api/auth/error"
  ) {
    return;
  }

  const session = request;

  console.log(session);

  const LoggedInNotAccessURL = request.nextUrl.pathname === "/";

  if (LoggedInNotAccessURL) {
    if (authToken) {
      return NextResponse.redirect(new URL("/user-profile", request.url));
    }
  } else {
    if(!authToken){
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/explore",
    // "/api/:path*",
    "/profile/:path*",
    "/create-post",
    "/user-profile",
  ],
};

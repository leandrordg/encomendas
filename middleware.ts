import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  apiRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiRoutes = apiRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthPrefix || isApiRoutes) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

import { type GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // In test environment, we don't want to use the real next-auth session
  // because we are not going through the login flow.
  // Instead, we use the session provided by the header.
  if (process.env.APP_ENV === "test" && ctx.req.headers.session) {
    return JSON.parse(ctx.req.headers.session as string) as Session;
  }
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};

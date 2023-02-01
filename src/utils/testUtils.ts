import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import type { User } from "@prisma/client";
import cuid from "cuid";

// This is a helper that can be used to manipulate the db directly in tests
export const createCtx = () => {
  return createInnerTRPCContext({
    session: null,
  });
};


// This is a helper that can be used to make calls to the api when not logged in
export const createPublicCaller = () => {
  return appRouter.createCaller(createCtx());
};


// This creates a real user in the database and returns an api caller that is logged in
// properties can be passed in to override the default values
// This has been useful for testing permissions for various users
export const createUser = async (userData?: Partial<User>) => {
  const ctx = createCtx();
  const user = await ctx.prisma.user.create({
    data: {
      email: `${cuid()}@${cuid()}.test.com`,
      ...userData
    },
  });

  const userCtx = createInnerTRPCContext({
    session: {
      user: {
        id: user.id,
        email: user.email,
      },
      expires: new Date(2100).getTime().toString(),
    },
  });

  const userCaller = appRouter.createCaller(userCtx);

  return {
    user,
    userCtx,
    userCaller,
  };
};

// This is a helper that can be used to reset the db before each test
// It can also be used to seed the db with data if needed
export const resetDb = async () => {
  const ctx = createCtx();

  await ctx.prisma.user.deleteMany();
  await ctx.prisma.session.deleteMany();
  await ctx.prisma.account.deleteMany();
  await ctx.prisma.example.deleteMany();
};

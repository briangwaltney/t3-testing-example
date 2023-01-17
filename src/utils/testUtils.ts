import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import cuid from "cuid";

export const createCtx = () => {
  return createInnerTRPCContext({
    session: null,
  });
};

export const createPublicCaller = () => {
  return appRouter.createCaller(createCtx());
};

export const createUser = async () => {
  const ctx = createCtx();
  const user = await ctx.prisma.user.create({
    data: {
      email: `${cuid()}@${cuid()}.test.com`,
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

export const resetDb = async () => {
  const ctx = createCtx();

  await ctx.prisma.user.deleteMany();
  await ctx.prisma.example.deleteMany();
};

import { createInnerTRPCContext } from "@/server/api/trpc";

export const createCtx =  () => {
  return createInnerTRPCContext({
    session: null,
  });
};

export const resetDb = async () => {
  const ctx = createCtx();

  await ctx.prisma.user.deleteMany();
  await ctx.prisma.example.deleteMany()
}
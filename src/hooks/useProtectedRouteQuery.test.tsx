import { useProtectedRouteQuery } from "@/hooks/useProtectedRouteQuery";
import { createCtx, createUser, resetDb } from "@/utils/testUtils";
import { cleanup, hookWrapper, renderHook, waitFor } from "@/utils/testWrapper";
import cuid from "cuid";

describe("useProtectedRouteQuery", () => {
  beforeEach(async () => {
    await resetDb();
  });
  afterEach(() => {
    cleanup();
  });
  test("should not return data if not logged in", async () => {
    const { result } = renderHook(useProtectedRouteQuery, {
      wrapper: hookWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
    expect(result.current.data).toBe(undefined);
  });
  test("should return all users", async () => {
    const { user } = await createUser();
    const ctx = createCtx();
    await ctx.prisma.user.create({
      data: {
        email: `${cuid()}@${cuid()}.test.com`,
      },
    });

    const { result } = renderHook(useProtectedRouteQuery, {
      wrapper: hookWrapper(user),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await waitFor(() => expect(result.current.data).not.toBe(undefined));

    expect(result.current.data?.length).toBeGreaterThanOrEqual(2);
  });
});

import { useProtectedRouteQuery } from "@/hooks/useProtectedRouteQuery";
import { createCtx, resetDb } from "@/utils/testUtils";
import { AllTheProviders } from "@/utils/testWrapper";
import { renderHook, waitFor } from "@testing-library/react";
import cuid from "cuid";


// I know these tests are useless, but I would like to know what wrappers I need 
// to use to make these tests work
// I'm fine with making these more "integration" in nature and have them call a real backend/db
// but I'm not sure how to do that

describe.skip("useAuthNoteRequiredQuery", () => {
  beforeAll(async () => {
    await resetDb();
  });
  test.skip("should return data", async () => {
    const { result } = renderHook(() => useProtectedRouteQuery(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).not.toBe(undefined);
  });

  test.skip("should return all users",async () => {
    const ctx = createCtx()
    await ctx.prisma.user.createMany({
      data: {
        email: `${cuid()}@${cuid()}.test.com`,
      }
    })

    const { result } = renderHook(() => useProtectedRouteQuery(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data?.length).toBeGreaterThan(0));

    expect(result.current.data?.length).toBeGreaterThan(0)
  });
});

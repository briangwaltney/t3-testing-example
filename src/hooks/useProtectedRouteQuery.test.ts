import { useProtectedRouteQuery } from "@/hooks/useProtectedRouteQuery";
import { resetDb } from "@/utils/testUtils";
import { renderHook } from "@testing-library/react";

describe("useAuthNoteRequiredQuery", () => {
  beforeAll(async () => {
    // await resetDb();
  });
  test("should return data", () => {
    const { result } = renderHook(() => useProtectedRouteQuery());
    expect(result.current.data).not.toBeNull();
  });

  test("should return all users", () => {
    // add fake users to db that will be returned

    const { result } = renderHook(() => useProtectedRouteQuery());
    expect(result.current.data?.length).toBeGreaterThan(0)
  });
});

import { useProtectedRouteQuery } from "@/hooks/useProtectedRouteQuery";
import { resetDb } from "@/utils/testUtils";
import { renderHook } from "@testing-library/react";


// I know these tests are useless, but I would like to know what wrappers I need 
// to use to make these tests work
// I'm fine with making these more "integration" in nature and have them call a real backend/db
// but I'm not sure how to do that

describe.skip("useAuthNoteRequiredQuery", () => {
  beforeAll(async () => {
    await resetDb();
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

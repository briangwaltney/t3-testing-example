import { useAuthNotRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import { AllTheProviders } from "@/utils/testWrapper";
import {renderHook, waitFor} from '@testing-library/react'



// I know these tests are useless, but I would like to know what wrappers I need 
// to use to make these tests work
// I'm fine with making these more "integration" in nature and have them call a real backend/db
// but I'm not sure how to do that
describe("useAuthNotRequiredQuery", () => {
  test("should return data", async () => {
    const { result } = renderHook(() =>
      useAuthNotRequiredQuery(), {
        wrapper: AllTheProviders, 
      }
    );
    expect(result.current.isLoading).toBe(true);
    // wait for the query to finish
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      greeting: "Hello hello"
    })



  });
})
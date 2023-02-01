import { useAuthNotRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import { AllTheProviders } from "@/utils/testWrapper";
import {renderHook, waitFor} from '@testing-library/react'



describe("useAuthNotRequiredQuery", () => {
  test("should return data", async () => {
    const { result } = renderHook(() =>
      useAuthNotRequiredQuery(), {
        wrapper: AllTheProviders, 
      }
    );
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      greeting: "Hello hello"
    })



  });
})
import { useAuthNoteRequiredQuery } from "@/hooks/useAuthNoteRequiredQuery";
import {renderHook} from '@testing-library/react'

describe("useAuthNoteRequiredQuery", () => {
  test("should return data", async () => {
    const { result } = renderHook(() =>
      useAuthNoteRequiredQuery()
    );
    expect(result.current.data).toEqual("hello");
  });
})
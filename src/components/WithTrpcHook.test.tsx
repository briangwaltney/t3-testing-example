import WithTrpcHook from "@/components/WithTrpcHook";
import { render, screen } from "@testing-library/react";

describe("Component with trpc hook", ()=>{
  test("should render", ()=>{
    render(<WithTrpcHook />);
  })
})
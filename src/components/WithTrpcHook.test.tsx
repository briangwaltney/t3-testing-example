import WithTrpcHook from "@/components/WithTrpcHook";
import { render, screen } from "@testing-library/react";


// Like the hooks test, I need to know what to wrap the component in
// to make it work. I'm not sure how to do that.
describe("Component with trpc hook", ()=>{
  test("should render", ()=>{
    render(<WithTrpcHook />);
  })
})
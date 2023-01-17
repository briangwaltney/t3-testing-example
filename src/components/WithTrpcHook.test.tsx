import WithTrpcHook from "@/components/WithTrpcHook";
import { AllTheProviders } from "@/utils/testWrapper";
import { cleanup, render, screen } from "@testing-library/react";


// Like the hooks test, I need to know what to wrap the component in
// to make it work. I'm not sure how to do that.
describe("Component with trpc hook", ()=>{
  afterEach(()=>{
    cleanup()
  })
  test.only("should render", async ()=>{
    render(<WithTrpcHook />, {
      wrapper: AllTheProviders,
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const message = await screen.findByText(/hello/i)

    expect(message).toBeInTheDocument()
  })
})
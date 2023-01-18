import WithTrpcHook from "@/components/WithTrpcHook";
import { cleanup, render, screen } from "@/utils/testWrapper";

describe.skip("Component with trpc hook", () => {
  afterEach(() => {
    cleanup();
  });
  test("should render", async () => {
    render(<WithTrpcHook />)

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const message = await screen.findByText(/hello/i);

    expect(message).toBeInTheDocument();
  });
});

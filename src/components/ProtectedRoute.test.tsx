import ProtectedRoute from "@/components/ProtectedRoute";
import { createUser, resetDb } from "@/utils/testUtils";
import { cleanup, render, screen } from "@/utils/testWrapper";

describe("Component with trpc hook", () => {
  beforeEach(async () => {
    await resetDb();
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  test("should render", async () => {
    const { user } = await createUser();

    render(<ProtectedRoute />, { user: user });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const message = await screen.findByText(/data/i);

    expect(message).toBeInTheDocument();
  });
});

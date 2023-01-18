import ProtectedRoute from "@/components/ProtectedRoute";
import { createCtx, createUser, resetDb } from "@/utils/testUtils";
import { cleanup, render, screen, testApi } from "@/utils/testWrapper";
import cuid from "cuid";
import Cookies from "js-cookie";

describe("Component with trpc hook", () => {
  beforeEach(async () => {
    await resetDb();
  });
  afterEach(() => {
    cleanup();
  });
  test("should render", async () => {
    const { user, userCtx } = await createUser();
    const session = await userCtx.prisma.session.create({
      data: {
        expires: new Date(2100, 1, 1),
        sessionToken: cuid(),
        userId: user.id,
      },
    });

    render(<ProtectedRoute />);

    // expect(screen.getByText("Loading...")).toBeInTheDocument();

    const message = await screen.findByText(/data/i);

    // expect(message).toBeInTheDocument();
  });
});

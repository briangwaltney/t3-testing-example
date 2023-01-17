import { createPublicCaller, createUser, resetDb } from "@/utils/testUtils";
import { TRPCError } from "@trpc/server";

describe("example", () => {
  beforeEach(async () => {
    await resetDb();
  })
  test("hello", async () => {
    const publicCaller = createPublicCaller();

    const data = await publicCaller.example.hello({
      text: "trpc",
    });

    expect(data?.greeting).toBe("Hello trpc");
  });

  test("get all users to fail when not logged in", async () => {
    const publicCaller = createPublicCaller();
    expect.assertions(2);

    try {
      await publicCaller.example.getAllUsers();
    } catch (error) {
      expect(error).toBeInstanceOf(TRPCError);
      expect((error as TRPCError).message).toBe("UNAUTHORIZED");
    }
  });

  test("logged in users can get all users", async ()=>{
    const {userCaller, user} = await createUser();

    const data = await userCaller.example.getAllUsers();

    expect(data?.length).toBeGreaterThan(0)
    expect(data?.find(u=> u.id === user.id)).toBeDefined()
  })
});

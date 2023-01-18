import { createPublicCaller, createUser, resetDb } from "@/utils/testUtils";
import { TRPCError } from "@trpc/server";


/**
 * These tests make real calls to the test db
 * The db is a local docker container that is reset before each test
 * This approach does not require mocking, but does require a running db
 * With the local db, it is very fast and easy to write tests
 */

describe.skip("example", () => {
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

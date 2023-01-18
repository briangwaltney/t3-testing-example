import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCReact,
  getFetch,
  httpBatchLink,
  loggerLink,
} from "@trpc/react-query";
import SuperJSON from "superjson";
import type { ReactElement } from "react";
import React from "react";
import type { AppRouter } from "@/server/api/root";
import fetch from "node-fetch";
import type { Session } from "next-auth";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { User } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const globalAny = global as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
globalAny.fetch = fetch;

export const testApi = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

const queryClient = new QueryClient();
const trpcClient = (session: Session | null) =>
  testApi.createClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          opts.direction === "down" && opts.result instanceof Error,
      }),
      httpBatchLink({
        url: "http://localhost:3005/api/trpc",
        fetch: async (input, init?) => {
          const fetch = getFetch();
          return fetch(input, {
            ...init,
          });
        },
        ...(session ? { headers: { session: JSON.stringify(session) } } : {}),
      }),
    ],
    transformer: SuperJSON,
  });

export function TRPCTestClientProvider(props: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <testApi.Provider
      client={trpcClient(props.session)}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </testApi.Provider>
  );
}
export const AllTheProviders: React.FC<{
  children: React.ReactNode;
  session?: Session;
}> = ({ session, children }) => {
  return (
    <TRPCTestClientProvider session={session ?? null}>
      {children}
    </TRPCTestClientProvider>
  );
};

export const createSession = (user: User): Session => ({
  user: {
    id: user.id,
  },
  expires: "12312313212313",
});

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    user?: User;
  }
) => {
  const session = options?.user ? createSession(options.user) : undefined;

  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} session={session} />,
    ...options,
  });
};

export const hookWrapper = (user?: User) =>
  function wrapperOptions(props: { children: React.ReactNode }) {
    const session = user ? createSession(user) : undefined;
    return <AllTheProviders {...props} session={session} />;
  };

export * from "@testing-library/react";
export { customRender as render };

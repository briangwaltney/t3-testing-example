import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCReact,
  getFetch,
  httpBatchLink,
  loggerLink,
} from "@trpc/react-query";
import SuperJSON from "superjson";
import React from "react";
import type { AppRouter } from "@/server/api/root";
import fetch from 'node-fetch';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const globalAny = global as any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
globalAny.fetch = fetch;

export const trpc = createTRPCReact<AppRouter>({
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
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: "http://localhost:3005/api/trpc",
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
        });
      },
    }),
  ],
  transformer: SuperJSON,
});

export function TRPCTestClientProvider(props: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
export const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TRPCTestClientProvider>{children}</TRPCTestClientProvider>;
};

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
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import Cookies from 'js-cookie'

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
const trpcClient = testApi.createClient({
  links: [
    loggerLink({
      enabled: (opts) => opts.direction === "down" && opts.result instanceof Error,
    }),
    httpBatchLink({
      url: "http://localhost:3005/api/trpc",
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
        });
      },
      headers:()=>{
        return {
          authorization: 'cld0qtrew0002qlgrbctv5942' 
        }
      }
    }),
  ],
  transformer: SuperJSON,
});

export function TRPCTestClientProvider(props: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={props.session}>
      <testApi.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </testApi.Provider>
    </SessionProvider>
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

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    session?: Session;
  }
) => {
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} session={options?.session} />
    ),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };

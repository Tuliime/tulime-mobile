import React, { Children, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = (
  props
) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

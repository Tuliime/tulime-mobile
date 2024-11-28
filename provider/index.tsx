import React, { ReactNode } from "react";
import { ReactQueryProvider } from "./ReactQuery";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = (props) => {
  return <ReactQueryProvider>{props.children}</ReactQueryProvider>;
};

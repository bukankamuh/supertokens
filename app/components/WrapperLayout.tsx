"use client";

import SuperTokensWebJs from "supertokens-web-js";
import { frontendConfig } from "../config/frontend";
import { ReactNode } from "react";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensWebJs.init(frontendConfig());
}

export default function WrapperLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

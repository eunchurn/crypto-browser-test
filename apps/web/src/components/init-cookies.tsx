"use client";

import { useEffect } from "react";

interface InitCookiesProps {
  create: () => Promise<void>;
}
export function InitCookies(props: InitCookiesProps): JSX.Element {
  const { create } = props;
  useEffect(() => {
    create().catch(() => void 0);
  }, []);
  return <div />;
}

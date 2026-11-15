"use client";

import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white/70 hover:text-ink"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

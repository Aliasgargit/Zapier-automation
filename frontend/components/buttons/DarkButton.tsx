"use client";

import { ReactNode } from "react";

export const DarkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-2.5 font-semibold text-white transition hover:bg-brand active:scale-[0.98]"
    >
      {children}
    </button>
  );
};

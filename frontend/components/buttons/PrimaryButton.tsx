"use client";

import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${size === "small" ? "px-5 py-2 text-sm" : "px-8 py-3.5 text-lg"} inline-flex items-center justify-center rounded-xl bg-brand font-semibold text-white shadow-soft transition hover:bg-brand-deep hover:shadow-glow active:scale-[0.98]`}
    >
      {children}
    </button>
  );
};

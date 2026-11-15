"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-changed"));
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line/80 bg-surface/80 px-5 py-4 backdrop-blur-md">
      <button
        onClick={() => router.push(isLoggedIn ? "/dashboard" : "/")}
        className="brand-mark font-display text-2xl font-bold tracking-tight text-ink"
      >
        Zap<span className="text-brand">ier</span>
      </button>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <LinkButton onClick={() => router.push("/dashboard")}>
              Dashboard
            </LinkButton>
            <LinkButton onClick={() => router.push("/zap/create")}>
              Create Zap
            </LinkButton>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-ink/20 bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
            <LinkButton onClick={() => router.push("/login")}>Login</LinkButton>
            <PrimaryButton onClick={() => router.push("/signup")}>
              Signup
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
};

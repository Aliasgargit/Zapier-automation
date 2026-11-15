"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-4">
        <div className="flex w-full max-w-5xl flex-col gap-8 pt-10 md:flex-row md:gap-12">
          <div className="flex-1 px-2 pt-8 md:pt-16">
            <div className="pb-6 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="space-y-5">
              <CheckFeature label={"Easy setup, no coding required"} />
              <CheckFeature label={"Free forever for core features"} />
              <CheckFeature label={"14-day trial of premium features & apps"} />
            </div>
          </div>
          <div className="mt-4 flex-1 rounded-3xl border border-line bg-white/80 p-6 shadow-soft backdrop-blur md:mt-10">
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={"Email"}
              type="text"
              placeholder="Your Email"
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              type="password"
              placeholder="Password"
            />
            <div className="pt-5">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                    username: email,
                    password,
                  });
                            localStorage.setItem("token", res.data.token);
                            window.dispatchEvent(new Event("auth-changed"));
                            router.push("/dashboard");
                }}
                size="big"
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

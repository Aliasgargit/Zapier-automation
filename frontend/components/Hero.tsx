"use client";
import { useRouter } from "next/navigation";
import { Feature } from "./Feature";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="px-4 pt-16 md:pt-24">
      <div className="flex justify-center hero-rise">
        <div className="max-w-3xl text-center font-display text-5xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
          Automate as fast as you can type
        </div>
      </div>

      <div className="flex justify-center pt-5 hero-rise-delay">
        <div className="max-w-2xl text-center text-lg leading-relaxed text-muted md:text-xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots that
          work for you.
        </div>
      </div>

      <div className="flex justify-center pt-8 hero-rise-delay-2">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton
            onClick={() => {
              router.push("/signup");
            }}
            size="big"
          >
            Get Started free
          </PrimaryButton>
          <SecondaryButton onClick={() => {}} size="big">
            Contact Sales
          </SecondaryButton>
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 pt-8 feature-pop">
        <Feature title={"Free Forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than any other platforms"} />
        <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
      </div>
    </div>
  );
};

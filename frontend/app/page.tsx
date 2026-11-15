import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="pb-24">
      <Appbar />
      <Hero />
      <div className="pt-12">
        <HeroVideo />
      </div>
    </main>
  );
}

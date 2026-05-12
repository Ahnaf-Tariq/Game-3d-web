import Features from "@/components/features";
import { Footer } from "@/components/footer";
import GameCanvas from "@/components/hero/game-canvas";
import NewsSlider from "@/components/news-slider";
import { WeaponsSection } from "@/components/weapons-section";

export default function Home() {
  return (
    <main className="noise bg-black min-h-screen">
      <GameCanvas />
      <Features />
      <NewsSlider />
      <WeaponsSection />
      <Footer />
    </main>
  );
}

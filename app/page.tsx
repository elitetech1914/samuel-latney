import { Hero } from "@/components/hero";
import { StoryPath } from "@/components/story-path";
import { Themes } from "@/components/themes";
import { Characters } from "@/components/characters";
import { QuoteBand } from "@/components/quote-band";
import { AuthorSection } from "@/components/author-section";
import { Platform } from "@/components/platform";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="story-ribbon">
        <span>LOVE & CHOICE</span>
        <span className="ribbon-star">✧</span>
        <span>FAMILY & BELONGING</span>
        <span className="ribbon-star">✧</span>
        <span>FAITH & POSSIBILITY</span>
        <span className="ribbon-star">✧</span>
        <span>AN UNEXPECTED FOREVER</span>
      </div>
      <StoryPath />
      <Themes />
      <Characters />
      <QuoteBand />
      <AuthorSection />
      <Platform />
    </>
  );
}

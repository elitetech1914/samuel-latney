import Image from "next/image";
import { images } from "@/lib/site";
import { Button, Eyebrow } from "./ui";
import { Icon } from "./icon";

export function Hero({ bookPage = false }: { bookPage?: boolean }) {
  return (
    <section className={`hero ${bookPage ? "book-hero" : ""}`}>
      <div className="hero-background">
        <Image
          src={images.hero}
          alt="Alice and James walking together along a beach at sunset."
          fill
          sizes="100vw"
          preload
          quality={85}
          className="object-cover"
        />
      </div>
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <Eyebrow light>
            {bookPage ? "PAIRED BY PROVIDENCE" : "A NOVEL BY SAMUEL LATNEY"}
          </Eyebrow>
          <h1>
            {bookPage ? (
              <>
                Two lives. One unexpected pairing.
                <br />
                <em>A future neither planned.</em>
              </>
            ) : (
              <>
                Sometimes the life
                <br className="desktop-break" /> meant for us begins
                <br className="desktop-break" /> with a moment
                <br />
                <em>we never planned.</em>
              </>
            )}
          </h1>
          <p>
            {bookPage
              ? "A heartfelt story about love, family, ambition, faith, and the courage to choose a future that does not look the way you expected."
              : "One unexpected moment. Two different lives. A love that becomes a choice. Discover the story of Alice and James in Paired by Providence."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={bookPage ? "#where-to-buy" : "/paired-by-providence"}>
              {bookPage ? "Where to Buy" : "Discover the Story"}
            </Button>
            <Button href="/alice-and-james" variant="outline" icon="arrowRight">
              Meet Alice & James
            </Button>
          </div>
          <div className="hero-footnote">
            <Icon name="book" size={17} />
            <span>A story of love, choice, and the unexpected.</span>
          </div>
        </div>
 
      </div>
      <div className="container hero-bottom">
        <a href={bookPage ? "#synopsis" : "#the-beginning"}>
          <span className="scroll-circle">
            <Icon name="arrowDown" size={15} />
          </span>
          TURN THE FIRST PAGE
        </a>
        <span>LOVE FINDS A WAY. LIFE WRITES THE STORY.</span>
      </div>
    </section>
  );
}

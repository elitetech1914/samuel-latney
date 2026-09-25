import Image from "next/image";
import { images } from "@/lib/site";
import { Button, SectionHeading } from "./ui";
import { Reveal } from "./reveal";

export function AuthorSection() {
  return (
    <section className="section-space author-section">
      <div className="container author-grid">
        <Reveal className="author-image-wrap">
          <div className="author-image">
            <Image
              src={images.reading}
              alt="An open book and a cup of coffee beside a sunlit coastal window."
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="author-image-note">
            <span>THE STORIES WE CHOOSE.</span>
            <p>The lives we become.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="THE AUTHOR BEHIND THE STORY"
            title={
              <>
                Words about love.
                <br />
                Stories about <em>life.</em>
              </>
            }
          />
          <p className="author-lead">
            Samuel Latney writes about the choices that shape a life.
          </p>
          <p className="body-copy">
            In <em>Paired by Providence</em>, he explores how love grows through
            ordinary moments, difficult decisions, family influence, loyalty,
            faith, ambition, and the courage to step beyond the future we once
            assumed was fixed.
          </p>
          <p className="author-signature">Samuel Latney</p>
          <Button href="/about" variant="text">
            Meet the author
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

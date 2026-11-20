import { isFormEnabled } from "@/lib/form-delivery";
import { Eyebrow } from "./ui";
import { NewsletterForm } from "./forms";
import { Reveal } from "./reveal";

export function Newsletter() {
  return (
    <section id="reader-list" className="newsletter-section">
      <Reveal className="container newsletter-grid">
        <div>
          <Eyebrow light>A LETTER FROM THIS LITTLE WORLD</Eyebrow>
          <h2>
            Stay close to <em>the story.</em>
          </h2>
          <p>
            Book news, behind-the-story notes, and a first look at what comes
            next.
          </p>
        </div>
        <NewsletterForm enabled={isFormEnabled("newsletter")} />
      </Reveal>
      <span className="newsletter-watermark" aria-hidden="true">
        S L
      </span>
    </section>
  );
}

import Image from "next/image";
import { images, pageMetadata } from "@/lib/site";
import { Hero } from "@/components/hero";
import { Themes } from "@/components/themes";
import { Platform } from "@/components/platform";
import { QuoteBand } from "@/components/quote-band";
import { StoryPath } from "@/components/story-path";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Button } from "@/components/ui";
import { Icon } from "@/components/icon";

export const metadata = pageMetadata(
  "Paired by Providence — Book Overview",
  "Explore Paired by Providence by Samuel Latney: a heartfelt story of Alice and James, whose unexpected classroom pairing grows into a life-changing relationship.",
  "/paired-by-providence",
);

const questions = [
  [
    "How much of Alice’s hesitation comes from unspoken expectations?",
    "Consider the difference between what people have actually told Alice and the assumptions she has never questioned. How do those assumptions influence the choices she feels free to make?",
  ],
  [
    "What does James’s patience reveal about love?",
    "Explore the difference between pursuing someone and pressuring them. Which everyday actions make James’s steadiness meaningful?",
  ],
  [
    "How do their ambitions shape their partnership?",
    "Alice’s medical ambitions and James’s legal path are part of their identities. What would a shared future that respects both callings look like?",
  ],
  [
    "Where does family influence end and personal choice begin?",
    "Discuss the difference between listening to the people we love and allowing them to decide our lives. What makes that boundary difficult to navigate?",
  ],
  [
    "Where do you see providence in the story?",
    "Is providence found in chance events, in repeated choices, or in both? Think about how an ordinary moment gains meaning over time.",
  ],
];

export default function BookPage() {
  return (
    <>
      <Hero bookPage />
      <section id="synopsis" className="container section-space synopsis-grid">
        <Reveal className="synopsis-art">
          <Image
            src={images.books}
            alt="Front and back covers of Paired by Providence by Samuel Latney."
            width={5110}
            height={4000}
            sizes="(max-width: 800px) 100vw, 45vw"
          />
          <p>A NOVEL BY SAMUEL LATNEY</p>
        </Reveal>
        <Reveal className="editorial-copy">
          <SectionHeading
            eyebrow="THE STORY"
            title={
              <>
                Sometimes being late
                <br />
                <em>changes everything.</em>
              </>
            }
          />
          <p>
            Alice has a plan. She is studying medicine, focused on her career,
            and expects to return to Tennessee and the life she understands.
            James is studying law, building a future of his own.
          </p>
          <p>
            Neither imagines that walking into class at the wrong moment will
            place them beside the person who will change everything.
          </p>
          <p>
            Paired for a six-month science project, they spend long evenings
            collecting water samples, sharing ambitions, and learning the small
            details of each other’s lives. Friendship grows before either is
            ready to call it anything else.
          </p>
          <p>
            But graduating is easier than deciding what they are becoming. Their
            relationship must cross distance, family expectations, cultural
            assumptions, career choices, and the fear that loving someone can
            change more than the heart.
          </p>
          <p>
            <em>They do not fall into a perfect future. They build one.</em>
          </p>
          <Button href="/alice-and-james" variant="text">
            Start with Alice & James
          </Button>
        </Reveal>
      </section>
      <Themes />
      <StoryPath />
      <QuoteBand
        quote="Seven hundred miles. Two separate plans. One connection that refuses to fade."
        caption="WHEN DISTANCE BECOMES A REASON TO SHOW UP"
        image={images.drive}
      />
      <section className="section-space container book-details-grid">
        <Reveal>
          <SectionHeading
            eyebrow="FIND YOUR NEXT READ"
            title={
              <>
                For the reader who
                <br />
                <em>feels every page.</em>
              </>
            }
          />
          <ul className="reader-list">
            {[
              "Slow-build romance grounded in friendship and everyday life.",
              "Stories of family, cultural perspective, and personal growth.",
              "Characters with meaningful careers and ambitions of their own.",
              "Themes of faith, loyalty, belonging, and the courage to choose.",
            ].map((text) => (
              <li key={text}>
                <Icon name="check" size={17} />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="book-details" delay={0.1}>
          <h3>Between the covers</h3>
          <dl>
            <div>
              <dt>Title</dt>
              <dd>Paired by Providence</dd>
            </div>
            <div>
              <dt>Author</dt>
              <dd>Samuel Latney</dd>
            </div>
            <div>
              <dt>The story</dt>
              <dd>Relationship-driven contemporary fiction</dd>
            </div>
            <div>
              <dt>Formats & publication</dt>
              <dd>Details coming soon</dd>
            </div>
          </dl>
          <Button href="#where-to-buy" variant="text">
            Explore retailers
          </Button>
        </Reveal>
      </section>
      <section className="book-club-section section-space">
        <div className="container book-club-grid">
          <Reveal>
            <SectionHeading
              eyebrow="THE BOOK CLUB CORNER"
              title={
                <>
                  A story worth
                  <br />
                  <em>talking about.</em>
                </>
              }
            />
            <p className="body-copy">
              A love story makes a better conversation when it asks more than
              “Will they end up together?” Start yours with these spoiler-light
              reflections.
            </p>
            <Button href="/contact" variant="text">
              Connect your book club
            </Button>
          </Reveal>
          <div className="questions">
            {questions.map(([question, answer], i) => (
              <details key={question}>
                <summary>
                  <span>0{i + 1}</span>
                  <h3>{question}</h3>
                  <Icon name="plus" size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Platform />
    </>
  );
}

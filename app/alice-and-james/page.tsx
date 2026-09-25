import Image from "next/image";
import { images, pageMetadata } from "@/lib/site";
import { characters } from "@/components/characters";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow, SectionHeading } from "@/components/ui";
import { QuoteBand } from "@/components/quote-band";
import { Icon } from "@/components/icon";

export const metadata = pageMetadata(
  "Meet Alice & James",
  "Meet Alice and James, the central characters of Paired by Providence, and discover the ambitions, fears, values, and choices that shape their relationship.",
  "/alice-and-james",
);

const moments = [
  ["Late", "A classroom entrance neither planned puts them together."],
  ["The river", "Work becomes conversation. Conversation becomes friendship."],
  [
    "The space between",
    "When the project ends, absence reveals what routine had hidden.",
  ],
  [
    "Seven hundred miles",
    "Distance turns interest into effort — and effort into a question neither can avoid.",
  ],
  [
    "Two families",
    "Love becomes real when it leaves private conversation and enters the lives around them.",
  ],
  [
    "One future",
    "Can two separate plans become one life without either person disappearing inside it?",
  ],
];

export default function CharactersPage() {
  return (
    <>
      <PageIntro
        eyebrow="MEET ALICE & JAMES"
        title={
          <>
            Before they were
            <br />
            <em>a love story.</em>
          </>
        }
      >
        <p>
          Two late students. The same assignment. Everything that happens next
          is what makes them unforgettable.
        </p>
        <Button href="/paired-by-providence" variant="text">
          Discover their story
        </Button>
      </PageIntro>
      {characters.map((person, i) => (
        <section
          key={person.name}
          id={person.name.toLowerCase()}
          className={`profile-section ${i === 1 ? "profile-blue" : ""}`}
        >
          <div
            className={`container profile-grid ${i === 1 ? "profile-reverse" : ""}`}
          >
            <Reveal className="profile-image">
              <Image
                src={person.image}
                alt={`Portrait of ${person.name}, a ${person.path.toLowerCase()} student from ${person.roots}.`}
                fill
                sizes="(max-width: 800px) 100vw, 40vw"
                className="object-cover"
              />
              <span>{person.name}</span>
            </Reveal>
            <Reveal className="profile-copy" delay={0.1}>
              <Eyebrow>
                {person.roots.toUpperCase()} ROOTS · A FUTURE IN{" "}
                {person.path.toUpperCase()}
              </Eyebrow>
              <h2>
                {person.name}
                <em>
                  {i === 0
                    ? "Learning to choose the life she wants."
                    : "Patient when something matters."}
                </em>
              </h2>
              <p className="profile-traits">{person.traits}</p>
              <p>{person.description}</p>
              <p>{person.growth}</p>
              <div className="profile-facts">
                <span>
                  <Icon name="pin" size={16} />
                  {person.roots}
                </span>
                <span>
                  <Icon name={i === 0 ? "medicine" : "law"} size={17} />
                  {person.path}
                </span>
                <span>
                  <Icon name="heart" size={16} />
                  {i === 0 ? "Care & courage" : "Patience & loyalty"}
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
      <section className="section-space together-section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="WHY THEY WORK"
            title={
              <>
                Different strengths.
                <br />
                <em>A shared possibility.</em>
              </>
            }
          />
          <div className="together-grid">
            {[
              {
                title: "Alice brings",
                text: "Care. Observation. Medical discipline. A strong sense of home. Questions she must answer for herself.",
              },
              {
                title: "Together",
                text: "Conversation. Humor. Shared ambition. Respect. A willingness to grow without becoming identical.",
              },
              {
                title: "James brings",
                text: "Patience. Legal reasoning. Steadiness. A strong sense of family. Confidence in what can be built over time.",
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                className={i === 1 ? "together-center" : ""}
              >
                <Icon
                  name={i === 1 ? "heart" : i === 0 ? "feather" : "shield"}
                  size={26}
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space container timeline-section">
        <SectionHeading
          eyebrow="THEIR STORY, WITHOUT THE SPOILERS"
          title={
            <>
              Every step
              <br />
              <em>leads somewhere.</em>
            </>
          }
        />
        <div className="timeline">
          {moments.map(([title, text], i) => (
            <Reveal className="timeline-item" key={title} delay={0.04 * i}>
              <span className="timeline-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <QuoteBand
        quote="Are you afraid of the person — or of what loving that person might change?"
        caption="THE QUESTION AT THE CENTER OF THEIR STORY"
        image={images.dusk}
      />
      <div className="final-cta container">
        <h2>
          Discover where their story <em>takes you.</em>
        </h2>
        <Button href="/paired-by-providence">Explore the book</Button>
      </div>
    </>
  );
}

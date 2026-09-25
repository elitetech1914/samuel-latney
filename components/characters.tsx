import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site";
import { SectionHeading } from "./ui";
import { Icon } from "./icon";
import { Reveal } from "./reveal";

export const characters = [
  {
    name: "Alice",
    image: images.alice,
    roots: "Tennessee",
    path: "Medicine",
    traits: "Compassionate. Ambitious. Independent.",
    line: "A carefully imagined future. An unexpected change of heart.",
    description:
      "Alice likes plans because plans make the future feel understandable. James complicates that certainty. The more she trusts him, the more she confronts what she believes about family, belonging, career, and the kind of woman she wants to become.",
    growth:
      "Her journey is not about losing herself in a relationship. It is about learning that choosing love can also be an act of choosing herself.",
  },
  {
    name: "James",
    image: images.james,
    roots: "Virginia",
    path: "Law",
    traits: "Patient. Grounded. Quietly confident.",
    line: "Steady in his purpose. Open to what life has planned.",
    description:
      "James understands early that what exists between them matters. His strength is not grand speeches; it is consistency. He shows up. He travels. He listens. He introduces Alice to his world and makes room for hers, building toward a shared future even when the path is slow.",
    growth:
      "His journey is about building a shared future without asking Alice to surrender her own. He knows that important things take time.",
  },
];

export function Characters() {
  return (
    <section className="section-space characters-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="MEET ALICE & JAMES"
            title={
              <>
                Two different futures.
                <br />
                <em>One unexpected partnership.</em>
              </>
            }
          >
            <p>
              Before they were a love story, they were two people with plans of
              their own.
            </p>
          </SectionHeading>
        </Reveal>
        <div className="character-grid">
          {characters.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.12}>
              <Link
                href={`/alice-and-james#${person.name.toLowerCase()}`}
                className={`character-card character-${person.name.toLowerCase()}`}
              >
                <Image
                  src={person.image}
                  alt={`Portrait of ${person.name}, a ${person.path.toLowerCase()} student from ${person.roots}.`}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="character-overlay" />
                <span className="character-topline">
                  {person.roots.toUpperCase()} ROOTS · A FUTURE IN{" "}
                  {person.path.toUpperCase()}
                </span>
                <div className="character-content">
                  <h3>
                    {person.name}
                    <span className="character-link">
                      <Icon name="arrowUpRight" size={23} />
                    </span>
                  </h3>
                  <p>{person.traits}</p>
                  <span className="character-description">{person.line}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { images } from "@/lib/site";
import { Reveal } from "./reveal";
import { Button, SectionHeading } from "./ui";
import { Icon } from "./icon";

const scenes = [
  {
    title: "An unexpected beginning",
    label: "THE CLASSROOM",
    image: images.classroom,
    alt: "Alice and James arriving late to a sunlit university classroom.",
    text: "One late arrival. One shared assignment. Two lives placed on a path neither could see coming.",
  },
  {
    title: "Something quietly changes",
    label: "THE RIVER",
    image: images.river,
    alt: "Alice and James collecting water samples beside a river at sunset.",
    text: "Evenings by the water become conversations. Conversations become trust. And strangers become something more.",
  },
  {
    title: "A future worth choosing",
    label: "THE POSSIBILITY",
    image: images.beach,
    alt: "Alice and James walking beside the ocean in Virginia.",
    text: "Beyond the classroom, real life asks a bigger question: what if the unexpected is exactly where you belong?",
  },
];

export function StoryPath() {
  return (
    <section id="the-beginning" className="section-space story-section">
      <div className="container">
        <Reveal className="section-heading-row">
          <SectionHeading
            eyebrow="EVERY STORY STARTS SOMEWHERE"
            title={
              <>
                One late arrival.
                <br />
                <em>A lifetime neither expected.</em>
              </>
            }
          />
          <div className="story-heading-aside">
            <p>
              It wasn’t part of the plan.
              <br />
              That’s what made it the beginning.
            </p>
            <Button href="/paired-by-providence#synopsis" variant="text">
              Read about the book
            </Button>
          </div>
        </Reveal>
        <div className="story-grid">
          {scenes.map((scene, i) => (
            <Reveal delay={i * 0.1} key={scene.label}>
              <article className="scene-card">
                <div className="scene-image">
                  <Image
                    src={scene.image}
                    alt={scene.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="scene-number">0{i + 1}</span>
                </div>
                <div className="scene-meta">
                  <span>{scene.label}</span>
                  <Icon name="arrowUpRight" size={16} />
                </div>
                <h3>{scene.title}</h3>
                <p>{scene.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

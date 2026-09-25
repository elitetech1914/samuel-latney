import Image from "next/image";
import { images, pageMetadata } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { QuoteBand } from "@/components/quote-band";

export const metadata = pageMetadata(
  "About Samuel Latney",
  "Meet Samuel Latney and explore the ideas behind Paired by Providence: human connection, choice, family, ambition, faith, and the lives we build.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT SAMUEL LATNEY"
        title={
          <>
            Stories begin
            <br />
            with <em>people.</em>
          </>
        }
      >
        <p>
          The ones we meet. The ones we choose.
          <br />
          The ones who change us.
        </p>
      </PageIntro>
      <section className="container section-space editorial-grid">
        <Reveal className="editorial-image">
          <Image
            src={images.reading}
            alt="A quiet moment with an open book at a coastal window."
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
            className="object-cover"
          />
          <span className="image-caption">
            A LITTLE QUIET. A WORLD OF POSSIBILITY.
          </span>
        </Reveal>
        <Reveal className="editorial-copy">
          <SectionHeading
            eyebrow="THE PERSON BEHIND THE PAGES"
            title={
              <>
                The choices that
                <br />
                <em>shape a life.</em>
              </>
            }
          />
          <p className="lead-copy">
            Samuel Latney is the author of <em>Paired by Providence</em>, a
            relationship-centered novel about two people whose futures begin to
            change after one ordinary moment brings them together.
          </p>
          <p>
            Through Alice and James, Samuel explores love, family, loyalty,
            race, career, faith, and the quiet decisions that determine whether
            we live by other people’s expectations or by the life we believe is
            truly ours.
          </p>
          <p>
            His author platform begins with Alice and James — and leaves room
            for the stories, questions, and publications that come next.
          </p>
          <span className="author-signature">Samuel Latney</span>
          <Button href="/paired-by-providence" variant="text">
            Discover Paired by Providence
          </Button>
        </Reveal>
      </section>
      <QuoteBand
        quote="A meaningful life does not always arrive in the form we expected."
        caption="AT THE HEART OF PAIRED BY PROVIDENCE"
        image={images.shore}
      />
      <section className="section-space">
        <div className="container reading-columns">
          <Reveal>
            <SectionHeading
              eyebrow="WHY THIS STORY"
              title={
                <>
                  An ordinary moment.
                  <br />
                  <em>An extraordinary possibility.</em>
                </>
              }
            />
            <p>
              Alice and James do not meet under perfect circumstances. They are
              late. Their professor pairs them for a project. Nothing about the
              moment announces itself as important.
            </p>
            <p>
              Their relationship grows through work, conversation, distance,
              family, uncertainty, patience, and trust. The story asks what
              happens when two people keep choosing each other while the world
              around them has opinions about their future.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow="BEYOND THE LAST PAGE"
              title={
                <>
                  A life of your own.
                  <br />
                  <em>A life shared with others.</em>
                </>
              }
            />
            <p>
              Family matters. Friendship matters. Culture, career, and faith
              matter. But there are moments when we have to decide what we
              believe for ourselves.
            </p>
            <p>
              Alice’s journey is about more than accepting James. It is about
              learning that love, adulthood, and purpose require her to take
              responsibility for the future she chooses.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="future-section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="THE ROAD AHEAD"
            title={
              <>
                One book is <em>only the beginning.</em>
              </>
            }
          >
            <p>
              Return for future stories, reader resources, and news from
              Samuel’s writing world. There is always another chapter ahead.
            </p>
          </SectionHeading>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="#reader-list">Stay close to the story</Button>
            <Button href="/contact" variant="text">
              Contact Samuel
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

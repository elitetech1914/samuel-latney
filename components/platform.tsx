import Image from "next/image";
import { retailers } from "@/lib/site";
import { SectionHeading } from "./ui";
import { Icon } from "./icon";
import { Reveal } from "./reveal";

type Retailer = { name: string; image: string; href: string };
export function Platform({
  platforms = retailers,
}: {
  platforms?: Retailer[];
}) {
  const anyAvailable = platforms.some((platform) => platform.href);
  return (
    <section id="where-to-buy" className="platform-section section-space">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="YOUR NEXT CHAPTER AWAITS"
            title={
              <>
                Ready to begin <em>the story?</em>
              </>
            }
          >
            <p>
              {anyAvailable
                ? "Find your favorite place to read. Choose a retailer and step into Alice and James’s world."
                : "Your favorite places to read. Purchase links will be added as the book’s listings become available."}
            </p>
          </SectionHeading>
        </Reveal>
        <div className="platform-grid">
          {platforms.map((platform, i) => (
            <Reveal delay={i * 0.06} key={platform.name}>
              {platform.href ? (
                <a
                  className="platform-card"
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buy Paired by Providence at ${platform.name} (opens in a new tab)`}
                >
                  <Image
                    src={platform.image}
                    alt={platform.name}
                    width={160}
                    height={65}
                    className="platform-logo"
                  />
                  <span>
                    Explore the book
                    <Icon name="arrowUpRight" size={14} />
                  </span>
                </a>
              ) : (
                <div className="platform-card platform-pending">
                  <Image
                    src={platform.image}
                    alt={platform.name}
                    width={160}
                    height={65}
                    className="platform-logo"
                  />
                  <span>
                    Link coming soon
                    <Icon name="book" size={13} />
                  </span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
        <p className="platform-footnote">
          <Icon name="book" size={15} />
          One story. A world to step into.
        </p>
      </div>
    </section>
  );
}

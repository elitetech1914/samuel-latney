import { Icon, type IconName } from "./icon";
import { SectionHeading } from "./ui";
import { Reveal } from "./reveal";

const themes: { title: string; icon: IconName; text: string }[] = [
  {
    title: "Love",
    icon: "heart",
    text: "Not instant certainty. A relationship built through patience, presence, and the everyday choice to stay.",
  },
  {
    title: "Family",
    icon: "users",
    text: "Two worlds learning to meet. The people who shape us, and the room we make for something new.",
  },
  {
    title: "Identity",
    icon: "compass",
    text: "The courage to move beyond expectations and choose a life that feels like your own.",
  },
  {
    title: "Loyalty",
    icon: "shield",
    text: "Friendship, trust, and the difference between a shared history and true faithfulness.",
  },
  {
    title: "Purpose",
    icon: "feather",
    text: "Two meaningful callings. Medicine and law. A shared future that makes space for both.",
  },
  {
    title: "Providence",
    icon: "sparkles",
    text: "What if the moments that redirect us are the beginning of something we cannot yet see?",
  },
];

export function Themes() {
  return (
    <section className="themes-section section-space">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="MORE THAN A LOVE STORY"
            title={
              <>
                The things that make us <em>human.</em>
              </>
            }
          >
            <p>
              Falling in love is only the beginning. Building a life asks for
              more.
            </p>
          </SectionHeading>
        </Reveal>
        <div className="themes-grid">
          {themes.map((theme, index) => (
            <Reveal key={theme.title} delay={(index % 3) * 0.07}>
              <article className="theme-card">
                <div className="theme-icon">
                  <Icon name={theme.icon} size={25} />
                </div>
                <h3>{theme.title}</h3>
                <p>{theme.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

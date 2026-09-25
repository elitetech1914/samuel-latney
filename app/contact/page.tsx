import { contactEnabled, pageMetadata } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/forms";
import { Icon, type IconName } from "@/components/icon";
import { Eyebrow } from "@/components/ui";

export const metadata = pageMetadata(
  "Contact Samuel Latney",
  "Contact Samuel Latney regarding Paired by Providence, reader messages, book clubs, interviews, bookstores, events, collaborations, and publishing inquiries.",
  "/contact",
);

const inquiries: { name: string; text: string; icon: IconName }[] = [
  {
    name: "Readers & book clubs",
    text: "Your thoughts, reading-group conversations, and questions about the story.",
    icon: "book",
  },
  {
    name: "Media & podcasts",
    text: "Interviews, features, reviews, and conversations about the book’s themes.",
    icon: "mail",
  },
  {
    name: "Bookstores & events",
    text: "Readings, signing inquiries, author appearances, and community events.",
    icon: "users",
  },
  {
    name: "Collaborations & publishing",
    text: "Creative partnerships, speaking opportunities, and professional inquiries.",
    icon: "feather",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S CONNECT"
        title={
          <>
            A story can begin
            <br />
            with <em>one conversation.</em>
          </>
        }
      >
        <p>
          A reader’s thought. A book club’s question. An idea for something new.
          There’s room for your story here.
        </p>
      </PageIntro>
      <section className="container section-space contact-grid">
        <aside>
          <Eyebrow>A NOTE IS ALWAYS WELCOME</Eyebrow>
          <h2>
            What brings
            <br />
            <em>you here?</em>
          </h2>
          <div className="inquiry-list">
            {inquiries.map((item) => (
              <div key={item.name}>
                <span className="inquiry-icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-small-note">
            <Icon name="heart" size={18} />
            <p>
              Thank you for being part of the world of{" "}
              <em>Paired by Providence.</em>
            </p>
          </div>
        </aside>
        <div className="contact-form-card">
          <h2>Send a little hello.</h2>
          <p className="form-intro">
            Tell us what’s on your mind. Fields are required unless marked
            optional.
          </p>
          <ContactForm enabled={contactEnabled} />
        </div>
      </section>
      <section className="professional-strip">
        <div className="container">
          <Icon name="feather" size={28} />
          <div>
            <h3>A professional inquiry?</h3>
            <p>
              For media, bookstore, event, or book-club requests, choose the
              matching category in the form. Approved media materials will be
              available here as they are finalized.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

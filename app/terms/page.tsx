import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Website Information",
  "Information about book listings, website content, and external retailer links.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="WEBSITE INFORMATION"
        title={
          <>
            The details
            <br />
            <em>between the lines.</em>
          </>
        }
      />
      <div className="container legal-copy">
        <h2>About this site</h2>
        <p>
          This website introduces Samuel Latney and his novel, Paired by
          Providence. Character images illustrate the fictional world of the
          story.
        </p>
        <h2>Book availability</h2>
        <p>
          Publication dates, editions, pricing, and purchase links are shown
          only as they become available. This website does not currently process
          purchases. Any future retailer links lead to independent stores whose
          purchase, delivery, and return terms apply.
        </p>
        <h2>Content and inquiries</h2>
        <p>
          Website and book materials are presented for discovering and
          discussing the work. Please use the contact page for permissions,
          professional requests, or questions when messaging becomes available.
        </p>
      </div>
    </>
  );
}

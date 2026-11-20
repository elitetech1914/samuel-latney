import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { getZohoMailConfig } from "@/lib/form-delivery";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy",
  "Information about privacy and reader inquiries on Samuel Latney’s author website.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR INFORMATION"
        title={
          <>
            A little clarity
            <br />
            about <em>privacy.</em>
          </>
        }
      />
      <div className="container legal-copy">
        <h2>Browsing this website</h2>
        <p>
          This website does not add advertising trackers, analytics cookies, or
          third-party font requests. The hosting provider may process standard
          request information to deliver pages and maintain the service.
        </p>
        <h2>Contact and reader-list forms</h2>
        <p>
          The contact form collects the details you enter so we can respond to
          your inquiry. The reader-list form collects your email address so we
          can send you reader updates.
          {getZohoMailConfig() &&
            " Zoho Mail delivers these submissions to our inbox."}
        </p>
        <h2>Retailer links</h2>
        <p>
          When available, purchase links open retailer websites. Those websites
          have their own privacy practices.
        </p>
        <h2>Questions</h2>
        <p>
          Please visit the <Link href="/contact">contact page</Link> for the
          current availability of reader communications.
        </p>
      </div>
    </>
  );
}

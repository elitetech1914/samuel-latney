import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Accessibility",
  "Accessibility features and navigation guidance for Samuel Latney’s website.",
  "/accessibility",
);
export default function AccessibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="A STORY FOR EVERY READER"
        title={
          <>
            Make yourself
            <br />
            <em>at home.</em>
          </>
        }
      />
      <div className="container legal-copy">
        <h2>Reading and navigation</h2>
        <p>
          The website includes keyboard navigation, visible focus indicators,
          labeled form fields, descriptive image text, and a skip-to-content
          link. On smaller screens, the menu opens as a dialog and can be closed
          with the Escape key.
        </p>
        <h2>Motion preferences</h2>
        <p>
          When your device requests reduced motion, background drifting, hover
          movement, and scroll animations are disabled. Text and links remain
          available without waiting for animation.
        </p>
        <h2>A comfortable view</h2>
        <p>
          You can increase your browser’s text size or zoom to read more
          comfortably. Layouts adapt to smaller screens, and story images have
          text descriptions where they add meaning.
        </p>
      </div>
    </>
  );
}

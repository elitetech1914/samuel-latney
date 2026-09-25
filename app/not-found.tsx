import Image from "next/image";
import { images } from "@/lib/site";
import { Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="not-found">
      <Image
        src={images.shore}
        alt="A quiet shoreline at sunset."
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="container">
        <Eyebrow light>404 · AN UNEXPECTED TURN</Eyebrow>
        <h1>
          This page took
          <br />
          <em>an unexpected turn.</em>
        </h1>
        <p>Every story finds its way home. Let’s get you back to ours.</p>
        <Button href="/">Back to the beginning</Button>
      </div>
    </section>
  );
}

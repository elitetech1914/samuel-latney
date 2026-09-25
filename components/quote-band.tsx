import Image from "next/image";
import { images } from "@/lib/site";
import { Reveal } from "./reveal";

export function QuoteBand({
  quote = "What if the moment that changes everything first looks like an inconvenience?",
  caption = "ONE MOMENT. A DIFFERENT KIND OF FOREVER.",
  image = images.dusk,
}: {
  quote?: string;
  caption?: string;
  image?: string;
}) {
  return (
    <section className="quote-band">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="quote-shade" />
      <Reveal className="container relative z-10">
        <span className="quote-mark">“</span>
        <h2>{quote}</h2>
        <p>{caption}</p>
      </Reveal>
    </section>
  );
}

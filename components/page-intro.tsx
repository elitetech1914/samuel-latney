import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <div className="page-intro-copy">{children}</div>}
      </div>
      <span className="intro-decoration" aria-hidden="true" />
    </section>
  );
}

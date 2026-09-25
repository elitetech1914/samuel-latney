import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

export function Button({
  children,
  href,
  variant = "gold",
  icon = "arrowUpRight",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "gold" | "outline" | "dark" | "text";
  icon?: IconName;
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      <Icon name={icon} size={17} />
    </Link>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "text-center mx-auto" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}

import { createElement, type SVGProps } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  BookOpen,
  Heart,
  Users,
  Compass,
  ShieldCheck,
  Sparkles,
  Feather,
  Menu,
  X,
  Mail,
  MapPin,
  GraduationCap,
  Scale,
  Plus,
  Check,
  Send,
  LoaderCircle,
} from "lucide";

const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  arrowDown: ArrowDown,
  book: BookOpen,
  heart: Heart,
  users: Users,
  compass: Compass,
  shield: ShieldCheck,
  sparkles: Sparkles,
  feather: Feather,
  menu: Menu,
  close: X,
  mail: Mail,
  pin: MapPin,
  medicine: GraduationCap,
  law: Scale,
  plus: Plus,
  check: Check,
  send: Send,
  loading: LoaderCircle,
};
export type IconName = keyof typeof icons;

// Render the installed Lucide icon data as React SVGs; no DOM mutation required.
export function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {icons[name].map(([tag, attrs], index) =>
        createElement(tag, { ...attrs, key: index }),
      )}
    </svg>
  );
}

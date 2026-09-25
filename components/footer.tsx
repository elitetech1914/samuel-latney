import Link from "next/link";
import { navigation } from "@/lib/site";
import { Icon } from "./icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark">
              Samuel Latney<span>AUTHOR & STORYTELLER</span>
            </Link>
            <p>
              Stories about love, choice, family,
              <br />
              and the unexpected turns that lead us home.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/paired-by-providence" className="footer-book-link">
            <span>
              ONE MOMENT CAN
              <br />
              CHANGE EVERYTHING.
            </span>
            <Icon name="arrowUpRight" size={29} />
          </Link>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Samuel Latney. All rights reserved.
          </p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
          <a href="#main" aria-label="Back to top">
            BACK TO TOP
            <Icon name="arrowUpRight" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { Icon } from "./icon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const cinematic = pathname === "/" || pathname === "/paired-by-providence";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (menuOpen) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  return (
    <>
      <header
        className={`site-header ${cinematic && !scrolled ? "header-transparent" : "header-solid"}`}
      >
        <div className="container header-inner">
          <Link href="/" aria-label="Samuel Latney home" className="wordmark">
            Samuel Latney<span>AUTHOR & STORYTELLER</span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button button-gold header-cta"
            href="/paired-by-providence"
          >
            Discover the Book
            <Icon name="arrowUpRight" size={16} />
          </Link>
          <button
            className="menu-toggle"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={26} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        onCancel={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
      >
        <div className="mobile-menu-top">
          <span className="wordmark">
            Samuel Latney<span>AUTHOR & STORYTELLER</span>
          </span>
          <button
            aria-label="Close navigation"
            className="menu-toggle"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" size={28} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
              <Icon name="arrowUpRight" />
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-note">Love. Choice. A little providence.</p>
      </dialog>
    </>
  );
}

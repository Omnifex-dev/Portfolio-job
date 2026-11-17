"use client";

import { useEffect, useState } from "react";
import { contacts, navLinks, site } from "@/lib/site";
import { Close, Menu } from "./icons";

const sectionIds = navLinks.map(({ href }) => href.slice(1));

/** Tracks which section currently sits under the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the screen decides the active section.
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => href.slice(1) === active;

  return (
    <>
      {/* Fade so content scrolls softly under the bar. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32 bg-[linear-gradient(0deg,transparent,var(--bg)_70%)]"
      />
      <header className="fixed left-1/2 top-0 z-50 w-[calc(100%-30px)] -translate-x-1/2 md:w-[94%]">
        <nav className="relative flex items-center justify-between py-5 xl:py-9" aria-label="Main">
          <a
            href="#home"
            className="text-[13px] font-bold tracking-[0.2px] sm:text-base xl:text-lg"
            onClick={() => setOpen(false)}
          >
            {site.name.toUpperCase()}
          </a>

          <a
            href={contacts.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[13px] font-medium tracking-[0.8px] lg:block xl:text-base"
          >
            {site.role}
          </a>

          <ul className="hidden items-center gap-10 text-sm font-semibold tracking-[0.8px] md:flex xl:gap-20 xl:text-base">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={isActive(href) ? "location" : undefined}
                  className="hover-link uppercase"
                >
                  <span className="hover-in">
                    <span>{label}</span>
                    <span>{label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <ul
            id="mobile-menu"
            className="animate-rise-in flex flex-col border-t border-line bg-bg/95 py-2 backdrop-blur md:hidden"
          >
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "location" : undefined}
                  className={`block py-3 text-sm font-semibold uppercase tracking-[0.8px] ${
                    isActive(href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  );
}

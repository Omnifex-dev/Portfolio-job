"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import { Close, Menu } from "./icons";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-shallow to-coral font-display text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition-transform group-hover:rotate-12">
            {site.name.charAt(0)}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-white/15 text-white shadow-inner shadow-white/10"
                    : "text-cyan-50/80 hover:bg-white/8 hover:text-white"
                }`}
              >
                {label}
              </Link>
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
        <ul id="mobile-menu" className="glass animate-rise-in mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl p-3 md:hidden">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`block rounded-2xl px-4 py-3 font-medium ${
                  isActive(href) ? "bg-white/15 text-white" : "text-cyan-50/85 hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

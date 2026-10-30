import { contacts, site } from "@/lib/site";
import { GitHub, Mail, Telegram } from "./icons";

const links = [
  { href: contacts.telegram.url, label: "Telegram", Icon: Telegram },
  { href: contacts.github.url, label: "GitHub", Icon: GitHub },
  { href: contacts.email.url, label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-6">
      <div className="glass mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-3xl px-6 py-5 text-sm text-cyan-50/75 sm:flex-row">
        <p>
          © {site.name} · {site.role}
        </p>
        <ul className="flex items-center gap-2">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full text-cyan-50/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

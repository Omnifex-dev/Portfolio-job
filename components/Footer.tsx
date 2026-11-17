import CurrentYear from "./CurrentYear";
import { contacts, site } from "@/lib/site";
import { GitHub, Mail, Telegram } from "./icons";

const links = [
  { href: contacts.telegram.url, label: "Telegram", Icon: Telegram },
  { href: contacts.github.url, label: "GitHub", Icon: GitHub },
  { href: contacts.email.url, label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex w-[calc(100%-30px)] flex-col items-center justify-between gap-4 py-8 text-sm md:w-[94%] sm:flex-row">
        <p className="font-medium opacity-50">
          © <CurrentYear /> {site.name} · {site.role}
        </p>
        <ul className="flex items-center gap-6">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-ink transition-colors"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

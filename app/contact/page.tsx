import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { ArrowRight, GitHub, Mail, Telegram } from "@/components/icons";
import { contacts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact me",
  description: "Get in touch via Telegram, email or GitHub.",
};

const channels = [
  {
    label: "Telegram",
    value: contacts.telegram.handle,
    href: contacts.telegram.url,
    note: "Fastest way to reach me",
    Icon: Telegram,
    accent: "from-[#43b6f0] to-[#1f8fd6]",
  },
  {
    label: "Email",
    value: contacts.email.address,
    href: contacts.email.url,
    note: "For project details and proposals",
    Icon: Mail,
    accent: "from-coral to-[#ff9a7a]",
  },
  {
    label: "GitHub",
    value: contacts.github.handle,
    href: contacts.github.url,
    note: "Code, experiments and open source",
    Icon: GitHub,
    accent: "from-[#4b5d73] to-[#1d2a3a]",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Contact me" title="Let's build something great">
        Have a project in mind or a role to discuss? Pick whichever channel suits you and I&apos;ll get back to you.
      </PageHeader>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {channels.map(({ label, value, href, note, Icon, accent }, i) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="glass animate-rise-in group flex flex-col items-center rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-foam/40"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className={`grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
              <Icon className="size-8" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold text-white">{label}</h2>
            <p className="mt-1 break-all font-medium text-foam">{value}</p>
            <p className="mt-3 text-sm text-cyan-50/65">{note}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral">
              Open {label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

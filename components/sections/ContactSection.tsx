import CurrentYear from "@/components/CurrentYear";
import { ArrowRight } from "@/components/icons";
import { contacts, site } from "@/lib/site";

const channels = [
  { label: "Telegram", href: contacts.telegram.url, note: "Fastest way to reach me" },
  { label: "Email", href: contacts.email.url, note: "For project details and proposals" },
  { label: "GitHub", href: contacts.github.url, note: "Code, experiments and open source" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto flex min-h-[60vh] w-[calc(100%-30px)] max-w-7xl scroll-mt-32 flex-col pt-32 md:w-[94%]"
      aria-label="Contact me"
    >
      <h3 className="mb-10 text-[32px] font-normal uppercase sm:text-[40px] lg:text-[55px] 2xl:text-6xl">
        Contact
      </h3>

      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col">
          <h4 className="text-sm font-medium opacity-60 sm:text-[15px]">Let&apos;s build something great</h4>
          <p className="mb-4 mt-2 max-w-sm text-sm leading-relaxed sm:text-[15px]">
            Have a project in mind or a role to discuss? Pick whichever channel suits you and I&apos;ll get back to you.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-4 text-sm font-medium opacity-60 sm:text-[15px]">Social</h4>
          {channels.map(({ label, href, note }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group mb-5 inline-flex items-center justify-between gap-6 border-b border-[#ccc] pb-1 text-base sm:text-lg lg:text-2xl"
            >
              <span>
                {label}
                <span className="ml-3 hidden text-sm font-light text-ink/50 lg:inline">{note}</span>
              </span>
              <ArrowRight className="size-5 -rotate-45 transition-transform group-hover:rotate-0" />
            </a>
          ))}
        </div>

        <div className="flex flex-col justify-end">
          <h2 className="text-base font-normal leading-snug sm:text-lg lg:text-[22px]">
            Designed and developed <br />
            by <span className="text-accent">{site.name}</span>
          </h2>
          <h5 className="mt-3 text-sm font-medium opacity-50">© <CurrentYear /></h5>
        </div>
      </div>
    </section>
  );
}

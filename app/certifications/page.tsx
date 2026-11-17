import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { Award, ExternalLink } from "@/components/icons";
import { certifications, certificateUrl, type Certification } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Verified HackerRank role and skill certificates.",
};

const groups: { kind: Certification["kind"]; title: string; text: string }[] = [
  { kind: "role", title: "Role certificates", text: "Job-role assessments covering multiple skills end to end." },
  { kind: "skill", title: "Skill certificates", text: "Focused assessments of a single language or framework." },
];

function CertificateCard({ cert, large }: { cert: Certification; large: boolean }) {
  return (
    <article className="glass group flex flex-col overflow-hidden rounded-[10px] transition duration-300 hover:-translate-y-1 hover:border-accent">
      <a
        href={certificateUrl(cert.id)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.title} certificate on HackerRank`}
        className="relative block aspect-[1.42] overflow-hidden"
      >
        {cert.image ? (
          <Image
            src={cert.image}
            alt={`${cert.title} certificate`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#ffffff,#f1eaff_45%,#dccbff)] p-3 text-black">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-double border-violet/40 px-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet">
                {cert.kind === "role" ? "Role certification" : "Skill certification"}
              </p>
              <p className={`mt-3 font-bold leading-tight text-black ${large ? "text-4xl" : "text-3xl"}`}>
                {cert.title}
              </p>
              <span className="my-4 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-sm text-black/70">Verified by {cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-black/50">Credential ID · {cert.id}</p>
              <span
                className={`absolute grid place-items-center rounded-full bg-gradient-to-br from-[#fb8dff] to-violet text-white shadow-lg shadow-violet/30 transition-transform duration-500 group-hover:rotate-12 ${
                  large ? "bottom-6 right-6 size-14" : "right-5 top-5 size-9"
                }`}
              >
                <Award className={large ? "size-7" : "size-5"} />
              </span>
            </div>
          </div>
        )}
      </a>
      <div className="flex items-center gap-4 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#fb8dff] to-violet text-white">
          <Award className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-white ${large ? "text-xl" : "text-lg"}`}>{cert.title}</h3>
          <p className="text-sm text-muted">
            {cert.issuer} · {cert.kind === "role" ? "Role" : "Skill"} certificate
          </p>
        </div>
        <a
          href={certificateUrl(cert.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          aria-label={`Verify ${cert.title} certificate on HackerRank`}
        >
          Verify <ExternalLink className="size-4" />
        </a>
      </div>
    </article>
  );
}

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Certifications" title="Verified skills">
        Independently assessed certificates from HackerRank. Each one links to its public verification page.
      </PageHeader>

      <div className="mt-12 space-y-14">
        {groups.map(({ kind, title, text }) => (
          <section key={kind} aria-labelledby={`${kind}-certs`}>
            <div className="mb-6">
              <h2 id={`${kind}-certs`} className="text-3xl font-medium text-white">
                {title}
              </h2>
              <p className="mt-1 text-muted">{text}</p>
            </div>
            <div className={`grid gap-6 ${kind === "role" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {certifications
                .filter((c) => c.kind === kind)
                .map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} large={kind === "role"} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { internships } from "@/lib/internships";
import { Search, Clock, BookOpen, Award, ArrowRight, FileText } from "lucide-react";

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: "Internship Programs — Avyron Technologies" },
      { name: "description", content: "Browse project-based virtual internships across engineering, AI, data, design, security and marketing." },
      { property: "og:title", content: "Internship Programs — Avyron Technologies" },
      { property: "og:description", content: "Project-based internships with mentor-reviewed work and verifiable certificates." },
      { property: "og:url", content: "/internships" },
    ],
    links: [{ rel: "canonical", href: "/internships" }],
  }),
  component: InternshipsPage,
});

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const DOMAINS = ["All", "Engineering", "Artificial Intelligence", "Data", "Design", "Security", "Marketing"] as const;

function InternshipsPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>("All");

  const filtered = useMemo(
    () =>
      internships.filter(
        (i) =>
          (level === "All" || i.level === level) &&
          (domain === "All" || i.domain === domain) &&
          (query === "" ||
            i.title.toLowerCase().includes(query.toLowerCase()) ||
            i.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))),
      ),
    [query, level, domain],
  );

  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-28">
          <Eyebrow>Internship Programs</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            Choose your track. Start building this week.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Each program is structured around real industry projects, weekly mentor reviews,
            and a verifiable certificate at the end.
          </p>
        </Section>
      </div>

      <Section>
        {/* Filters */}
        <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-soft -mt-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by skill, title (e.g. React, AI, SQL)"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
              />
            </div>
            <Pills label="Level" options={LEVELS as readonly string[]} value={level} onChange={(v) => setLevel(v as typeof level)} />
            <Pills label="Domain" options={DOMAINS as readonly string[]} value={domain} onChange={(v) => setDomain(v as typeof domain)} />
          </div>
          <div className="text-xs text-muted-foreground mt-3">{filtered.length} programs available</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {filtered.map((i) => (
            <div key={i.slug} className="rounded-2xl border bg-card p-6 hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge>{i.level}</Badge>
                    <Badge tone="muted">{i.domain}</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-2xl mt-3">{i.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{i.tagline}</p>
                </div>
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${i.color} shrink-0`} />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 text-xs">
                <Metric icon={Clock} label="Duration" value={i.duration} />
                <Metric icon={BookOpen} label="Projects" value={`${i.projects} live`} />
                <Metric icon={Award} label="Certificate" value="Verifiable" />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {i.skills.slice(0, 6).map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-5 border-t">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-semibold">₹{i.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{i.originalPrice}</span>
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">
                    Save {Math.round((1 - i.price / i.originalPrice) * 100)}% · Cohort 14
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/internships/$slug"
                    params={{ slug: i.slug }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm hover:bg-muted transition"
                  >
                    <FileText className="h-3.5 w-3.5" /> Details
                  </Link>
                  <Link
                    to="/internships/$slug"
                    params={{ slug: i.slug }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[oklch(0.18_0.04_265)] text-white text-sm hover:opacity-90 transition"
                  >
                    Enroll <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

function Badge({ children, tone = "violet" }: { children: React.ReactNode; tone?: "violet" | "muted" }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md border ${
        tone === "violet"
          ? "bg-violet/10 text-violet border-violet/20"
          : "bg-muted text-muted-foreground border-transparent"
      }`}
    >
      {children}
    </span>
  );
}

function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <Icon className="h-3.5 w-3.5 text-violet" />
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1.5">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Pills({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <span className="text-xs text-muted-foreground shrink-0">{label}:</span>
      <div className="flex gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`text-xs px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
              value === o
                ? "bg-[oklch(0.18_0.04_265)] text-white border-transparent"
                : "hover:bg-muted"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

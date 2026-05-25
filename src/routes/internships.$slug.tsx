import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { getInternship, internships, type Internship } from "@/lib/internships";
import {
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Sparkles,
  FileCheck2,
  Users,
  Github,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/internships/$slug")({
  loader: ({ params }): Internship => {
    const i = getInternship(params.slug);
    if (!i) throw notFound();
    return i;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Internship"} — Avyron Technologies` },
      { name: "description", content: loaderData?.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? ""} Internship — Avyron` },
      { property: "og:description", content: loaderData?.tagline ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/internships/${loaderData?.slug}` },
    ],
    links: [{ rel: "canonical", href: `/internships/${loaderData?.slug}` }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <Section className="text-center !py-32">
        <h1 className="text-3xl font-semibold">Internship not found</h1>
        <Link to="/internships" className="mt-4 inline-block text-violet">Back to all internships</Link>
      </Section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <Section className="text-center !py-32">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </Section>
    </SiteLayout>
  ),
  component: InternshipDetail,
});

function InternshipDetail() {
  const data: Internship = Route.useLoaderData();

  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className={`absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br ${data.color} opacity-30 blur-3xl`} />
        <Section className="relative !py-20 md:!py-28">
          <Link to="/internships" className="text-sm text-white/60 hover:text-white">← All internships</Link>
          <div className="flex items-center gap-2 mt-6">
            <span className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/15">{data.domain}</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/15">{data.level}</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            {data.title} Internship
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-2xl">{data.tagline}</p>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            <HeroMeta icon={Clock} label="Duration" value={data.duration} />
            <HeroMeta icon={BookOpen} label="Projects" value={`${data.projects} hands-on`} />
            <HeroMeta icon={Award} label="Certificate" value="Verifiable" />
            <HeroMeta icon={FileCheck2} label="Recommendation" value="On performance" />
          </div>
        </Section>
      </div>

      <Section className="grid lg:grid-cols-3 gap-10">
        {/* Main */}
        <div className="lg:col-span-2 space-y-14">
          <Block title="Overview">
            <p className="text-muted-foreground leading-relaxed">
              The {data.title} internship is an {data.duration.toLowerCase()} immersive program
              designed for college students who want to move beyond tutorials. You'll work
              through weekly briefs that mirror real product teams, ship {data.projects} portfolio
              projects, and have every submission reviewed by a senior practitioner.
            </p>
          </Block>

          <Block title="Skills you will learn">
            <div className="grid sm:grid-cols-2 gap-2">
              {data.skills.map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </Block>

          <Block title="Tools & technologies">
            <div className="flex flex-wrap gap-2">
              {data.tools.map((t) => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-muted border">{t}</span>
              ))}
            </div>
          </Block>

          <Block title="Weekly curriculum">
            <div className="space-y-3">
              {data.curriculum.map((c, idx) => (
                <details key={c.week} open={idx === 0} className="group rounded-xl border bg-card overflow-hidden">
                  <summary className="cursor-pointer p-5 flex items-center justify-between list-none">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-violet">{c.week}</span>
                      <span className="font-medium">{c.title}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 transition group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 grid sm:grid-cols-2 gap-2">
                    {c.items.map((i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet" /> {i}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </Block>

          <Block title="Project breakdown">
            <div className="grid sm:grid-cols-2 gap-4">
              {data.projectBreakdown.map((p, i) => (
                <div key={p.name} className="rounded-xl border bg-card p-5">
                  <div className="text-xs text-violet font-mono">Project {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display font-semibold mt-1">{p.name}</div>
                  <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-violet/10 text-violet border border-violet/20">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Task submission workflow">
            <ol className="space-y-3">
              {[
                "Receive briefs and acceptance criteria in your dashboard.",
                "Build in your own GitHub repo with clean commits.",
                "Submit your repo URL + deployed link via the task page.",
                "Get a written review + scored evaluation within 72 hours.",
                "Iterate based on feedback before moving to the next week.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-violet/10 text-violet grid place-items-center font-medium text-sm">
                    {i + 1}
                  </div>
                  <p className="text-sm pt-1.5">{s}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Mentor">
            <div className="rounded-xl border bg-card p-6 flex items-start gap-4">
              <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${data.color}`} />
              <div>
                <div className="font-display font-semibold">{data.mentor.name}</div>
                <div className="text-xs text-violet">{data.mentor.role}</div>
                <p className="text-sm text-muted-foreground mt-2">{data.mentor.bio}</p>
              </div>
            </div>
          </Block>

          <Block title="Frequently asked">
            <div className="divide-y border-y">
              {[
                { q: "Is this self-paced?", a: "You get weekly tasks but flexible deadlines. Most students spend 8-12 hours per week." },
                { q: "What if I'm a beginner?", a: "We start from foundations and ramp up. If the level says Beginner, no prior experience is needed." },
                { q: "What does the certificate look like?", a: "A digitally signed certificate with a unique ID, verifiable on verify.avyrontech.com." },
                { q: "Can I get a refund?", a: "Yes — full refund within 7 days of enrollment if the program isn't right for you." },
              ].map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-medium">
                    {f.q}
                    <ArrowRight className="h-4 w-4 transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </Block>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-semibold">₹{data.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{data.originalPrice}</span>
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">
              Save {Math.round((1 - data.price / data.originalPrice) * 100)}% · Cohort 14 ends soon
            </div>
            <button className="w-full mt-5 px-5 py-3 rounded-full bg-[oklch(0.18_0.04_265)] text-white text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
              Enroll Now <ArrowRight className="h-4 w-4" />
            </button>
            <button className="w-full mt-2 px-5 py-3 rounded-full border text-sm font-medium hover:bg-muted transition">
              Download Syllabus (PDF)
            </button>

            <div className="mt-6 pt-6 border-t space-y-3 text-sm">
              <Row icon={Calendar} label="Next cohort" value="Apr 8, 2026" />
              <Row icon={Users} label="Cohort size" value="200 students" />
              <Row icon={Github} label="Submissions" value="GitHub + dashboard" />
              <Row icon={Sparkles} label="Includes" value="Mentor, projects, cert" />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 mt-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommendation letter</div>
            <p className="text-sm mt-2">
              Students who finish with an overall score of <strong>85 or higher</strong> receive a
              personalized recommendation letter from their mentor.
            </p>
          </div>
        </aside>
      </Section>

      {/* Other internships */}
      <Section className="!pt-0">
        <h3 className="font-display font-semibold text-2xl mb-6">Other programs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {internships.filter((i) => i.slug !== data.slug).slice(0, 3).map((i) => (
            <Link
              key={i.slug}
              to="/internships/$slug"
              params={{ slug: i.slug }}
              className="rounded-2xl border bg-card p-5 hover:shadow-soft hover:-translate-y-0.5 transition"
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${i.color}`} />
              <div className="font-display font-semibold mt-3">{i.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{i.duration} · {i.level}</div>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

function HeroMeta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <Icon className="h-4 w-4 text-violet-soft" />
      <div className="text-[10px] uppercase tracking-wide text-white/50 mt-2">{label}</div>
      <div className="text-sm font-medium mt-0.5">{value}</div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-2xl md:text-3xl mb-5">{title}</h2>
      {children}
    </section>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground inline-flex items-center gap-2">
        <Icon className="h-4 w-4" /> {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

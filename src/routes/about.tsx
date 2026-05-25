import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { Target, Lightbulb, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Avyron Technologies" },
      { name: "description", content: "Avyron Technologies builds project-based virtual internships that prepare students for real product teams." },
      { property: "og:title", content: "About — Avyron Technologies" },
      { property: "og:description", content: "Our mission, philosophy and team behind Avyron Technologies." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-28">
          <Eyebrow>About Avyron</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            We're rebuilding the bridge between college and industry.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 text-lg">
            College gives you theory. Companies expect shipped work. We built Avyron to close
            that gap with structured, project-based virtual internships — guided by people
            who actually build products for a living.
          </p>
        </Section>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Make practical industry experience accessible to every student.
            </h2>
          </div>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              For most students, the only way to learn what real engineering or design feels
              like is to land a paid internship — and those are scarce, geographically limited
              and often biased toward a handful of campuses.
            </p>
            <p>
              Avyron gives any student that experience: real briefs, real reviews, real
              portfolio output. Remote, structured and rigorously evaluated.
            </p>
          </div>
        </div>
      </Section>

      <div className="bg-[oklch(0.97_0.01_260)] border-y">
        <Section>
          <Eyebrow>Our philosophy</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold mb-10">Built around how people actually learn.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Target, t: "Project-first", d: "We don't lecture. You build, get reviewed, and improve. Every concept is anchored to a deliverable." },
              { icon: Lightbulb, t: "Honest feedback", d: "Every submission is reviewed by a senior practitioner. No participation trophies." },
              { icon: Users, t: "Cohort energy", d: "You learn alongside other students, see their submissions, and grow with peer review." },
            ].map((p) => (
              <div key={p.t} className="rounded-2xl border bg-card p-6">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-violet/10 text-violet">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="font-display font-semibold mt-4 text-lg">{p.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{p.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <Eyebrow>Timeline</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold mb-10">From idea to 12,000 students.</h2>
        <div className="relative border-l-2 border-violet/20 pl-8 space-y-10">
          {[
            { y: "2023", t: "Avyron founded", d: "Started with a small Full Stack cohort of 40 students from 6 colleges." },
            { y: "2024", t: "Six tracks live", d: "Expanded to AI/ML, Data, Design, Security and Marketing. Crossed 2,500 enrollments." },
            { y: "2025", t: "Verification platform", d: "Launched our public certificate verification portal used by 200+ recruiters." },
            { y: "2026", t: "12,400+ students", d: "Cohort 14 now serving students across 300+ colleges in India and abroad." },
          ].map((m) => (
            <div key={m.y} className="relative">
              <div className="absolute -left-[42px] top-1.5 h-4 w-4 rounded-full bg-violet-gradient ring-4 ring-background" />
              <div className="text-xs font-mono text-violet">{m.y}</div>
              <div className="font-display font-semibold text-lg mt-1">{m.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{m.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-[oklch(0.97_0.01_260)] border-y">
        <Section>
          <Eyebrow>The team</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold mb-10">Mentors from companies you've heard of.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { n: "Aditya Rao", r: "Staff Engineer · Ex-Razorpay" },
              { n: "Dr. Priya Menon", r: "Applied Scientist · Ex-MSR" },
              { n: "Neha Kulkarni", r: "Sr. Analyst · Ex-Flipkart" },
              { n: "Rhea Sharma", r: "Lead Designer · Ex-Swiggy" },
              { n: "Karan Verma", r: "Security Engineer · OSCP" },
              { n: "Ishaan Gupta", r: "Growth Lead · Ex-Zomato" },
              { n: "Vivek Pillai", r: "ML Engineer · Ex-Atlassian" },
              { n: "Sanya Kapoor", r: "PM · Ex-Microsoft" },
            ].map((m, i) => (
              <div key={m.n} className="rounded-2xl border bg-card p-5">
                <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${
                  ["from-violet-500 to-indigo-500", "from-fuchsia-500 to-pink-500", "from-blue-500 to-cyan-500", "from-rose-500 to-orange-500", "from-emerald-500 to-teal-500", "from-amber-500 to-pink-500", "from-indigo-500 to-purple-500", "from-cyan-500 to-blue-500"][i % 8]
                }`} />
                <div className="font-display font-semibold mt-4">{m.n}</div>
                <div className="text-xs text-muted-foreground">{m.r}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="bg-hero text-white">
        <Section className="text-center">
          <Sparkles className="h-6 w-6 mx-auto text-violet-soft" />
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-gradient">
            Want to mentor a cohort?
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            We're always looking for senior engineers and designers to review student work.
          </p>
          <a
            href="mailto:mentors@avyrontech.com"
            className="mt-6 inline-flex px-6 py-3 rounded-full bg-white text-[oklch(0.18_0.04_265)] font-medium hover:shadow-glow transition"
          >
            mentors@avyrontech.com
          </a>
        </Section>
      </div>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Student Projects — Avyron Technologies" },
      { name: "description", content: "Browse real projects shipped by Avyron internship students across engineering, AI, data, design and security." },
      { property: "og:title", content: "Student Projects — Avyron Technologies" },
      { property: "og:description", content: "Portfolio of real student work from Avyron internships." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Project = {
  name: string;
  desc: string;
  author: string;
  domain: "Engineering" | "AI" | "Data" | "Design" | "Security" | "Marketing";
  tags: string[];
  stars: number;
  forks: number;
};

const projects: Project[] = [
  { name: "task-flow-saas", desc: "Multi-tenant task management with realtime collaboration and roles.", author: "Aarav Sharma", domain: "Engineering", tags: ["React", "Node", "Postgres"], stars: 248, forks: 41 },
  { name: "rag-doc-assistant", desc: "Document Q&A using OpenAI embeddings + Pinecone vector search.", author: "Priya Iyer", domain: "AI", tags: ["Python", "LangChain", "Pinecone"], stars: 412, forks: 78 },
  { name: "growth-dashboard", desc: "Cohort, funnel and retention analytics dashboard for SaaS.", author: "Neha Kulkarni", domain: "Data", tags: ["GA4", "Looker", "SQL"], stars: 187, forks: 32 },
  { name: "neobank-mobile", desc: "End-to-end mobile banking app — case study + Figma prototype.", author: "Rhea Sharma", domain: "Design", tags: ["Figma", "Framer"], stars: 156, forks: 12 },
  { name: "owasp-scanner", desc: "Lightweight web vulnerability scanner with reporting.", author: "Karthik Menon", domain: "Security", tags: ["Python", "Burp"], stars: 322, forks: 64 },
  { name: "meta-ads-optimizer", desc: "Auto-optimize creatives based on funnel performance.", author: "Ishaan Gupta", domain: "Marketing", tags: ["GA4", "Meta Ads"], stars: 98, forks: 18 },
  { name: "image-caption-cnn", desc: "Fine-tuned CNN that generates captions for product images.", author: "Tanvi Rao", domain: "AI", tags: ["PyTorch"], stars: 271, forks: 39 },
  { name: "shop-checkout-stripe", desc: "Full e-commerce checkout flow with Stripe and webhooks.", author: "Rohan Joshi", domain: "Engineering", tags: ["Next.js", "Stripe"], stars: 198, forks: 27 },
  { name: "design-system-aurora", desc: "Token-based component library for a fintech product.", author: "Anaya Pillai", domain: "Design", tags: ["Figma", "Tokens"], stars: 142, forks: 9 },
];

const filters = ["All", "Engineering", "AI", "Data", "Design", "Security", "Marketing"] as const;

function ProjectsPage() {
  const [tab, setTab] = useState<(typeof filters)[number]>("All");
  const list = tab === "All" ? projects : projects.filter((p) => p.domain === tab);

  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-28">
          <Eyebrow>Project Showcase</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            Real projects shipped by Avyron students.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Every project below was built, reviewed and submitted as part of a real internship cohort.
          </p>
        </Section>
      </div>

      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className={`text-sm px-4 py-2 rounded-full border transition ${
                tab === f ? "bg-[oklch(0.18_0.04_265)] text-white border-transparent" : "hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <div key={p.name} className="rounded-2xl border bg-card overflow-hidden hover:shadow-soft transition group">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  avyron/<span className="font-semibold">{p.name}</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-violet transition" />
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-violet/10 text-violet border border-violet/20">{t}</span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>by {p.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {p.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {p.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

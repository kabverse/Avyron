import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import {
  LayoutDashboard,
  ListChecks,
  Award,
  GitBranch,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard Preview — Avyron Technologies" },
      { name: "description", content: "A look inside the Avyron student dashboard: enrolled internships, tasks, submissions, mentor feedback and certificates." },
      { property: "og:title", content: "Student Dashboard — Avyron" },
      { property: "og:description", content: "Preview the Avyron student dashboard UI." },
      { property: "og:url", content: "/dashboard" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-24">
          <Eyebrow>Student Dashboard Preview</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            Everything a student needs in one place.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            A preview of the Avyron dashboard — tasks, submissions, mentor feedback, deadlines and certificates.
          </p>
        </Section>
      </div>

      <Section>
        <div className="rounded-3xl border bg-card overflow-hidden shadow-soft">
          {/* App bar */}
          <div className="grid md:grid-cols-[240px_1fr]">
            <aside className="bg-[oklch(0.18_0.04_265)] text-white p-5 md:min-h-[600px]">
              <div className="font-display font-semibold flex items-center gap-2">
                <span className="h-8 w-8 grid place-items-center rounded-lg bg-violet-gradient">A</span>
                avyron
              </div>
              <nav className="mt-8 space-y-1 text-sm">
                {[
                  { i: LayoutDashboard, l: "Overview", active: true },
                  { i: ListChecks, l: "Tasks" },
                  { i: GitBranch, l: "Submissions" },
                  { i: Award, l: "Certificates" },
                  { i: MessageSquare, l: "Mentor" },
                  { i: Calendar, l: "Schedule" },
                ].map((n) => (
                  <div
                    key={n.l}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      n.active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <n.i className="h-4 w-4" /> {n.l}
                  </div>
                ))}
              </nav>
              <div className="mt-10 rounded-xl border border-white/10 p-4">
                <div className="text-xs text-white/60">Cohort 14</div>
                <div className="text-sm font-medium mt-1">Full Stack Track</div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-1/2 bg-violet-gradient" />
                </div>
                <div className="text-[10px] text-white/50 mt-2">Week 4 of 8 · 50%</div>
              </div>
            </aside>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Welcome back,</div>
                  <h2 className="font-display font-semibold text-2xl">Aarav Sharma 👋</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button className="h-9 w-9 grid place-items-center rounded-lg border hover:bg-muted">
                    <Bell className="h-4 w-4" />
                  </button>
                  <div className="h-9 w-9 rounded-full bg-violet-gradient" />
                </div>
              </div>

              {/* Stat row */}
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <Stat icon={ListChecks} label="Tasks completed" value="14 / 24" tone="violet" />
                <Stat icon={TrendingUp} label="Current score" value="92 / 100" tone="emerald" />
                <Stat icon={Award} label="Certificates ready" value="0 · in progress" tone="amber" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {/* Active tasks */}
                <Panel title="This week's tasks">
                  {[
                    { t: "Implement JWT refresh-token rotation", due: "3 days", done: false },
                    { t: "Write integration tests for /auth", due: "5 days", done: false },
                    { t: "Refactor user controller", due: "Done", done: true },
                  ].map((task) => (
                    <div key={task.t} className="flex items-start gap-3 py-3 border-t first:border-t-0">
                      <div
                        className={`h-5 w-5 mt-0.5 rounded-full grid place-items-center border ${
                          task.done ? "bg-emerald-500/15 border-emerald-500/40" : "border-border"
                        }`}
                      >
                        {task.done && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.t}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" /> {task.due}
                        </div>
                      </div>
                    </div>
                  ))}
                </Panel>

                {/* Mentor feedback */}
                <Panel title="Latest mentor feedback">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-violet-gradient shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Aditya Rao</div>
                      <div className="text-xs text-muted-foreground">Staff Engineer · 2 hours ago</div>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Solid API design overall. Tighten the error-handling middleware and you're
                        very close to shipping. Score: 92/100.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-full bg-violet/10 text-violet border border-violet/20">View review</button>
                        <button className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted">Reply</button>
                      </div>
                    </div>
                  </div>
                </Panel>

                {/* Submissions */}
                <Panel title="Recent submissions" full>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-muted-foreground border-b">
                        <tr>
                          <th className="text-left font-medium py-2">Project</th>
                          <th className="text-left font-medium py-2">Branch</th>
                          <th className="text-left font-medium py-2">Status</th>
                          <th className="text-left font-medium py-2">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { p: "task-management-saas", b: "main", s: "Reviewed", sc: "92" },
                          { p: "auth-microservice", b: "feat/jwt", s: "In review", sc: "—" },
                          { p: "blog-cms-week3", b: "main", s: "Reviewed", sc: "88" },
                        ].map((r) => (
                          <tr key={r.p} className="border-b last:border-0">
                            <td className="py-3 font-mono text-xs">avyron/{r.p}</td>
                            <td className="py-3 text-xs text-muted-foreground">{r.b}</td>
                            <td className="py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                                r.s === "Reviewed"
                                  ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                              }`}>{r.s}</span>
                            </td>
                            <td className="py-3 text-sm font-medium">{r.sc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "violet" | "emerald" | "amber" }) {
  const tones = {
    violet: "bg-violet/10 text-violet",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
  } as const;
  return (
    <div className="rounded-xl border p-4">
      <div className={`h-9 w-9 grid place-items-center rounded-lg ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-xs text-muted-foreground mt-3">{label}</div>
      <div className="font-display font-semibold text-lg">{value}</div>
    </div>
  );
}

function Panel({ title, children, full }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${full ? "md:col-span-2" : ""}`}>
      <div className="font-medium mb-3">{title}</div>
      {children}
    </div>
  );
}

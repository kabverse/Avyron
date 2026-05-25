import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { ShieldCheck, Search, CheckCircle2, XCircle, Award, Sparkles } from "lucide-react";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Certificate — Avyron Technologies" },
      { name: "description", content: "Verify the authenticity of an Avyron Technologies internship certificate." },
      { property: "og:title", content: "Verify Certificate — Avyron Technologies" },
      { property: "og:description", content: "Public verification portal for Avyron internship certificates." },
      { property: "og:url", content: "/verify" },
    ],
    links: [{ rel: "canonical", href: "/verify" }],
  }),
  component: VerifyPage,
});

type Result =
  | { status: "valid"; name: string; program: string; date: string; score: number; id: string }
  | { status: "invalid" }
  | null;

function VerifyPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Demo verification logic
      if (id.trim().toUpperCase().startsWith("AVY-") && name.trim().length > 1) {
        setResult({
          status: "valid",
          name: name.trim(),
          program: "Full Stack Development Internship",
          date: "March 14, 2026",
          score: 92,
          id: id.trim().toUpperCase(),
        });
      } else {
        setResult({ status: "invalid" });
      }
      setLoading(false);
    }, 700);
  };

  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/15 bg-white/5">
            <ShieldCheck className="h-3.5 w-3.5 text-violet-soft" /> Verification Portal
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl mx-auto">
            Verify an Avyron certificate
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-white/70">
            Recruiters and institutions can confirm the authenticity of any Avyron-issued
            credential here in seconds.
          </p>
        </Section>
      </div>

      <Section className="!pt-0">
        <div className="max-w-3xl mx-auto -mt-24 relative z-10 grid gap-6">
          <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 md:p-8 shadow-soft">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Certificate ID</label>
                <input
                  required
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. AVY-2026-FS-2841"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Student Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name on certificate"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full px-5 py-3 rounded-full bg-[oklch(0.18_0.04_265)] text-white text-sm font-medium hover:opacity-90 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Search className="h-4 w-4" /> {loading ? "Verifying..." : "Verify Certificate"}
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Demo: any ID starting with <code className="font-mono">AVY-</code> with a name returns a valid result.
            </p>
          </form>

          {result?.status === "valid" && (
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                <div>
                  <div className="font-display font-semibold text-xl">Certificate Verified</div>
                  <div className="text-sm text-muted-foreground">
                    This credential is authentic and was issued by Avyron Technologies.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border bg-card overflow-hidden">
                <div className="p-6 md:p-8 bg-gradient-to-br from-[oklch(0.96_0.02_260)] to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 text-violet" /> Avyron Technologies
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{result.id}</div>
                  </div>
                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Certificate of Completion</div>
                    <div className="mt-3 font-display text-3xl md:text-4xl">{result.name}</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      has successfully completed the <strong>{result.program}</strong> with a final
                      score of <strong>{result.score}/100</strong>.
                    </p>
                  </div>
                  <div className="mt-10 flex justify-between items-end text-xs text-muted-foreground">
                    <div>
                      <Award className="h-5 w-5 text-violet" />
                      <div className="mt-1">Issued · {result.date}</div>
                    </div>
                    <div className="font-mono">verify.avyrontech.com</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result?.status === "invalid" && (
            <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-6">
              <div className="flex items-center gap-3">
                <XCircle className="h-7 w-7 text-destructive" />
                <div>
                  <div className="font-display font-semibold text-xl">No certificate found</div>
                  <div className="text-sm text-muted-foreground">
                    Check the ID and name and try again. Contact support if you believe this is an error.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}

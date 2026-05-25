import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";
import { Mail, MapPin, MessageSquare, Send, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Avyron Technologies" },
      { name: "description", content: "Get in touch with the Avyron Technologies team about internships, partnerships and support." },
      { property: "og:title", content: "Contact — Avyron Technologies" },
      { property: "og:description", content: "Reach the Avyron team for support, partnerships, or general inquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <div className="bg-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-28">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold text-gradient max-w-3xl">
            Talk to the Avyron team
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Whether you're a student with questions, a college looking to partner, or a
            mentor who wants to teach — we'd love to hear from you.
          </p>
        </Section>
      </div>

      <Section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6 md:p-8 shadow-soft">
          {sent ? (
            <div className="text-center py-12">
              <div className="h-12 w-12 mx-auto rounded-full bg-emerald-500/10 grid place-items-center">
                <Send className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="font-display font-semibold text-2xl mt-4">Message sent</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                We typically respond within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" placeholder="Aarav Sharma" />
                <Field label="Email address" type="email" placeholder="you@college.edu" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Inquiry type</label>
                <select className="mt-1 w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40">
                  <option>General question</option>
                  <option>Internship enrollment support</option>
                  <option>College / campus partnership</option>
                  <option>Mentor application</option>
                  <option>Press / media</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40 resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[oklch(0.18_0.04_265)] text-white text-sm font-medium hover:opacity-90 transition inline-flex items-center gap-2"
              >
                <Send className="h-4 w-4" /> Send message
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display font-semibold">Reach us directly</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Item icon={Mail} title="Email" value="support@avyrontech.com" />
              <Item icon={MessageSquare} title="Partnerships" value="partners@avyrontech.com" />
              <Item icon={MapPin} title="HQ" value="Indiranagar, Bengaluru, India" />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display font-semibold">Follow Avyron</h3>
            <div className="flex gap-2 mt-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-lg border hover:bg-muted transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display font-semibold">Quick answers</h3>
            <div className="mt-3 space-y-2 text-sm">
              <Link to="/verify" className="flex items-center justify-between hover:text-violet">Verify a certificate <ArrowRight className="h-3.5 w-3.5" /></Link>
              <Link to="/internships" className="flex items-center justify-between hover:text-violet">Browse internships <ArrowRight className="h-3.5 w-3.5" /></Link>
              <Link to="/refund" className="flex items-center justify-between hover:text-violet">Refund policy <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </aside>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet/40"
      />
    </div>
  );
}

function Item({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-violet mt-0.5" />
      <div>
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

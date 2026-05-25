import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, Eyebrow } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Avyron Technologies" },
      { name: "description", content: "How Avyron Technologies collects, uses and protects your personal data." },
      { property: "og:title", content: "Privacy Policy — Avyron Technologies" },
      { property: "og:description", content: "Privacy practices at Avyron Technologies." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="January 14, 2026"
      sections={[
        { h: "1. Information we collect", p: "We collect information you provide directly (name, email, college, payment details) and automatically through usage (device, IP address, dashboard activity, project submissions) to operate and improve the platform." },
        { h: "2. How we use your data", p: "To deliver the internship, evaluate submissions, issue certificates, communicate updates, prevent fraud, and improve our programs. We do not sell personal data to third parties." },
        { h: "3. Sharing", p: "We share data only with service providers strictly needed to operate Avyron (payments, hosting, email). All providers are bound by confidentiality and data-protection terms." },
        { h: "4. Data retention", p: "We retain account and certification data for as long as your certificate remains verifiable. You may request deletion at any time, subject to legal record-keeping obligations." },
        { h: "5. Your rights", p: "You may access, correct, export or delete your personal data by emailing privacy@avyrontech.com. We respond within 14 business days." },
        { h: "6. Security", p: "We use industry-standard encryption (TLS in transit, AES-256 at rest), access controls and regular audits to protect your information." },
        { h: "7. Contact", p: "Questions about this policy? Email privacy@avyrontech.com or write to Avyron Technologies Pvt. Ltd., Indiranagar, Bengaluru, India." },
      ]}
    />
  ),
});

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <SiteLayout>
      <div className="bg-hero text-white">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Section className="relative !py-20 md:!py-24">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">{title}</h1>
          <p className="mt-3 text-white/60 text-sm">Last updated: {updated}</p>
        </Section>
      </div>
      <Section className="max-w-3xl">
        <div className="prose prose-slate max-w-none">
          {sections.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="font-display font-semibold text-xl mb-2">{s.h}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

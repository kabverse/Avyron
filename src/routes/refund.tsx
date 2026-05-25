import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./privacy";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Avyron Technologies" },
      { name: "description", content: "Avyron Technologies refund policy for internship program enrollments." },
      { property: "og:title", content: "Refund Policy — Avyron" },
      { property: "og:description", content: "How refunds work at Avyron Technologies." },
      { property: "og:url", content: "/refund" },
    ],
    links: [{ rel: "canonical", href: "/refund" }],
  }),
  component: () => (
    <LegalPage
      title="Refund Policy"
      updated="January 14, 2026"
      sections={[
        { h: "1. Risk-free 7 days", p: "You may request a full refund within 7 calendar days of enrollment, no questions asked, as long as you have not submitted more than one weekly task." },
        { h: "2. After 7 days", p: "Between day 8 and the end of week 2, you may request a 50% refund. After week 2 has begun, fees become non-refundable as cohort resources are fully allocated." },
        { h: "3. Cohort changes", p: "If Avyron postpones a cohort, you may transfer to the next cohort at no cost or receive a full refund within 30 days of the postponement." },
        { h: "4. How to request", p: "Email refunds@avyrontech.com from your enrolled email. Approved refunds are processed within 7-10 business days to the original payment method." },
        { h: "5. Exceptions", p: "Promotional or scholarship enrollments may have separate terms communicated at the time of offer. Those terms supersede this policy where applicable." },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Avyron Technologies" },
      { name: "description", content: "Terms governing your use of Avyron Technologies internship programs and platform." },
      { property: "og:title", content: "Terms & Conditions — Avyron" },
      { property: "og:description", content: "Terms of use for Avyron Technologies." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      updated="January 14, 2026"
      sections={[
        { h: "1. Acceptance", p: "By enrolling in any Avyron program or using the platform, you agree to these Terms. If you do not agree, do not use the service." },
        { h: "2. Enrollment", p: "Programs are offered on a per-cohort basis. Enrollment is confirmed only after successful payment. Seats are limited and allocated first-come, first-served." },
        { h: "3. Conduct", p: "You agree to submit original work, attribute external code or assets, and not share program materials publicly without written permission." },
        { h: "4. Certificates", p: "Certificates are issued only upon successful completion as evaluated by Avyron mentors. Recommendation letters require an overall score of 85 or higher." },
        { h: "5. Intellectual property", p: "You own the projects you build. Avyron retains rights to all program materials, briefs, evaluation rubrics, and the platform itself." },
        { h: "6. Limitation of liability", p: "Avyron provides educational programs on an as-is basis. To the maximum extent permitted by law, our liability is limited to the fees you paid for the program in question." },
        { h: "7. Termination", p: "We may suspend or terminate access for violations of these Terms, fraud, or behavior harmful to other students. In such cases, refunds are issued at our discretion." },
        { h: "8. Governing law", p: "These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka." },
      ]}
    />
  ),
});

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  Brain,
  BarChart3,
  Palette,
  Megaphone,
  PenTool,
  Video,
  Briefcase,
  Database,
  Award,
  Users,
  Sparkles,
  Rocket,
  FileCheck,
  Network,
  GraduationCap,
  Layers,
  Heart,
  ChevronDown,
  CheckCircle2,
  Upload,
  ClipboardEdit,
  PlayCircle,
  MailCheck,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { APPLY_URL } from "@/lib/site-config";
import logo from "@/assets/avyron-logo.png";

/* ------------------------------- Helpers ------------------------------- */

function ApplyButton({
  size = "md",
  label = "Apply Now",
  className = "",
}: {
  size?: "md" | "lg";
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left - r.width / 2) * 0.25,
          y: (e.clientY - r.top - r.height / 2) * 0.35,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`group relative inline-flex items-center gap-2 rounded-full font-semibold text-white transition-transform duration-200 ease-out
        ${size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}
        bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400
        shadow-[0_0_40px_-5px_rgba(139,92,246,0.65)]
        hover:shadow-[0_0_60px_-5px_rgba(34,211,238,0.9)] ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative">{label}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Glow({ className = "" }: { className?: string }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- Page -------------------------------- */

function HomePage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Cursor glow
  const cursor = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-black text-white antialiased overflow-x-clip">
      {/* Cursor glow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[1] hidden md:block h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl transition-transform duration-200 ease-out"
      />
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
      />

      <Navbar />

      <Hero />
      <SocialProof />
      <WhyJoin />
      <Domains />
      <HowItWorks />
      <Certificates />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* -------------------------------- Hero -------------------------------- */

function Hero() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 0.4], [0, 120]);

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Animated background blobs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <Glow className="top-[-10%] left-[-10%] h-[40rem] w-[40rem] bg-blue-600/30" />
        <Glow className="top-[20%] right-[-10%] h-[35rem] w-[35rem] bg-violet-600/30" />
        <Glow className="bottom-[-20%] left-[20%] h-[35rem] w-[35rem] bg-cyan-400/20" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <Reveal>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
              Cohort 14 · Applications Open
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-center font-display font-semibold tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[1.02]">
            Build Your Career
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Before Graduation.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 rounded-full"
              />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-7 mx-auto max-w-2xl text-center text-base md:text-lg text-white/65">
            Real industry projects, verified certificates, 1:1 mentorship and a portfolio that
            actually gets you hired — all in one virtual internship designed for Gen Z.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <ApplyButton size="lg" />
            <a
              href="#why"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 transition"
            >
              <PlayCircle className="h-4 w-4" /> See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/45">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No login. No setup. Apply in 60
            seconds.
          </div>
        </Reveal>

        {/* Floating dashboard mock */}
        <Reveal delay={0.4} y={40}>
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-cyan-400/30 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs text-white/40">avyron.code / dashboard</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                <FloatingCard delay={0} className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/50">Current Project</div>
                      <div className="font-display text-xl mt-1">AI Resume Analyzer</div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-md bg-emerald-400/15 text-emerald-300 border border-emerald-400/20">
                      LIVE
                    </span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/50">
                    <span>Week 3 of 5</span>
                    <span className="text-white/70">68%</span>
                  </div>
                </FloatingCard>

                <FloatingCard delay={0.1}>
                  <div className="text-xs text-white/50">Mentor</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
                    <div>
                      <div className="font-medium text-sm">Ananya R.</div>
                      <div className="text-[11px] text-white/50">Sr. Engineer @ Razorpay</div>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/70 inline-block">
                    Next call · Fri 6:30 PM
                  </div>
                </FloatingCard>

                <FloatingCard delay={0.2}>
                  <div className="text-xs text-white/50">Certificate</div>
                  <div className="mt-2 font-display text-lg">Verified ID</div>
                  <div className="text-[11px] text-white/50 mt-1">AVY-2026-A91X4F</div>
                  <div className="mt-3 flex items-center gap-1.5 text-emerald-300 text-xs">
                    <Award className="h-3.5 w-3.5" /> Ready to issue
                  </div>
                </FloatingCard>

                <FloatingCard delay={0.3} className="md:col-span-2">
                  <div className="text-xs text-white/50">Skills you're building</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "Postgres", "OpenAI", "Tailwind", "GitHub"].map(
                      (s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70"
                        >
                          {s}
                        </span>
                      ),
                    )}
                  </div>
                </FloatingCard>
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex absolute -left-10 top-20 items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> +12 XP earned
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex absolute -right-8 bottom-16 items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-xs"
            >
              <Heart className="h-3.5 w-3.5 text-pink-400" /> Mentor liked your PR
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl border border-white/10 bg-white/[0.04] p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- Social Proof ----------------------------- */

function SocialProof() {
  const stats = [
    { value: 12400, suffix: "+", label: "Students enrolled" },
    { value: 9800, suffix: "+", label: "Certificates issued" },
    { value: 9, suffix: "", label: "Internship domains" },
    { value: 4, suffix: " weeks", label: "Avg. program duration" },
  ];

  return (
    <section className="relative py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="text-center md:text-left">
                <div className="font-display text-4xl md:text-5xl font-semibold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                  <Counter to={s.value} />
                  {s.suffix}
                </div>
                <div className="text-xs md:text-sm text-white/50 mt-2 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center text-xs uppercase tracking-[0.2em] text-white/40">
            Mentors & alumni from
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["Razorpay", "Zomato", "Swiggy", "Flipkart", "Postman", "CRED", "Zoho", "Freshworks"].map(
              (c) => (
                <span
                  key={c}
                  className="font-display text-lg md:text-xl text-white/35 hover:text-white/80 transition"
                >
                  {c}
                </span>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

/* ------------------------------ Why Join ------------------------------ */

function WhyJoin() {
  const items = [
    { Icon: Briefcase, title: "Real Experience", text: "Ship real production-grade work, not toy assignments." },
    { Icon: FileCheck, title: "Verified Certificates", text: "Blockchain-verifiable IDs trusted by recruiters." },
    { Icon: GraduationCap, title: "Resume Building", text: "Portfolio + LOR + LinkedIn polish included." },
    { Icon: Layers, title: "Flexible Virtual", text: "Learn from anywhere, on your own schedule." },
    { Icon: Network, title: "Powerful Network", text: "Join a community of 12k+ student builders." },
    { Icon: Code2, title: "Hands-on Projects", text: "3–5 portfolio projects you can actually demo." },
    { Icon: Rocket, title: "Portfolio Boost", text: "Hosted projects, GitHub reviews, case studies." },
    { Icon: Users, title: "1:1 Mentorship", text: "Weekly calls with engineers from top startups." },
  ];

  return (
    <section id="why" className="relative py-28">
      <Glow className="top-1/2 -translate-y-1/2 left-[-20%] h-[30rem] w-[30rem] bg-violet-600/20" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Why Avyron</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Everything you need to actually <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                get hired.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.04}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden hover:border-white/20 transition">
                <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/0 group-hover:bg-violet-500/30 blur-3xl transition-all duration-500" />
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10">
                  <it.Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="mt-5 font-display font-semibold text-lg">{it.title}</div>
                <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Domains ------------------------------- */

function Domains() {
  const domains = [
    { Icon: Code2, name: "Web Development", from: "from-blue-500", to: "to-cyan-400", big: true },
    { Icon: Palette, name: "UI/UX Design", from: "from-pink-500", to: "to-rose-400" },
    { Icon: Brain, name: "AI / ML", from: "from-violet-500", to: "to-fuchsia-400", big: true },
    { Icon: Megaphone, name: "Digital Marketing", from: "from-orange-500", to: "to-amber-400" },
    { Icon: PenTool, name: "Graphic Design", from: "from-emerald-500", to: "to-teal-400" },
    { Icon: ClipboardEdit, name: "Content Writing", from: "from-indigo-500", to: "to-blue-400" },
    { Icon: Database, name: "Data Science", from: "from-cyan-500", to: "to-sky-400" },
    { Icon: Video, name: "Video Editing", from: "from-red-500", to: "to-rose-400" },
    { Icon: BarChart3, name: "Business Dev", from: "from-yellow-500", to: "to-orange-400" },
  ];

  return (
    <section id="domains" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                Program Domains
              </span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
                Pick your track. <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Start building this week.
                </span>
              </h2>
            </div>
            <ApplyButton />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-4">
          {domains.map((d, i) => (
            <Reveal
              key={d.name}
              delay={i * 0.03}
            >
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 overflow-hidden hover:-translate-y-1 hover:border-white/25 transition-all duration-300 ${
                  d.big ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-gradient-to-br ${d.from} ${d.to}`}
                  style={{ opacity: 0 }}
                />
                <div className="relative flex flex-col h-full justify-between">
                  <div
                    className={`h-12 w-12 rounded-xl grid place-items-center bg-gradient-to-br ${d.from} ${d.to} shadow-[0_8px_30px_-10px_currentColor]`}
                  >
                    <d.Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-semibold">{d.name}</div>
                    <div className="mt-1 text-xs text-white/45 flex items-center gap-1 group-hover:text-cyan-300 transition">
                      Explore program <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How It Works ----------------------------- */

function HowItWorks() {
  const steps = [
    { Icon: Sparkles, title: "Click Apply Now", text: "Tap the glowing button anywhere on this page." },
    { Icon: ClipboardEdit, title: "Fill the Google Form", text: "Tell us your domain, college and goals — takes 60 seconds." },
    { Icon: Upload, title: "Upload Payment Proof", text: "Submit your screenshot inside the same form. No extra step." },
    { Icon: MailCheck, title: "Get Confirmation", text: "Receive your offer letter + onboarding kit within 24 hours." },
    { Icon: Rocket, title: "Start Internship", text: "Join your cohort, meet your mentor, and start shipping." },
  ];

  return (
    <section id="how" className="relative py-28 bg-white/[0.02] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">How it works</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              From form to first project in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                under 24 hours.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 relative">
          {/* connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
                  <div className="absolute -top-3 -left-3 h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 grid place-items-center text-xs font-semibold shadow-[0_0_20px_-5px_rgba(139,92,246,0.8)]">
                    {i + 1}
                  </div>
                  <div className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10">
                    <s.Icon className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="mt-4 font-display font-semibold">{s.title}</div>
                  <p className="mt-1 text-sm text-white/55">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 flex justify-center">
            <ApplyButton size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Certificates ----------------------------- */

function Certificates() {
  return (
    <section id="certificates" className="relative py-28 overflow-hidden">
      <Glow className="top-10 right-[-10%] h-[30rem] w-[30rem] bg-cyan-400/20" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              Certificates & Offer Letters
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Credentials that{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                recruiters trust.
              </span>
            </h2>
            <p className="mt-5 text-white/60 max-w-md">
              Every internship ends with a verifiable certificate ID, an official offer letter and a
              letter of recommendation from your mentor — all shareable on LinkedIn in one click.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Unique verifiable certificate ID",
                "Official Avyron Code offer letter",
                "Mentor-signed letter of recommendation",
                "LinkedIn-ready credential cards",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-white/75">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ApplyButton />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} y={40}>
          <div className="relative h-[460px]">
            {/* stack */}
            {[
              { rot: -8, y: 30, z: 1, label: "Offer Letter", color: "from-blue-500/20 to-cyan-400/10" },
              { rot: 4, y: 0, z: 2, label: "Certificate of Internship", color: "from-violet-500/20 to-fuchsia-500/10" },
              { rot: -3, y: -30, z: 3, label: "Letter of Recommendation", color: "from-cyan-400/20 to-blue-500/10" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                whileInView={{ opacity: 1, y: c.y, rotate: c.rot }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: c.z }}
                className={`absolute inset-x-0 mx-auto top-1/2 -translate-y-1/2 w-[88%] max-w-[460px] aspect-[1.4/1] rounded-2xl border border-white/15 bg-gradient-to-br ${c.color} backdrop-blur-xl p-6 shadow-2xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="" className="h-7 w-7 rounded-full ring-1 ring-white/20" />
                    <span className="font-display text-sm">Avyron Code</span>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-white/50">
                    Verified
                  </span>
                </div>
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {c.label}
                  </div>
                  <div className="mt-2 font-display text-2xl">Aarav Mehta</div>
                  <div className="text-xs text-white/50">Full Stack Internship · Cohort 14</div>
                </div>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-white/40">Credential ID</div>
                    <div className="font-mono text-xs text-white/80">AVY-2026-A91X4F</div>
                  </div>
                  <Award className="h-10 w-10 text-cyan-300/80" />
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "CSE · IIIT Hyderabad",
    text: "Honestly thought it'd be another fake internship. Ended up building 3 real projects and got a PPO. Wild.",
  },
  {
    name: "Rohan Verma",
    role: "ECE · VIT Vellore",
    text: "The mentor calls were unreal. My LinkedIn blew up after I posted the certificate. 10/10.",
  },
  {
    name: "Aisha Khan",
    role: "Design · NID Ahmedabad",
    text: "Finally an internship that doesn't feel corporate. The vibe is so Gen Z and the work is actually fun.",
  },
  {
    name: "Karthik Iyer",
    role: "AI · BITS Pilani",
    text: "Shipped an ML project that ended up on my resume's top line. Recruiters keep asking about it.",
  },
  {
    name: "Sneha Reddy",
    role: "Marketing · Christ University",
    text: "I came for a certificate. Stayed for the community. Best decision of my 2nd year.",
  },
  {
    name: "Devansh Patel",
    role: "Data Sci · IIT BHU",
    text: "The portfolio review alone was worth it. Got 4 interviews in 2 weeks after applying.",
  },
];

function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              Loved by students
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Don't take our word for it.
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <Marquee items={TESTIMONIALS} reverse={false} />
        <div className="mt-5">
          <Marquee items={[...TESTIMONIALS].reverse()} reverse />
        </div>
      </div>
    </section>
  );
}

function Marquee({
  items,
  reverse,
}: {
  items: typeof TESTIMONIALS;
  reverse: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
              <div>
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-[11px] text-white/45">{t.role}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">"{t.text}"</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* --------------------------------- FAQ --------------------------------- */

function FAQ() {
  const qs = [
    { q: "Is the internship completely virtual?", a: "Yes. 100% remote. Join from anywhere with a laptop and internet." },
    { q: "Will I receive a certificate?", a: "Absolutely. You'll get a verifiable certificate, an offer letter and an LOR." },
    { q: "How do I apply?", a: "Just click any 'Apply Now' button. It opens our single Google Form — that's the entire process." },
    { q: "Is there real mentorship?", a: "Yes. Weekly 1:1 calls with engineers and designers from top Indian startups." },
    { q: "What is the program duration?", a: "Most tracks run 4 weeks. Some advanced tracks are 6 weeks." },
    { q: "How do I submit my payment proof?", a: "Just upload the screenshot inside the same Google Form. No separate portal." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 bg-white/[0.02] border-y border-white/5">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">FAQ</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
              Quick answers.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {qs.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/50 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-white/60 leading-relaxed">{item.a}</p>
                </motion.div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA ------------------------------ */

function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] bg-violet-600/40" />
      <Glow className="top-1/2 left-1/4 -translate-y-1/2 h-[20rem] w-[20rem] bg-cyan-400/30" />
      <Glow className="top-1/2 right-1/4 -translate-y-1/2 h-[20rem] w-[20rem] bg-blue-500/30" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <img
            src={logo}
            alt="Avyron"
            className="mx-auto h-16 w-16 rounded-full ring-1 ring-white/20 shadow-[0_0_60px_-10px_rgba(139,92,246,0.8)]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-5xl md:text-7xl font-semibold leading-[1.05]">
            Your career shouldn't <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              wait for graduation.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-white/65 max-w-xl mx-auto">
            Join 12,000+ students already building real projects, real portfolios and a real
            head-start. Applications close when Cohort 14 is full.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <ApplyButton size="lg" label="Apply Now — It's Free to Start" />
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-6 text-xs text-white/40">
            No account needed. Just one Google Form.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HomePage;
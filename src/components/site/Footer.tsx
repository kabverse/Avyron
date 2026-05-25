import { Mail } from "lucide-react";
import logo from "@/assets/avyron-logo.png";

export function Footer() {
  return (
    <footer className="relative bg-black text-white/70 border-t border-white/10 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60rem] rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Avyron Code" className="h-10 w-10 rounded-full ring-1 ring-white/20" />
          <div>
            <div className="font-display font-semibold text-white">Avyron Code</div>
            <div className="text-xs text-white/50">Build your career before graduation.</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { Icon: Mail, href: "mailto:hello@avyron.code" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 grid place-items-center rounded-full border border-white/10 hover:border-cyan-400/50 hover:bg-white/5 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.7)] transition"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Avyron Code. All rights reserved.</p>
          <p>hello@avyron.code · Made for India's next-gen builders.</p>
        </div>
      </div>
    </footer>
  );
}

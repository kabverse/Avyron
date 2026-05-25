import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/avyron-logo.png";
import { APPLY_URL } from "@/lib/site-config";

const links = [
  { href: "#domains", label: "Programs" },
  { href: "#why", label: "Why Us" },
  { href: "#how", label: "How it Works" },
  { href: "#certificates", label: "Certificates" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-white">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold text-lg">
          <img src={logo} alt="Avyron Code" className="h-9 w-9 rounded-full ring-1 ring-white/15" />
          <span>Avyron<span className="text-cyan-400">.</span>Code</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2 text-sm rounded-full font-medium text-white bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.9)] transition-shadow"
          >
            Apply Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1 text-white">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2 text-center rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 text-white font-medium"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

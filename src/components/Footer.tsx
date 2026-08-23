import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#06070b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <a href="#" className="inline-block focus-visible:ring-2 focus-visible:ring-accent rounded-xl" aria-label="Abdul Samad Portfolio Homepage">
              <Logo size="sm" subtitle={true} />
            </a>
            <p className="text-slate-500 text-xs mt-2 font-mono">© 2026 Abdul Samad · Full Stack &amp; Backend Engineer. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="https://github.com/ABDLSamaD"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/40"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/abdul-samad-421793309"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/40"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:samadpakhtoon09@gmail.com"
              className="hover:text-white transition-colors p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/40"
              title="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#06070b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <a href="#" className="text-2xl font-bold tracking-tighter text-gradient">AS.</a>
            <p className="text-slate-500 text-sm mt-1">© 2026 Abdul Samad · Full Stack Developer. All rights reserved.</p>
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
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-accent/50 text-text-dim hover:text-white text-xs font-mono transition-all ml-2 group"
                title="Admin Security & Inquiries Portal"
              >
                <ShieldCheck size={14} className="text-accent group-hover:scale-110 transition-transform" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

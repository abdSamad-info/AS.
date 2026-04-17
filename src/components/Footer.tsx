import { motion } from "motion/react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
             <a href="#" className="text-2xl font-bold tracking-tighter text-gradient">AS.</a>
             <p className="text-slate-500 text-sm mt-2">© 2026 Abdul Samad. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
             <a href="https://github.com/ABDLSamaD" target="_blank" className="hover:text-white transition-colors"><Github size={20} /></a>
             <a href="https://www.linkedin.com/in/abdul-samad-421793309" target="_blank" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
             <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
             <a href="mailto:samadpakhtoon09@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
          </div>

          <div className="text-slate-500 text-sm">
             Designed & Built with <span className="text-rose-500">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

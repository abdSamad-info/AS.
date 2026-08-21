import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isOpen 
          ? "bg-transparent py-4" 
          : scrolled 
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-4" 
            : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-white hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <span>AS</span>
          <span className="text-accent text-3xl leading-none">.</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="text-xs uppercase tracking-widest font-semibold text-text-dim hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full border border-text-dim group-hover:bg-accent group-hover:border-accent transition-all" />
              {link.name}
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-4 border-l border-white/10 pl-6 ml-2"
          >
            <a 
              href="https://github.com/ABDLSamaD" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/abdul-samad-421793309" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Mobile Toggle Button (Visible only when menu is closed) */}
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-white w-10 h-10 flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 rounded-full transition-colors active:scale-95 shadow-sm"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-white" />
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[120] md:hidden bg-[#06070c] flex flex-col p-6 sm:p-8 overflow-y-auto"
          >
            {/* Mobile Menu Header - Single clear Close button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 shrink-0">
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 text-2xl font-black tracking-tighter text-white"
              >
                <span>AS</span>
                <span className="text-accent text-3xl leading-none">.</span>
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg"
                aria-label="Close menu"
              >
                <X size={16} className="text-accent" />
                <span>Close</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-5 mb-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white hover:text-accent transition-colors flex items-center justify-between py-2 border-b border-white/5 active:text-accent"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-accent/80 font-normal">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            {/* Mobile Footer & Socials */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-6 border-t border-white/10 flex flex-col gap-4 mt-8 shrink-0"
            >
              <div className="flex gap-4">
                <a 
                  href="https://github.com/ABDLSamaD" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-colors"
                  title="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://linkedin.com/in/abdul-samad-421793309" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="mailto:samadpakhtoon09@gmail.com" 
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent/40 transition-colors"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-text-dim">
                Abdul Samad · Full Stack Developer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

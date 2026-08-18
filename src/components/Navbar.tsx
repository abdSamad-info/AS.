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
          ? "bg-[#050505] py-4" 
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

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white w-10 h-10 flex items-center justify-center border border-white/10 rounded-full"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 z-[90] md:hidden bg-[#050505] flex flex-col p-8 pt-28"
          >
            <nav className="flex flex-col gap-6 mb-auto overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-3xl font-black uppercase tracking-tighter text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-8 border-t border-white/10 flex flex-col gap-4"
            >
              <div className="flex gap-6">
                <a 
                  href="https://github.com/ABDLSamaD" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white hover:text-accent transition-colors"
                >
                  <Github size={22} />
                </a>
                <a 
                  href="https://linkedin.com/in/abdul-samad-421793309" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white hover:text-accent transition-colors"
                >
                  <Linkedin size={22} />
                </a>
                <a 
                  href="mailto:samadpakhtoon09@gmail.com" 
                  className="text-white hover:text-accent transition-colors"
                >
                  <Mail size={22} />
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-text-dim">
                © 2026 ABDUL SAMAD · KARACHI, PAKISTAN
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

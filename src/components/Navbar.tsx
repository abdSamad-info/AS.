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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-lg border-b border-glass-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-accent"
        >
          AS.
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full border border-text-dim group-hover:bg-accent group-hover:border-accent transition-all" />
              {link.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-4 border-l border-white/10 pl-8 ml-4"
          >
            <a href="https://github.com/ABDLSamaD" target="_blank" className="text-slate-400 hover:text-white">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/abdul-samad-421793309" target="_blank" className="text-slate-400 hover:text-white">
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden bg-bg/95 backdrop-blur-2xl flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black tracking-tighter text-accent">AS.</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 mb-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-10 border-t border-glass-border flex flex-col gap-6"
            >
              <div className="flex gap-8">
                <a href="https://github.com/ABDLSamaD" target="_blank" className="text-white hover:text-accent transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/abdul-samad-421793309" target="_blank" className="text-white hover:text-accent transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-black text-text-dim">
                © 2026 ABDUL SAMAD. ALL RIGHTS RESERVED.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

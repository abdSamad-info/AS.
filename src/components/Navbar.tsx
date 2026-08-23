import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";

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
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isOpen
          ? "bg-transparent py-2.5 sm:py-3"
          : scrolled
            ? isDark
              ? "bg-[#06070c]/85 backdrop-blur-xl border-b border-white/10 py-2.5 sm:py-3 shadow-lg shadow-black/20"
              : "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-2.5 sm:py-3 shadow-sm shadow-slate-200/50"
            : "bg-transparent py-3.5 sm:py-4"
      }`}
    >
      {/* Constrained container width: 700px on tablet/md, max-w-5xl on desktop */}
      <div className="w-full max-w-[700px] lg:max-w-5xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="focus-visible:ring-2 focus-visible:ring-accent rounded-xl outline-none"
          aria-label="Abdul Samad Portfolio Homepage"
        >
          <Logo size="md" />
        </motion.a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5 group ${
                isDark
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full border border-current group-hover:bg-accent group-hover:border-accent transition-all" />
              {link.name}
            </motion.a>
          ))}

          {/* Desktop Single Theme Switcher Toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all active:scale-95 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent outline-none ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-accent"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-accent shadow-xs"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun size={16} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={16} className="text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </motion.button>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center space-x-3.5 border-l pl-5 ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <a
              href="https://github.com/ABDLSamaD"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
              }`}
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/abdul-samad-421793309"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
              }`}
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>
          </motion.div>
        </div>

        {/* Mobile Top Bar Action (ONLY Hamburger Button) */}
        <div className="flex md:hidden items-center">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className={`w-9 h-9 flex items-center justify-center border rounded-xl transition-colors active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-accent outline-none ${
                isDark
                  ? "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                  : "border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shadow-sm"
              }`}
              aria-label="Open main navigation menu"
              aria-expanded={false}
              aria-controls="mobile-menu-drawer"
            >
              <Menu size={19} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed inset-0 z-[120] md:hidden flex flex-col p-6 overflow-y-auto ${
              isDark
                ? "bg-[#06070c]/98 backdrop-blur-2xl text-white"
                : "bg-white/98 backdrop-blur-2xl text-slate-900 shadow-2xl"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Top Header (Logo + Close Button) */}
            <div className={`flex items-center justify-between pb-4 border-b mb-6 shrink-0 ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="focus-visible:ring-2 focus-visible:ring-accent rounded-xl outline-none"
                aria-label="Abdul Samad Portfolio Homepage"
              >
                <Logo size="md" />
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-accent outline-none ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                }`}
                aria-label="Close menu"
              >
                <X size={15} className="text-accent" />
                <span>Close</span>
              </button>
            </div>

            {/* Navigation Links in Center */}
            <nav className="flex flex-col gap-2 mb-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.03 }}
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight transition-colors flex items-center justify-between py-3 px-3.5 rounded-xl border-b active:scale-[0.99] ${
                    isDark
                      ? "text-white hover:text-accent hover:bg-white/5 border-white/5"
                      : "text-slate-800 hover:text-accent hover:bg-slate-100 border-slate-100"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-accent font-normal">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom Section: Single Theme Toggle + Socials + Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`pt-5 border-t flex flex-col gap-4 mt-6 shrink-0 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              {/* Single Simple Light/Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border text-xs font-semibold transition-all active:scale-[0.98] ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                }`}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <div className="flex items-center gap-2.5">
                  {isDark ? (
                    <Sun size={16} className="text-amber-400" />
                  ) : (
                    <Moon size={16} className="text-indigo-600" />
                  )}
                  <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  isDark ? "bg-accent/20 text-accent" : "bg-accent text-white"
                }`}>
                  {isDark ? "Dark Active" : "Light Active"}
                </span>
              </button>

              {/* Social Links & Info */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2.5">
                  <a
                    href="https://github.com/ABDLSamaD"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:text-accent hover:border-accent/40"
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:text-accent hover:border-accent/40"
                    }`}
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/abdul-samad-421793309"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:text-accent hover:border-accent/40"
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:text-accent hover:border-accent/40"
                    }`}
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="mailto:samadpakhtoon09@gmail.com"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:text-accent hover:border-accent/40"
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:text-accent hover:border-accent/40"
                    }`}
                    title="Email"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>

                <p className={`text-[10px] uppercase tracking-widest font-mono ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  Abdul Samad
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

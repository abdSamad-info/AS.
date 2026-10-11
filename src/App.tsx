/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ResumeModal from "./components/ResumeModal";
import AdminModal from "./components/AdminModal";
import Scroll3DLine from "./components/Scroll3DLine";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === "/admin" || path.startsWith("/admin/") || hash === "#admin";
    }
    return false;
  });

  const isAnyModalOpen = isResumeOpen || isProjectModalOpen || isAdminOpen;

  // Listen to popstate / hashchange for direct /admin URL navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminOpen(path === "/admin" || path.startsWith("/admin/") || hash === "#admin");
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Global shortcut to toggle Admin Portal (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (typeof window !== "undefined" && (window.location.pathname === "/admin" || window.location.hash === "#admin")) {
      window.history.pushState({}, "", "/");
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg selection:bg-accent/30 relative overflow-hidden text-white transition-colors duration-300">
        {/* Accessible Keyboard Navigation Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-2.5 focus:bg-accent focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#06070b] font-mono text-xs font-bold uppercase tracking-wider"
        >
          Skip to Main Content
        </a>

        {/* Dynamic 3D Curved Scroll Trail - Only rendered on md+ screens to ensure ultra-smooth performance on low-RAM mobile devices */}
        <div className="hidden md:block">
          <Scroll3DLine />
        </div>

        {/* Background Ambient Atmospheric Glows (optimized & lightweight on mobile) */}
        <div className="hidden sm:block absolute top-[-5%] right-[-5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-accent/10 blur-[90px] pointer-events-none z-0 will-change-transform" />
        <div className="hidden sm:block absolute top-[35%] right-[-8%] w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none z-0 will-change-transform" />
        <div className="hidden sm:block absolute bottom-[20%] left-[-5%] w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none z-0 will-change-transform" />
        <div className="hidden sm:block absolute bottom-[5%] right-[10%] w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full bg-emerald-500/[0.03] blur-[90px] pointer-events-none z-0 will-change-transform" />

        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <About onOpenResume={() => setIsResumeOpen(true)} />
          <Experience onOpenResume={() => setIsResumeOpen(true)} />
          <Projects onModalStateChange={setIsProjectModalOpen} />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <BackToTop isModalOpen={isAnyModalOpen} />

        {/* Interactive CV / Resume Viewer & Uploader Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Simple Admin Portal via /admin URL */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={handleCloseAdmin}
        />
      </div>
    </ThemeProvider>
  );
}

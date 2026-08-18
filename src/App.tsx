/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ResumeModal from "./components/ResumeModal";
import AdminModal from "./components/AdminModal";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const isAnyModalOpen = isResumeOpen || isProjectModalOpen || isAdminOpen;

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

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-glow blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent-glow/50 blur-[100px] pointer-events-none z-0" />

      <Navbar />
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <Skills />
        <Experience />
        <Projects onModalStateChange={setIsProjectModalOpen} />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <BackToTop isModalOpen={isAnyModalOpen} />

      {/* Interactive CV / Resume Viewer & Uploader Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Admin Security & Submissions Log Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

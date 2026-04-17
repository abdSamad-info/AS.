/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [debug, setDebug] = useState<string[]>([]);

  useEffect(() => {
    const images = ["/profile.jpg", "/presia.png", "/electrica.png", "/abdfolio.png"];
    const checkImages = async () => {
      const logs: string[] = [];
      for (const img of images) {
        try {
          const res = await fetch(img, { method: 'HEAD' });
          logs.push(`${img}: ${res.status} ${res.statusText}`);
        } catch (e) {
          logs.push(`${img}: FAILED TO FETCH (${(e as Error).message})`);
        }
      }
      setDebug(logs);
      console.log("Image Diagnostics:", logs);
    };
    checkImages();
  }, []);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 relative overflow-hidden">
      {/* Simple Debug Overlay - Only search for this if images fail */}
      {window.location.hostname !== 'localhost' && (
        <div className="fixed bottom-4 left-4 z-[999] bg-black/80 text-[10px] p-2 rounded text-green-400 font-mono border border-white/10 opacity-50 hover:opacity-100">
          <p className="font-bold mb-1">PROD IMAGE DEBUG:</p>
          {debug.map((log, i) => <p key={i}>{log}</p>)}
        </div>
      )}
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-glow blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent-glow/50 blur-[100px] pointer-events-none z-0" />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

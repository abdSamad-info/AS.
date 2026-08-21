import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Terminal,
  Database,
  Cpu,
  GraduationCap
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation - Escape closes modal & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Abdul-Samad-Resume.pdf";
    link.download = "Abdul-Samad-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 pt-6 sm:pt-10 pb-8">
                {/* Backdrop click dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0"
                />

                {/* Modal Container */}
                <motion.div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="resume-modal-title"
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl my-auto bg-[#0b0c13] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[88vh] sm:max-h-[90vh] overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#0b0c13]/95 backdrop-blur-md shrink-0 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 id="resume-modal-title" className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                          Abdul Samad
                        </h3>
                        <p className="text-xs text-text-dim">Full Stack Developer · Production Resume</p>
                      </div>
                    </div>

                    {/* Header Actions: Download CV + Close */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs sm:text-sm font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(61,90,254,0.4)] active:scale-95"
                        title="Download Resume PDF"
                      >
                        <Download size={15} />
                        <span>Download CV</span>
                      </button>

                      <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent active:scale-95"
                        aria-label="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body - Enhanced Professional Resume */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-7">
                    <div className="bg-[#0f101a] border border-white/10 rounded-2xl p-5 sm:p-9 text-slate-300 font-sans space-y-8 shadow-inner">
                      
                      {/* CV Top Header */}
                      <div className="border-b border-white/10 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-[11px] font-mono font-medium mb-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                              <span>AVAILABLE FOR OPPORTUNITIES</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              Abdul Samad
                            </h1>
                            <p className="text-sm sm:text-base font-semibold text-accent mt-1">
                              Full Stack Developer · Node.js · PERN / MERN · TypeScript · GCP
                            </p>
                          </div>

                          <div className="text-xs text-slate-300 space-y-1.5 font-mono sm:text-right bg-white/[0.02] sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/5 sm:border-none">
                            <p className="flex items-center sm:justify-end gap-2 text-slate-300">
                              <MapPin size={13} className="text-accent shrink-0" /> Karachi, Pakistan
                            </p>
                            <p className="flex items-center sm:justify-end gap-2 text-slate-300">
                              <Phone size={13} className="text-accent shrink-0" /> 0330-5786110
                            </p>
                            <p className="flex items-center sm:justify-end gap-2 text-slate-300">
                              <Mail size={13} className="text-accent shrink-0" /> samadpakhtoon09@gmail.com
                            </p>
                          </div>
                        </div>

                        {/* Social Profile Links */}
                        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5 text-xs font-medium">
                          <a 
                            href="https://github.com/ABDLSamaD" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          >
                            <Github size={14} className="text-accent" />
                            <span>github.com/ABDLSamaD</span>
                            <ExternalLink size={11} className="text-slate-400" />
                          </a>
                          <a 
                            href="https://linkedin.com/in/abdul-samad-421793309" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          >
                            <Linkedin size={14} className="text-accent" />
                            <span>linkedin.com/in/abdul-samad</span>
                            <ExternalLink size={11} className="text-slate-400" />
                          </a>
                        </div>
                      </div>

                      {/* Professional Summary */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal size={16} className="text-accent" />
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                            Professional Summary
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                          Full Stack Developer with dedicated professional experience building production web applications using 
                          <strong className="text-white"> Node.js, Express.js, React, TypeScript, PostgreSQL, MongoDB, and Google Cloud Platform</strong>. 
                          Experienced in designing scalable REST & GraphQL APIs, authentication workflows (OAuth 2.0, Session tokens, JWT), database modeling, cloud deployments (App Engine, Cloud SQL, Secret Manager), and custom Shopify integrations. Proven track record collaborating across remote international engineering teams to deliver robust software on time.
                        </p>
                      </div>

                      {/* Technical Skills */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Cpu size={16} className="text-accent" />
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                            Technical Skills
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="font-bold text-white block">Programming & Core:</span>
                            <span className="text-slate-400 leading-relaxed">JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, Data Structures</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="font-bold text-white block">Backend & APIs:</span>
                            <span className="text-slate-400 leading-relaxed">Node.js, Express.js, REST APIs, GraphQL Admin APIs, JWT, OAuth 2.0, Socket.io, Mongoose</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="font-bold text-white block">Databases & Cloud:</span>
                            <span className="text-slate-400 leading-relaxed">PostgreSQL, MongoDB (Aggregations), Firestore, Cloud SQL, Google Cloud Platform (App Engine, Secret Manager, Cloud Storage)</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <span className="font-bold text-white block">Frontend & Tools:</span>
                            <span className="text-slate-400 leading-relaxed">React.js, Vite, Tailwind CSS, Material UI, Redux Toolkit, Git, GitHub Actions, Vercel, Render</span>
                          </div>
                        </div>
                      </div>

                      {/* Experience */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Layers size={16} className="text-accent" />
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                            Work Experience
                          </h2>
                        </div>
                        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <h3 className="text-sm font-bold text-white">Full Stack Developer — Glacier Agency</h3>
                              <p className="text-xs text-text-dim">Toronto, Canada (Remote)</p>
                            </div>
                            <span className="text-xs text-accent font-mono bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                              May 2025 – Present
                            </span>
                          </div>
                          <ul className="list-disc list-outside ml-4 space-y-2 text-xs text-slate-300 leading-relaxed">
                            <li>Architected, developed, and deployed full-stack web applications using <strong className="text-white">Node.js, Express.js, React, TypeScript, and PostgreSQL</strong>.</li>
                            <li>Built scalable REST & GraphQL APIs, authentication flows, and merchant-facing features supporting live e-commerce production applications.</li>
                            <li>Engineered custom Shopify embedded applications with App Bridge, OAuth 2.0 session tokens, and recurring subscription billing workflows.</li>
                            <li>Set up and maintained Google Cloud Platform infrastructure including App Engine, Cloud SQL, Cloud Storage, and Secret Manager.</li>
                            <li>Implemented performant backend logic for dynamic pricing rules, product customization schemas, file uploads, and secure merchant settings.</li>
                            <li>Collaborated in multi-developer Git workflows including pull requests, code reviews, and production releases.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Featured Projects */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={16} className="text-accent" />
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                            Key Production Projects
                          </h2>
                        </div>
                        <div className="space-y-3.5 text-xs">
                          
                          {/* Project 1 */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className="font-bold text-white text-sm">1. Presia – Shopify Prescription Eyewear Platform</h4>
                              <span className="text-[11px] font-mono text-accent">Production Published App</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              Engineered a full-stack Shopify application enabling eyewear merchants to integrate complex prescription lens customization flows into live storefronts. Built custom pricing/tax engines, multi-step optical parameter collection, and Google Cloud Storage integration for doctor prescription uploads.
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              <strong className="text-white font-sans">Tech Stack:</strong> TypeScript, Node.js, Express.js, React, PostgreSQL on Cloud SQL, App Engine, GCS, Shopify App Bridge
                            </p>
                          </div>

                          {/* Project 2 */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className="font-bold text-white text-sm">2. Alira – Computer Vision Face Measurement App</h4>
                              <span className="text-[11px] font-mono text-accent">Live Shopify App</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              Developed a computer vision application that captures and measures facial landmark dimensions via webcam/photo upload to recommend personalized glasses frame sizes. Handled Firestore per-shop configurations and Shopify Billing GraphQL API for merchant tier quotas.
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              <strong className="text-white font-sans">Tech Stack:</strong> Node.js, Express, React, Vite, MediaPipe, Firestore, Shopify GraphQL Billing API
                            </p>
                          </div>

                          {/* Project 3 */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className="font-bold text-white text-sm">3. Electrica – Electrical Contractor Management Platform</h4>
                              <span className="text-[11px] font-mono text-accent">MERN Platform</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              Multi-role web platform for electrical contracting firms with role-based dashboards (Admin, Client, Contractor), milestone progress logs, material usage auditing, secure OTP authentication, and Socket.io real-time chat.
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              <strong className="text-white font-sans">Tech Stack:</strong> React, Node.js, Express, MongoDB, Mongoose, Tailwind CSS, Socket.io, Sessions, OTP
                            </p>
                          </div>

                          {/* Project 4 */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className="font-bold text-white text-sm">4. Cinema Seat Reservation & Ticketing Engine</h4>
                              <span className="text-[11px] font-mono text-accent">Concurrency Engine</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              Interactive cinema seat reservation system featuring real-time seat locks, anti-double-booking safeguards, and MongoDB aggregation pipelines that boosted query performance by 30%+.
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              <strong className="text-white font-sans">Tech Stack:</strong> React, Node.js, Express, MongoDB, REST APIs, Tailwind CSS
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Education & Certifications */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <GraduationCap size={16} className="text-accent" />
                            <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                              Education
                            </h2>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                            <p className="font-bold text-white">BS in Computer Science</p>
                            <p className="text-slate-300">University of Sindh Jamshoro, Sindh</p>
                            <p className="text-slate-400 font-mono">2020 – 2023 · CGPA: 3.1 / 4.0</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <CheckCircle2 size={16} className="text-accent" />
                            <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
                              Certifications & Languages
                            </h2>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1.5">
                            <p className="text-slate-300"><strong className="text-white">MERN Stack Certified:</strong> Hazza Institute (2023)</p>
                            <p className="text-slate-300"><strong className="text-white">IEEE ICT Exhibition:</strong> Univ. of Sindh (2022)</p>
                            <p className="text-slate-400 pt-1 border-t border-white/5 font-mono">
                              Languages: English (Professional), Urdu (Native)
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

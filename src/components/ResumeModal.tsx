import { useState, useRef, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Download, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Printer,
  FileDown
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "pdf" | "upload">("preview");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; dataUrl: string } | null>(() => {
    const saved = localStorage.getItem("user_custom_cv");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    // Focus close button on mount for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const fileInfo = {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        dataUrl,
      };
      setUploadedFile(fileInfo);
      localStorage.setItem("user_custom_cv", JSON.stringify(fileInfo));
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadDefaultResume = () => {
    if (uploadedFile) {
      const link = document.createElement("a");
      link.href = uploadedFile.dataUrl;
      link.download = uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Direct download of the uploaded full-stack resume PDF
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
              <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 pt-10 sm:pt-16 pb-8 sm:pb-14">
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
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl my-auto bg-[#0c0d14] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[82vh] sm:max-h-[88vh] overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-[#0c0d14] shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">Curriculum Vitae</h3>
                        <p className="text-xs text-text-dim">Abdul Samad · Full Stack Developer</p>
                      </div>
                    </div>

                    {/* Action Buttons & Close */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
                        <button
                          onClick={() => setActiveTab("preview")}
                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all ${
                            activeTab === "preview" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                          }`}
                        >
                          View CV
                        </button>
                        <button
                          onClick={() => setActiveTab("pdf")}
                          className={`hidden xs:inline-block px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all ${
                            activeTab === "pdf" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                          }`}
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => setActiveTab("upload")}
                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all ${
                            activeTab === "upload" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                          }`}
                        >
                          Upload
                        </button>
                      </div>

                      <button
                        onClick={downloadDefaultResume}
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:bg-accent hover:border-accent transition-all"
                        title="Download Resume PDF"
                      >
                        <Download size={14} />
                        <span>Download PDF</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-text-dim hover:text-white transition-all"
                        title="Print CV"
                      >
                        <Printer size={14} />
                      </button>

                      <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
                    {activeTab === "pdf" ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                              <FileDown size={20} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">Full Stack Developer Resume (PDF)</h4>
                              <p className="text-xs text-text-dim">Official resume format · 58 KB</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href="/Abdul-Samad-Resume.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5"
                            >
                              <ExternalLink size={13} />
                              Open in New Tab
                            </a>
                            <button
                              onClick={downloadDefaultResume}
                              className="px-3.5 py-1.5 rounded-xl bg-accent text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                            >
                              <Download size={13} />
                              Download
                            </button>
                          </div>
                        </div>

                        {/* PDF Object preview */}
                        <div className="w-full h-[500px] rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex flex-col items-center justify-center">
                          <iframe
                            src="/Abdul-Samad-Resume.pdf#toolbar=1"
                            title="Abdul Samad Resume PDF"
                            className="w-full h-full border-none rounded-2xl"
                          />
                        </div>
                      </div>
                    ) : activeTab === "upload" ? (
                      <div className="max-w-xl mx-auto py-6">
                        <div className="text-center mb-6">
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">Upload or Replace Resume</h4>
                          <p className="text-xs text-text-dim leading-relaxed">
                            Upload an updated PDF or DOCX file to keep a local copy handy for preview and download.
                          </p>
                        </div>

                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-white/15 hover:border-accent/50 bg-white/[0.02] hover:bg-accent/[0.02] rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <Upload size={22} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white mb-1">Click or drag & drop to upload CV</p>
                            <p className="text-xs text-text-dim font-mono">Supports PDF, DOCX, TXT (Max 10MB)</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.docx,.doc,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>

                        {uploadSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2"
                          >
                            <CheckCircle2 size={16} />
                            <span>CV uploaded successfully and stored in local cache!</span>
                          </motion.div>
                        )}

                        {uploadedFile && (
                          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText size={20} className="text-accent" />
                              <div>
                                <p className="text-sm font-medium text-white">{uploadedFile.name}</p>
                                <p className="text-xs text-text-dim">{uploadedFile.size}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={uploadedFile.dataUrl}
                                download={uploadedFile.name}
                                className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Download size={13} />
                                Download
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Interactive Document Preview */
                      <div id="printable-resume" className="bg-[#10111a] border border-white/10 rounded-2xl p-5 sm:p-9 text-slate-300 font-sans space-y-7 shadow-inner">
                        {/* CV Header */}
                        <div className="border-b border-white/10 pb-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Abdul Samad</h1>
                              <p className="text-xs sm:text-sm font-semibold text-accent mt-1">
                                Full Stack Developer · Node.js · PERN / MERN · TypeScript
                              </p>
                            </div>
                            <div className="text-xs text-slate-400 space-y-1 sm:text-right font-mono">
                              <p className="flex items-center sm:justify-end gap-1.5">
                                <MapPin size={12} className="text-accent" /> Karachi, Pakistan
                              </p>
                              <p className="flex items-center sm:justify-end gap-1.5">
                                <Phone size={12} className="text-accent" /> 0330-5786110
                              </p>
                              <p className="flex items-center sm:justify-end gap-1.5">
                                <Mail size={12} className="text-accent" /> samadpakhtoon09@gmail.com
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 mt-3 text-xs font-medium text-slate-400">
                            <a href="https://github.com/ABDLSamaD" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                              <Github size={13} className="text-accent" /> github.com/ABDLSamaD
                            </a>
                            <a href="https://linkedin.com/in/abdul-samad-421793309" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                              <Linkedin size={13} className="text-accent" /> linkedin.com/in/abdul-samad
                            </a>
                          </div>
                        </div>

                        {/* Summary */}
                        <div>
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2">
                            [ Professional Summary ]
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Full Stack Developer with professional experience building production web applications using 
                            <strong className="text-white"> Node.js, Express.js, React, TypeScript, PostgreSQL, MongoDB, and Google Cloud Platform</strong>. 
                            Experienced in designing REST APIs, authentication flows, database-backed dashboards, cloud deployments, and scalable backend modules for live e-commerce systems. 
                            Strong hands-on experience with PERN/MERN stack, Shopify integrations, OAuth, billing systems, secure sessions, and production debugging across multiple live merchant stores.
                          </p>
                        </div>

                        {/* Skills Section */}
                        <div>
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2.5">
                            [ Technical Skills ]
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Languages:</span>
                              <span className="text-slate-400">JavaScript (ES6+), TypeScript, Python, HTML5, CSS3</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Backend Engineering:</span>
                              <span className="text-slate-400">Node.js, Express.js, REST APIs, JWT Authentication, OAuth 2.0, Session Authentication, Socket.io, Mongoose</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Frontend Development:</span>
                              <span className="text-slate-400">React.js, Vite, Redux, Tailwind CSS, Material UI, Responsive UI, Component-Based Architecture</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Databases & Caching:</span>
                              <span className="text-slate-400">PostgreSQL, MongoDB, Firestore, Cloud SQL, Aggregation Pipelines, Query Optimization</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Cloud & DevOps:</span>
                              <span className="text-slate-400">Google Cloud Platform (GCP), App Engine, Cloud Run, Cloud SQL, Cloud Storage, Secret Manager, GitHub Actions, Vercel, Render, Netlify</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              <span className="font-semibold text-white block mb-1">Shopify Engineering:</span>
                              <span className="text-slate-400">GraphQL Admin API, Storefront API, Billing API, App Bridge, OAuth 2.0, Theme App Extensions, Embedded Apps</span>
                            </div>
                          </div>
                        </div>

                        {/* Experience */}
                        <div>
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2.5">
                            [ Professional Experience ]
                          </h2>
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                <h3 className="text-sm font-bold text-white">Full Stack Developer — Glacier Agency</h3>
                                <span className="text-xs text-accent font-mono">May 2025 – Present · Toronto, Canada (Remote)</span>
                              </div>
                              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-slate-300">
                                <li>Designed, developed, and shipped production-grade full-stack applications using <span className="text-white font-medium">Node.js, Express.js, React, TypeScript, and PostgreSQL</span> for e-commerce clients.</li>
                                <li>Built scalable REST APIs, authentication flows, database modules, and merchant-facing features across multiple live production applications.</li>
                                <li>Developed custom Shopify integrations for 3+ live merchant stores, handling product data flows, storefront behavior, session token authentication, and deployment.</li>
                                <li>Set up and maintained Google Cloud Platform infrastructure including App Engine, Cloud SQL, Cloud Storage, and Secret Manager for production applications.</li>
                                <li>Implemented backend logic for file uploads, pricing rules, billing workflows, product customization, and secure merchant settings.</li>
                                <li>Collaborated in a multi-developer codebase using Git branching, pull requests, code reviews, and production deployment workflows.</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Featured Projects */}
                        <div>
                          <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2.5">
                            [ Key Production Projects ]
                          </h2>
                          <div className="space-y-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                              <h4 className="font-bold text-white text-sm mb-1">Presia – Shopify Prescription Eyewear App</h4>
                              <p className="text-slate-400 mb-1.5">
                                Published production Shopify app enabling merchants to add prescription eyewear & contact lens customization flows to live storefronts. Built with PERN stack, TypeScript, PostgreSQL on Cloud SQL, App Engine, Shopify OAuth 2.0, App Bridge, and custom pricing/tax calculation engine.
                              </p>
                              <span className="text-[11px] font-mono text-accent">Tech: TypeScript, Node.js, Express, React, PostgreSQL, Cloud SQL, App Engine, GCS, Shopify API</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                              <h4 className="font-bold text-white text-sm mb-1">Alira – Shopify Face Measurement App</h4>
                              <p className="text-slate-400 mb-1.5">
                                Live Shopify application measuring customer face dimensions via camera/photo upload for tailored eyewear sizing. Integrated Firestore per-shop widget configurations, Shopify Billing GraphQL API for quota tracking, and cart line-item property synchronization.
                              </p>
                              <span className="text-[11px] font-mono text-accent">Tech: Node.js, Express, React, Vite, Python, MediaPipe, Firestore, Shopify Billing GraphQL API</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                              <h4 className="font-bold text-white text-sm mb-1">Electrica – Electrical Contractor Web App</h4>
                              <p className="text-slate-400 mb-1.5">
                                Multi-user MERN platform for electrical contractors with role-based dashboards (Admin, Client, Contractor), milestone progress logs, material usage tracking, secure OTP authentication, and Socket.io real-time chat.
                              </p>
                              <span className="text-[11px] font-mono text-accent">Tech: React, Node.js, Express, MongoDB, Mongoose, Tailwind CSS, Socket.io, Sessions, OTP</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                              <h4 className="font-bold text-white text-sm mb-1">Cinema Ticket System</h4>
                              <p className="text-slate-400 mb-1.5">
                                Responsive seat booking system with real-time seat selection, booking validation, double-booking prevention, and MongoDB aggregation pipelines improving query response time by 30%+.
                              </p>
                              <span className="text-[11px] font-mono text-accent">Tech: React, Node.js, Express, MongoDB, REST APIs, Material UI, Tailwind CSS</span>
                            </div>
                          </div>
                        </div>

                        {/* Education & Certifications */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2">
                              [ Education ]
                            </h2>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                              <p className="font-bold text-white">BS Computer Science</p>
                              <p className="text-slate-400">University of Sindh Jamshoro, Sindh</p>
                              <p className="text-slate-500 font-mono mt-1">2020 – 2023 · CGPA: 3.1 / 4.0</p>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xs font-bold font-mono tracking-widest text-accent uppercase mb-2">
                              [ Certificates & Languages ]
                            </h2>
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1.5">
                              <p className="text-slate-300"><strong className="text-white">MERN Stack Course:</strong> Hazza Institute of Tech (2023)</p>
                              <p className="text-slate-300"><strong className="text-white">ICT & IEEE Exhibition:</strong> Univ. of Sindh (2022)</p>
                              <p className="text-slate-400 pt-1 border-t border-white/5 font-mono">
                                Languages: English (Professional), Urdu (Native)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Footer Actions */}
                  <div className="sm:hidden px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#0c0d14] flex gap-3 shrink-0">
                    <button
                      onClick={downloadDefaultResume}
                      className="flex-1 py-2.5 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Download size={14} />
                      Download CV (PDF)
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold"
                    >
                      Close
                    </button>
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

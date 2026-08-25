import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Filter, X, ChevronRight, Layers, Sparkles, Server, CheckCircle2, ShoppingBag, Download, Laptop, HardDrive, Clock } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  version?: string;
  image?: string;
  imageAlt?: string;
  purpose: string;
  applicability: string;
  desc: string;
  longDesc: string;
  tech: string[];
  features: string[];
  link?: string | null;
  github?: string | null;
  isProduction?: boolean;
  downloadUrl?: string | null;
  downloadSize?: string;
  distributionType?: string;
  downloadStatus?: "in_progress" | "available" | "pending";
  downloadPendingNotice?: string;
}

const forgeDownloadUrl = import.meta.env.VITE_FORGE_DOWNLOAD_URL || "";

const initialProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Presia",
    subtitle: "Shopify Prescription Eyewear App",
    category: "Shopify",
    badge: "Live on Shopify Store",
    image: "/api/images/presia.png",
    imageAlt: "Presia - Shopify Prescription Eyewear App embedded admin and storefront builder interface",
    purpose: "Enables optical and eyewear merchants to seamlessly integrate complex prescription lenses, optical parameters (sphere, cylinder, axis, PD), and contact lens selection flows into their live Shopify storefronts.",
    applicability: "Commercial eyewear brands, optical retail merchants, and prescription lab suppliers wanting an automated, zero-friction storefront prescription builder with real-time price recalculation.",
    desc: "Built and published a production Shopify application using PERN stack and TypeScript, deployed on Google App Engine with Cloud SQL and Google Cloud Storage.",
    longDesc: "Presia resolves the challenging problem of collecting medical prescription parameters within Shopify's default product schema. I engineered an embedded admin experience using Shopify App Bridge and OAuth 2.0 with session token authentication.\n\nThe backend features a custom pricing engine capable of handling complex lens tier calculations, progressive/bifocal add-ons, auto-discounts, and multi-currency overrides. High-resolution prescription image uploads are securely streamed to Google Cloud Storage with strict access validation.",
    tech: ["TypeScript", "Node.js", "Express.js", "React", "PostgreSQL", "Google App Engine", "Cloud SQL", "GCS", "Shopify API", "OAuth 2.0"],
    features: [
      "Published and maintained production Shopify application serving live merchant stores",
      "Shopify OAuth 2.0, App Bridge, and session token authentication",
      "Dynamic pricing engine for tax, currency conversion, auto-discounts, and optical add-ons",
      "Secure prescription file upload pipeline integrated with Google Cloud Storage",
      "Embedded merchant dashboard for custom lens catalogs and rule management"
    ],
    link: null,
    github: null,
    isProduction: true
  },
  {
    id: 2,
    title: "Forge",
    subtitle: "Electron Desktop Workspace & Task Engine",
    category: "Desktop App",
    badge: "Desktop Software (v3.0.2)",
    version: "3.0.2",
    image: "/api/images/forge-image.png",
    imageAlt: "Forge - Modern Electron Desktop Workspace, Project Management, and Task Engine",
    purpose: "Provide a simple, stable, and polished desktop productivity app that helps users stay organized, work efficiently, and manage their workflow with a smooth branded experience.",
    applicability: "Developers, technical leads, designers, and workflow managers needing a fast, distraction-free desktop application with offline data sovereignty and zero-cloud dependence.",
    desc: "A modern Electron-based desktop workspace engineered for project, task, schedule, and activity management with instant feedback and file-based JSON storage.",
    longDesc: "Forge is a modern Electron-based desktop workspace designed to help users manage projects, tasks, schedules, activity, and settings in one place. It focuses on fast interaction, instant save feedback, and reliable local data storage.\n\nThe app uses file-based JSON storage to keep data persistent and easy to back up, while also supporting Windows installer and portable builds for simple distribution.\n\nArchitected with a decoupled Electron IPC bridge, multi-window support, background autosave debounce pipelines, and offline-first data integrity.",
    tech: ["Electron", "React", "TypeScript", "Tailwind CSS", "Node.js", "JSON Storage", "Vite", "Electron Builder", "IPC", "NSIS"],
    features: [
      "Unified desktop dashboard managing projects, tasks, schedules, activity logs, and preferences",
      "Robust file-based JSON local storage architecture for data privacy and effortless backups",
      "Instant save feedback engine with optimistic UI updates and zero cloud latency",
      "Custom frameless desktop window with integrated titlebar controls and snappy navigation",
      "Automated build pipeline producing Windows NSIS Installer (.exe) and standalone Portable executables"
    ],
    link: null,
    github: "https://github.com/ABDLSamaD",
    isProduction: true,
    downloadStatus: forgeDownloadUrl.trim() !== "" ? "available" : "in_progress",
    downloadPendingNotice: "Windows installer build (v3.0.2) is in progress and will be available shortly.",
    downloadUrl: forgeDownloadUrl.trim() !== "" ? forgeDownloadUrl : null,
    downloadSize: "74.8 MB (Windows x64 / Portable)",
    distributionType: "Windows Installer (.exe) & Portable Executable"
  },
  {
    id: 3,
    title: "Alira",
    subtitle: "Shopify Face Measurement App",
    category: "Shopify",
    badge: "Live Production App",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800&h=500",
    imageAlt: "Alira - AI Facial Dimension Sizing and Optical Measurement App for Shopify Storefronts",
    purpose: "AI-assisted eyewear sizing application where customers measure exact facial dimensions via camera or photo upload for customized frame size recommendations.",
    applicability: "Online eyewear e-commerce stores wanting to reduce costly return rates and give customers confidence in frame sizing before purchasing.",
    desc: "Contributed to a live Shopify app utilizing Node.js, Express, React, Vite, Python, MediaPipe, Firestore, and Shopify Billing GraphQL APIs.",
    longDesc: "Alira provides real-time optical sizing directly on merchant storefronts. I developed backend and merchant admin features that store per-shop widget configurations in Firestore.\n\nI integrated the Shopify Billing GraphQL API to handle merchant subscription tiers and usage quotas, and engineered the cart line-item property pipeline so computed facial measurements flow seamlessly into Shopify order fulfillment.",
    tech: ["Node.js", "Express.js", "React", "Vite", "Python", "MediaPipe", "Firestore", "Shopify API", "Billing GraphQL API"],
    features: [
      "Per-shop widget configurations and styling controls stored in Firestore",
      "Shopify Billing GraphQL API integration with subscription plan and quota tracking",
      "Face dimension measurement data synced into cart line-item properties for order fulfillment",
      "Responsive merchant configuration admin dashboard built with React and Vite"
    ],
    link: null,
    github: null,
    isProduction: true
  },
  {
    id: 4,
    title: "Electrica",
    subtitle: "Electrical Contractor Web App",
    category: "Full Stack",
    badge: "Enterprise Web App",
    image: "/api/images/electrica.png",
    imageAlt: "Electrica - Electrical Contractor Management Platform Dashboard with Real-Time Communication",
    purpose: "Multi-user contractor management platform that streamlines project phases, contracts, complaints, daily progress logging, and real-time team communication.",
    applicability: "Commercial and residential electrical contractors, field technicians, project managers, and clients requiring structured project tracking and instant messaging.",
    desc: "Engineered a secure multi-user MERN platform with role-based dashboards, OTP login, HttpOnly cookie security, and Socket.io real-time chat.",
    longDesc: "Electrica coordinates the complete lifecycle of electrical contracts. It features distinct role-based access controls for Admins, Contractors, and Clients.\n\nIncludes timeline views, material usage reports, milestone approval workflows, and instant complaint logging backed by Socket.io WebSocket channels for sub-50ms message latency. Secure authentication is enforced via OTP verification and HttpOnly/SameSite session cookies.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "Socket.io", "REST APIs", "Sessions", "OTP"],
    features: [
      "Role-based dashboards with granular permission levels for Admins, Contractors, and Clients",
      "Project tracking modules with daily progress logs, material usage, and milestone approvals",
      "Real-time chat and incident ticket management via Socket.io",
      "Secure authentication with OTP login, HttpOnly cookies, and SameSite protection"
    ],
    link: "https://electricaapp.vercel.app",
    github: "https://github.com/ABDLSamaD",
    isProduction: false
  },
  {
    id: 5,
    title: "Cinema Ticket System",
    subtitle: "Real-Time Seat Booking Engine",
    category: "Backend / API",
    badge: "Booking Engine",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800&h=500",
    imageAlt: "Cinema Ticket System - High-Concurrency Real-Time Seat Reservation Engine and Seat Selection Map",
    purpose: "High-concurrency seat reservation and ticketing engine with live seat selection, booking validation, and double-booking collision prevention.",
    applicability: "Cinemas, theatres, and event organizers requiring fast, reliable seat maps and high-throughput booking under heavy release-day traffic.",
    desc: "Built with React, Node.js, Express, and MongoDB. Leveraged MongoDB aggregation pipelines and indexing to improve response time by 30%+ under heavy load.",
    longDesc: "Designed to eliminate race conditions and double bookings during high-demand movie releases. Features RESTful APIs and MongoDB models for movies, showtimes, dynamic pricing, and real-time seat matrices.\n\nUsing optimized MongoDB aggregation pipelines and compound indexes, backend queries achieved over 30% latency reduction under concurrent load tests.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Material UI", "Tailwind CSS", "Git"],
    features: [
      "Interactive real-time seat selection grid with live status locks",
      "Optimized MongoDB aggregation pipelines boosting query response time by 30%+",
      "Automated booking validation and digital ticket generation",
      "Admin portal for movie showtimes, pricing tiers, and auditorium management"
    ],
    link: null,
    github: "https://github.com/ABDLSamaD",
    isProduction: false
  },
  {
    id: 6,
    title: "MERN Developer Portfolio",
    subtitle: "High-Performance Portfolio & CV Hub",
    category: "Full Stack",
    badge: "Portfolio Showcase",
    image: "/api/images/abdfolio.png",
    imageAlt: "MERN Developer Portfolio - High-Performance Interactive CV Hub and Technical Architecture Breakdown",
    purpose: "Responsive developer showcase featuring production project breakdowns, technical competencies, live application links, and an interactive CV management system.",
    applicability: "Modern engineering showcase highlighting real-world production systems and verified technical credentials.",
    desc: "Built with React, TypeScript, Express, and Tailwind CSS. Features clean visual hierarchy, smooth transitions, and integrated CV download and upload utilities.",
    longDesc: "A bespoke engineering portfolio showcasing production work across Shopify apps, PERN/MERN architectures, and GCP deployments. Built with responsive mobile and desktop viewports, clean typography, and fast performance.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Motion"],
    features: [
      "Interactive CV viewer, printer, and custom CV uploader with local persistence",
      "Responsive project architecture viewer with structured challenge/solution breakdowns",
      "Express API contact form integration with PostgreSQL storage support",
      "Optimized lightweight layout with 95+ performance metrics"
    ],
    link: "https://abdfolio.vercel.app/",
    github: "https://github.com/ABDLSamaD",
    isProduction: true
  },
];

interface ProjectsProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

export default function Projects({ onModalStateChange }: ProjectsProps) {
  const [projectList, setProjectList] = useState<ProjectItem[]>(initialProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Auto-detect Forge download availability dynamically from backend environment
  useEffect(() => {
    let isMounted = true;
    const fetchForgeStatus = async () => {
      try {
        const res = await fetch("/api/forge/status");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data) {
          setProjectList((prev) =>
            prev.map((p) => {
              if (p.id === 2 || p.title.toLowerCase() === "forge") {
                const isAvailable = Boolean(data.available || forgeDownloadUrl.trim() !== "");
                return {
                  ...p,
                  downloadStatus: isAvailable ? "available" : "in_progress",
                  downloadUrl: isAvailable
                    ? (data.downloadUrl || forgeDownloadUrl || "/api/forge/download")
                    : null,
                  downloadPendingNotice: isAvailable
                    ? undefined
                    : (data.releaseNotes || "Windows installer build (v3.0.2) is in progress and will be available shortly."),
                  downloadSize: data.size || p.downloadSize || "74.8 MB (Windows x64 / Portable)",
                  distributionType: data.distributionType || p.distributionType || "Windows Installer (.exe) & Portable Executable",
                };
              }
              return p;
            })
          );
        }
      } catch (err) {
        // Fallback gracefully to default state
      }
    };

    fetchForgeStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedProject = useMemo(() => {
    if (selectedProjectId === null) return null;
    return projectList.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId, projectList]);

  const setSelectedProject = (proj: ProjectItem | null) => {
    setSelectedProjectId(proj ? proj.id : null);
  };

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      onModalStateChange?.(true);
    } else {
      document.body.style.overflow = "unset";
      onModalStateChange?.(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      onModalStateChange?.(false);
    };
  }, [selectedProject, onModalStateChange]);

  // Escape key handler for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const categories = ["All", "Shopify", "Desktop App", "Full Stack", "Backend / API"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectList;
    return projectList.filter(p => p.category === activeFilter || p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));
  }, [activeFilter, projectList]);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
              [ 04 ] Production & Engineering Work
            </h2>
            <h3 id="projects-heading" className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Featured Projects
            </h3>
          </div>
          <p className="max-w-md text-slate-400 text-sm leading-relaxed">
            Real-world production applications, desktop suites, Shopify apps with live merchant stores, 
            and scalable PERN/MERN systems built with TypeScript and GCP.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-accent mr-3">
            <Filter size={14} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Filter:</span>
          </div>
          <div role="tablist" aria-label="Project categories" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                tabIndex={0}
                onClick={() => handleFilterChange(cat)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleFilterChange(cat);
                  }
                }}
                className={`relative text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent ${
                  activeFilter === cat
                    ? "bg-accent text-white shadow-[0_0_15px_rgba(61,90,254,0.4)]"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`View architectural details for ${project.title}: ${project.subtitle}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="group glass p-6 sm:p-7 rounded-3xl border-white/10 hover:border-accent/40 hover:bg-white/[0.04] focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(61,90,254,0.15)]"
                >
                  {/* Top Badge & Index */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
                        {project.category === "Desktop App" && <Laptop size={12} className="text-accent" />}
                        0{index + 1} // {project.category}
                      </span>
                      {project.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-mono font-medium text-accent">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mb-4">
                      {project.subtitle}
                    </p>

                    {/* Project Visual Preview */}
                    {project.image && (
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-white/[0.02] border border-white/5 group-hover:border-accent/30 transition-all duration-300">
                        <img
                          src={project.image}
                          alt={project.imageAlt || `${project.title} - ${project.subtitle}`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (project.image && project.image.startsWith("/api/images/")) {
                              const filename = project.image.replace("/api/images/", "");
                              target.src = `/images/${filename}`;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14]/70 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Purpose Summary Box */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 mb-5 group-hover:border-accent/20 transition-colors">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                        <Sparkles size={11} /> Purpose & Applicability
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {project.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Tech Badges & Details Link */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] text-[10px] font-mono text-text-dim">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent"
                            title="GitHub Repository"
                            aria-label={`${project.title} GitHub Repository`}
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.downloadStatus === "in_progress" && !project.downloadUrl ? (
                          <span
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center gap-1.5"
                            title="Download link is pending and will be available shortly"
                          >
                            <Clock size={11} className="text-amber-400" />
                            <span>In Progress</span>
                          </span>
                        ) : project.downloadUrl ? (
                          <a
                            href={project.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent hover:text-white hover:bg-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent"
                            title="Download Desktop Software (.exe)"
                            aria-label={`${project.title} Download Installer`}
                          >
                            <Download size={14} />
                          </a>
                        ) : project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent"
                            title="Live Demo"
                            aria-label={`${project.title} Live Demo`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        ) : null}
                      </div>

                      <button 
                        tabIndex={-1} 
                        className="text-xs font-bold text-accent group-hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Architecture</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      {/* Project Detail Modal - Viewport-Safe on Mobile & Desktop Rendered at Body Level */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div 
                className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-6 md:p-8 pt-10 sm:pt-16 pb-8 sm:pb-14"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSelectedProject(null);
                }}
              >
                {/* Backdrop click dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="fixed inset-0"
                  aria-hidden="true"
                />

                {/* Modal Box */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl my-auto bg-[#0c0d14] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[82vh] sm:max-h-[85vh] overflow-hidden focus:outline-none"
                  tabIndex={-1}
                >
                  {/* Sticky Top Header with Close Button */}
                  <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-[#0c0d14] shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                        {selectedProject.category === "Desktop App" ? <Laptop size={18} /> : <Layers size={18} />}
                      </div>
                      <div>
                        <h3 id="project-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">{selectedProject.title}</h3>
                        <p className="text-[11px] sm:text-xs font-mono text-text-dim">{selectedProject.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {selectedProject.badge && (
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-mono font-medium text-accent">
                          {selectedProject.badge}
                        </span>
                      )}
                      <button
                        autoFocus
                        onClick={() => setSelectedProject(null)}
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label="Close modal (Escape)"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content Body */}
                  <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-slate-300 text-xs sm:text-sm">
                    {/* Project Preview Image */}
                    {selectedProject.image && (
                      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-white/[0.02]">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.imageAlt || `${selectedProject.title} - ${selectedProject.subtitle}`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (selectedProject.image && selectedProject.image.startsWith("/api/images/")) {
                              const filename = selectedProject.image.replace("/api/images/", "");
                              target.src = `/images/${filename}`;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14]/70 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Download & Distribution Pill (if Desktop App) */}
                    {selectedProject.downloadSize && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <HardDrive size={16} className="text-accent shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-bold text-xs">Binary Distribution Package</p>
                              {selectedProject.version && (
                                <span className="px-2 py-0.5 rounded-md bg-accent/20 border border-accent/40 text-[10px] font-mono font-bold text-accent">
                                  v{selectedProject.version}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-300 font-mono">{selectedProject.distributionType || "Windows Installer & Portable"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                            {selectedProject.downloadSize}
                          </span>
                          {selectedProject.downloadStatus === "in_progress" && !selectedProject.downloadUrl && (
                            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Clock size={11} className="text-amber-400" />
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pending Download Notice Banner */}
                    {selectedProject.downloadStatus === "in_progress" && !selectedProject.downloadUrl && (
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                        <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <h6 className="text-xs font-bold text-amber-300">Download Link In Progress (v3.0.2)</h6>
                          <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                            {selectedProject.downloadPendingNotice || "The Windows installer package (~110 MB) is currently pending cloud deployment and will be available for direct download shortly."}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 1. Purpose & Real-World Applicability */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent mb-2 flex items-center gap-1.5">
                          <Sparkles size={12} /> Core Purpose
                        </h5>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {selectedProject.purpose}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent mb-2 flex items-center gap-1.5">
                          <ShoppingBag size={12} /> Target Use Case
                        </h5>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {selectedProject.applicability}
                        </p>
                      </div>
                    </div>

                    {/* 2. Technical Architecture & Challenge Breakdown */}
                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent mb-2.5 flex items-center gap-1.5">
                        <Server size={12} /> Architecture & Engineering Implementation
                      </h5>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                          {selectedProject.longDesc}
                        </p>
                      </div>
                    </div>

                    {/* 3. Key Achievements / Features */}
                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent mb-2.5">
                        [ Key Production Highlights ]
                      </h5>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <ul className="space-y-2.5">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 4. Complete Technology Stack */}
                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent mb-2.5">
                        [ Technology Stack & Services ]
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer with Direct Actions */}
                  <div className="sticky bottom-0 z-20 px-5 sm:px-7 py-3.5 sm:py-4 border-t border-white/10 bg-[#0c0d14] flex items-center justify-between gap-3 shrink-0">
                    <div className="text-xs text-text-dim font-mono">
                      Status: <span className="text-accent font-semibold">{selectedProject.isProduction ? "Production Release" : "Functional Application"}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}

                      {selectedProject.downloadStatus === "in_progress" && !selectedProject.downloadUrl ? (
                        <div 
                          className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold flex items-center gap-2 cursor-default shadow-sm"
                          title="Download link is in progress and will be available shortly"
                        >
                          <Clock size={13} className="text-amber-400" />
                          <span>Download: In Progress (v3.0.2)</span>
                        </div>
                      ) : selectedProject.downloadUrl ? (
                        <a
                          href={selectedProject.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(61,90,254,0.3)] transition-all focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <Download size={14} />
                          <span>Download .exe ({selectedProject.downloadSize ? "74.8 MB" : "Build"})</span>
                        </a>
                      ) : selectedProject.link ? (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(61,90,254,0.3)] transition-all focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <ExternalLink size={14} />
                          <span>Launch App</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

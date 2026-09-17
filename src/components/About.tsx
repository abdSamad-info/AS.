import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Server, Database, Briefcase, GraduationCap, ChevronRight, MapPin } from "lucide-react";

interface AboutProps {
  onOpenResume?: () => void;
}

interface ProfileConfig {
  experienceYears?: string;
  startDate?: string;
  currentRole?: string;
  currentCompany?: string;
  location?: string;
  period?: string;
  experienceBullets?: string[];
  education?: {
    degree: string;
    period: string;
    institution: string;
    grade: string;
  };
}

export default function About({ onOpenResume }: AboutProps) {
  // Dynamically calculate exact years of production experience counted from May 2025
  const startCareerDate = new Date(2025, 4, 1); // May 2025
  const now = new Date();
  const diffInMonths = (now.getFullYear() - startCareerDate.getFullYear()) * 12 + (now.getMonth() - startCareerDate.getMonth());
  // Counted from May 2025, guaranteed 1.5+ as requested
  const dynamicYears = Math.max(1.5, Number((diffInMonths / 12).toFixed(1)));

  // Profile configuration state (syncable from Admin Dashboard)
  const [profile, setProfile] = useState<ProfileConfig>({
    experienceYears: `${dynamicYears}+`,
    currentRole: "Full Stack Developer",
    currentCompany: "Glacier Agency",
    location: "Toronto, Canada (Remote)",
    period: "May 2025 – Present",
    experienceBullets: [
      "Daily engineering, latency profiling, and throughput optimization for production REST & GraphQL APIs, reducing server overhead and managing concurrency spikes.",
      "Active production development of Shopify custom apps, App Bridge interfaces, complex pricing calculation engines, and automated webhook pipelines at Glacier Agency.",
      "Database query indexing and connection pool tuning across PostgreSQL & MongoDB, ensuring fast queries and zero-downtime reliability under heavy I/O."
    ],
    education: {
      degree: "BS in Computer Science",
      period: "2020 – 2023",
      institution: "University of Sindh, Jamshoro",
      grade: "CGPA: 3.1 / 4.0"
    }
  });

  // Load custom profile configuration if customized via Admin Dashboard or API
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/profile-config");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProfile((prev) => ({
              ...prev,
              ...data,
              experienceYears: data.experienceYears || `${dynamicYears}+`,
              education: {
                ...prev.education,
                ...(data.education || {})
              }
            }));
          }
        }
      } catch {
        try {
          const local = localStorage.getItem("portfolio_profile_config");
          if (local) {
            setProfile(JSON.parse(local));
          }
        } catch {}
      }
    };
    fetchConfig();
  }, [dynamicYears]);

  // Backend Cached API Endpoint with retry & re-query capability
  const [imgSrc, setImgSrc] = useState<string>("/api/images/profile");
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageError = useCallback(() => {
    if (retryCount < 3) {
      const nextAttempt = retryCount + 1;
      setRetryCount(nextAttempt);
      setTimeout(() => {
        setImgSrc(`/api/images/profile?retry=${nextAttempt}&t=${Date.now()}`);
      }, nextAttempt * 400);
    } else {
      setImgSrc("/images/profiles.jpg");
    }
  }, [retryCount]);

  const displayYears = profile.experienceYears || `${dynamicYears}+`;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Visual Profile Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Image Frame */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-transparent md:glass border border-white/10 p-2 sm:p-3 shadow-2xl relative">
                <img 
                  src={imgSrc}
                  alt="Abdul Samad" 
                  className={`w-full h-full object-cover rounded-2xl brightness-100 contrast-100 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onLoad={() => setIsLoaded(true)}
                  onError={handleImageError}
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-[#0a0b12]/90 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm tracking-tight">Abdul Samad</p>
                      <p className="text-[11px] text-accent font-mono font-medium">{profile.currentRole || "Full Stack Developer"}</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  </div>
                </div>
              </div>

              {/* Background Accent Decors */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-indigo-600/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="glass p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-white block">{displayYears}</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim">Years Exp</span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-accent block">3+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim">Shopify Stores</span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-white block">PERN</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim">Core Stack</span>
              </div>
            </div>
          </motion.div>

          {/* Narrative & Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <span className="meta-label mb-3 block text-accent font-mono text-xs uppercase tracking-widest">[ 01 ] Professional Profile</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter text-white">
              Engineering Scalable Systems <br />
              <span className="text-accent">With Backend Precision.</span>
            </h3>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm font-normal mb-8">
              <p>
                I am a <strong className="text-white">Full Stack Developer</strong> with <strong className="text-accent">{displayYears} years</strong> of active production experience engineering high-performance web applications and merchant backends. On a daily basis, my core responsibilities focus on <strong className="text-white">engineering performant REST & GraphQL APIs, profiling execution latency, cutting server load, and handling concurrent throughput spikes</strong>.
              </p>
              <p>
                At work, at the <span className="text-white font-medium">{profile.currentCompany || "Glacier Agency"} ({profile.location || "Toronto, Canada (Remote)"})</span>, I regularly develop and maintain production-critical systems — including Shopify embedded applications (App Bridge & GraphQL Admin APIs), custom optical pricing calculation engines, Google Cloud Storage secure file pipelines, and automated webhook lifecycle handlers.
              </p>
              <p>
                As a developer, I constantly work on active performance gains: fine-tuning database indexing, reducing memory footprint, implementing airtight session authentication (OAuth 2.0, JWT, HttpOnly cookies), and production workloads with automated health monitoring.
              </p>
            </div>

            {/* Concise Work & Education Info (Clean, No Bullets) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {/* Current Workplace */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Briefcase size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Current Workplace</p>
                  <p className="text-sm font-bold text-white truncate">
                    {profile.currentCompany || "Glacier Agency"}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                    <MapPin size={11} className="text-slate-400 shrink-0" />
                    <span className="truncate">{profile.location || "Toronto, Canada (Remote)"}</span>
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Education</p>
                    <p className="text-sm font-bold text-white truncate">
                      {profile.education?.degree || "BS in Computer Science"}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                      {profile.education?.institution || "University of Sindh, Jamshoro"}
                    </p>
                  </div>
                </div>

                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-accent hover:text-white border border-white/10 hover:border-accent text-slate-300 text-[11px] font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1"
                    title="View Full CV"
                  >
                    <span>CV</span>
                    <ChevronRight size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Core Architectural Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Server size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">API &amp; System Design</h4>
                  <p className="text-xs text-text-dim leading-relaxed">
                    Specialized in REST APIs, GraphQL Admin APIs, WebSocket concurrency, and secure OAuth flows.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Databases &amp; Cloud</h4>
                  <p className="text-xs text-text-dim leading-relaxed">
                    PostgreSQL on Cloud SQL, MongoDB aggregation pipelines, Firestore, and GCP serverless hosting.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

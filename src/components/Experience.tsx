import { motion } from "motion/react";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";

interface ExperienceProps {
  onOpenResume?: () => void;
}

export default function Experience({ onOpenResume }: ExperienceProps) {
  const experienceResponsibilities = [
    "Daily engineering, performance profiling, and latency optimization for production REST & GraphQL APIs, minimizing server load and handling high-concurrency traffic.",
    "Active development and maintenance of custom Shopify applications, App Bridge embedded dashboards, optical pricing calculation engines, and automated webhook lifecycle pipelines.",
    "Optimized database query indexing and connection pooling across PostgreSQL and MongoDB, guaranteeing high-performance data retrieval and zero-downtime reliability.",
    "Architected secure session authentication flows (OAuth 2.0, JWT, HttpOnly cookies) and deployed cloud container services on Google Cloud Platform.",
    "Collaborated in multi-developer Git workflows including pull requests, code reviews, and production releases."
  ];

  const coreStack = [
    "Node.js",
    "Express.js",
    "TypeScript",
    "GraphQL Admin APIs",
    "Shopify App Bridge",
    "PostgreSQL",
    "MongoDB",
    "Google Cloud Platform",
    "OAuth 2.0 & JWT"
  ];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20 sm:py-24 relative overflow-hidden">
      {/* Ambient background glow (optimized for low-RAM mobile) */}
      <div className="hidden sm:block absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10 will-change-transform" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12"
        >
          <div>
            <span className="meta-label mb-3 block text-accent font-mono text-xs uppercase tracking-widest">
              [ 02 ] Work Experience
            </span>
            <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Production Experience
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
            Active production engineering track record focused on scalable APIs, Shopify merchant platforms, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Main Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Glacier Agency Role Card (CV Content) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-8 bg-[#0b0c13] border border-white/10 hover:border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-colors relative group shadow-xl"
          >
            {/* Top Bar with Role & Status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>ACTIVE PRODUCTION ROLE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
                  <span>Software Engineer</span>
                  <span className="text-accent font-normal">—</span>
                  <span className="text-slate-200">Glacier Agency</span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-accent shrink-0" />
                    Toronto, Canada (Remote)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-accent shrink-0" />
                    May 2025 – Present
                  </span>
                </div>
              </div>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 active:scale-95"
                  title="View full resume in modal"
                >
                  <FileText size={14} className="text-accent" />
                  <span>View CV</span>
                </button>
              )}
            </div>

            {/* Exact CV Bullets */}
            <div className="py-6 space-y-3.5">
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <Briefcase size={14} className="text-accent" />
                <span>Core Engineering Responsibilities & Impact</span>
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {experienceResponsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Tech Stack Chips */}
            <div className="pt-5 border-t border-white/10">
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-3">
                Production Tech Stack:
              </p>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education & Academic Profile Side Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Education Box */}
            <div className="bg-[#0b0c13] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Education</span>
                  <h4 className="text-base font-bold text-white">BS in Computer Science</h4>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <p className="font-semibold text-white">University of Sindh</p>
                <p className="text-slate-400">Jamshoro, Sindh, Pakistan</p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-accent">
                  <span>2020 – 2023</span>
                  <span>CGPA: 3.1 / 4.0</span>
                </div>
              </div>
            </div>

            {/* Certifications & Recognition Box */}
            <div className="bg-[#0b0c13] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Credentials</span>
                    <h4 className="text-base font-bold text-white">Certifications & Honors</h4>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="font-bold text-white block">MERN Stack Certified</span>
                    <span className="text-slate-400 block font-mono text-[11px]">Hazza Institute of Technology · 2023</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="font-bold text-white block">Writing Machine Exhibition</span>
                    <span className="text-slate-400 block font-mono text-[11px]">University of Sindh · 2022</span>
                  </div>
                </div>
              </div>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="w-full mt-4 py-2.5 px-4 rounded-xl bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText size={14} />
                  <span>Open Full Interactive Resume</span>
                </button>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

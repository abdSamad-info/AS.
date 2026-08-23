import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Award, GraduationCap, ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Experience() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-3 font-mono">
            [ 03 ] Professional Track
          </h2>
          <h3 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Experience &amp; Journey
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 text-sm mt-3.5 leading-relaxed">
            Delivering production-level backend architecture, cloud systems, and live Shopify integrations 
            for commercial and global clients.
          </p>
        </motion.div>

        {isLoading ? (
          <div aria-busy="true" aria-label="Loading professional track and experience..." className="relative pl-7 sm:pl-12 space-y-12 animate-pulse">
            {/* Skeleton Vertical Spine */}
            <div className="absolute left-2.5 sm:left-4 top-2 bottom-6 w-0.5 bg-white/10" />

            {/* Skeleton Milestone 1 */}
            <div className="relative">
              <div className="absolute -left-7 sm:-left-12 top-1.5 w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full border-4 border-[#08090e] skeleton-shimmer" />
              <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
                <div className="h-6 w-48 bg-white/10 rounded-md skeleton-shimmer" />
                <div className="h-4 w-32 bg-white/5 rounded skeleton-shimmer" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-white/5 rounded skeleton-shimmer" />
                  <div className="h-3 w-4/5 bg-white/5 rounded skeleton-shimmer" />
                  <div className="h-3 w-3/4 bg-white/5 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>

            {/* Skeleton Milestone 2 */}
            <div className="relative">
              <div className="absolute -left-7 sm:-left-12 top-1.5 w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full border-4 border-[#08090e] skeleton-shimmer" />
              <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 space-y-4">
                <div className="h-6 w-48 bg-white/10 rounded-md skeleton-shimmer" />
                <div className="h-4 w-32 bg-white/5 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative pl-7 sm:pl-12 space-y-12">
            {/* CONTINUOUS VERTICAL TIMELINE SPINE */}
            <div 
              aria-hidden="true" 
              className="absolute left-2.5 sm:left-4 top-3 bottom-6 w-[3px] -translate-x-1/2 bg-gradient-to-b from-accent via-indigo-500/70 to-slate-700/30 rounded-full pointer-events-none"
            >
              {/* Subtle animated light pulse along the line */}
              <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-75 animate-pulse" />
            </div>

            {/* MILESTONE 1: Glacier Agency (Current Role) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Timeline Node Badge on the vertical line */}
              <div className="absolute -left-7 sm:-left-12 top-1.5 w-6 h-6 sm:w-8 sm:h-8 -translate-x-1/2 rounded-full bg-[#08090e] border-2 border-accent flex items-center justify-center shadow-[0_0_16px_rgba(61,90,254,0.7)] z-10">
                <Briefcase size={13} className="text-accent sm:w-3.5 sm:h-3.5" />
                <span className="absolute -inset-1 rounded-full border border-accent/40 animate-ping pointer-events-none opacity-60" />
              </div>

              {/* Timeline Card */}
              <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 group-hover:border-accent/40 transition-all duration-300 shadow-xl">
                {/* Header with Role & Date Progression */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 pb-5 border-b border-white/5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current Position
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <MapPin size={11} className="text-accent shrink-0" /> Toronto, Canada (Remote)
                      </span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                      Full Stack Developer
                    </h4>
                    <p className="text-accent font-semibold text-sm sm:text-base mt-0.5">Glacier Agency</p>
                  </div>

                  {/* Connected Date Pill */}
                  <div className="flex items-center gap-2 text-white font-mono text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full w-fit shrink-0 shadow-sm">
                    <Calendar size={13} className="text-accent" />
                    <span>May 2025 – Present</span>
                  </div>
                </div>

                {/* Role Details */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Designed, developed, and shipped production-grade full-stack applications using <strong className="text-white">Node.js, Express.js, React, TypeScript, and PostgreSQL</strong> for e-commerce clients.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Built scalable REST APIs, authentication flows, database modules, and merchant-facing features across multiple live production applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Developed custom <strong className="text-white">Shopify integrations for 3+ live merchant stores</strong>, handling product data flows, storefront behavior, session token authentication, and deployment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Set up and maintained <strong className="text-white">Google Cloud Platform infrastructure</strong> including App Engine, Cloud SQL, Cloud Storage (GCS), and Secret Manager for production applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Implemented backend logic for file uploads, pricing rules, billing workflows, product customization, and secure merchant settings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(61,90,254,0.8)]" />
                    <span>
                      Collaborated in a multi-developer codebase using Git branching, pull requests, code reviews, and production deployment workflows.
                    </span>
                  </li>
                </ul>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "React", "TypeScript", "PostgreSQL", "Shopify API", "GCP", "Docker", "REST APIs"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* MILESTONE 2: Academic & Professional Foundation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Badge */}
              <div className="absolute -left-7 sm:-left-12 top-1.5 w-6 h-6 sm:w-8 sm:h-8 -translate-x-1/2 rounded-full bg-[#08090e] border-2 border-indigo-400/60 flex items-center justify-center shadow-md z-10">
                <GraduationCap size={13} className="text-slate-300 sm:w-3.5 sm:h-3.5" />
              </div>

              {/* Timeline Card */}
              <div className="glass p-6 sm:p-8 rounded-3xl border-white/5 group-hover:border-indigo-400/30 transition-all duration-300 shadow-lg">
                {/* Header with Degree & Date */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 pb-5 border-b border-white/5">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Academic Degree
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1.5">
                      BS in Computer Science
                    </h4>
                    <p className="text-slate-400 font-medium text-xs sm:text-sm mt-0.5">University of Sindh Jamshoro, Sindh</p>
                  </div>

                  {/* Connected Date Pill */}
                  <div className="flex items-center gap-2 text-slate-300 font-mono text-xs bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full w-fit shrink-0">
                    <Calendar size={13} className="text-accent" />
                    <span>2020 – 2023 · CGPA: 3.1 / 4.0</span>
                  </div>
                </div>

                {/* Sub-milestones & Specializations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-accent font-bold text-xs mb-1.5">
                      <Award size={14} className="shrink-0" />
                      <span>MERN Stack Development Course</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      <strong className="text-slate-300">Hazza Institute of Technology</strong> (Sep – Nov 2023). Intensive specialization in full-stack architecture, REST APIs, and database modeling.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-accent font-bold text-xs mb-1.5">
                      <Award size={14} className="shrink-0" />
                      <span>Writing Machine Project Award</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      <strong className="text-slate-300">University of Sindh</strong> (May 2022). Recognized for outstanding project architecture, automated control, and software design.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}


import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, GraduationCap } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
            [ 03 ] Professional Track
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Experience & Journey
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 text-sm mt-4 leading-relaxed">
            Delivering production-level backend logic, cloud infrastructure, and live Shopify integrations 
            for international clients and commercial applications.
          </p>
        </div>

        <div className="space-y-12">
          {/* Glacier Agency - Full Stack Developer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative pl-8 sm:pl-12 border-l border-white/10"
          >
            <div className="absolute -left-3.5 top-0 w-7 h-7 bg-accent rounded-full border-4 border-[#08090e] flex items-center justify-center shadow-lg shadow-accent/40">
              <Briefcase size={12} className="text-white" />
            </div>
            
            <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 hover:border-accent/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-accent/15 border border-accent/30 text-[10px] font-mono font-bold text-accent uppercase">
                      Current Position
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin size={11} className="text-accent" /> Toronto, Canada (Remote)
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Full Stack Developer</h4>
                  <p className="text-accent font-medium text-sm">Glacier Agency</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit font-mono">
                  <Calendar size={13} className="text-accent" />
                  May 2025 – Present
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
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
            </div>
          </motion.div>

          {/* Academic & Professional Foundation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="relative pl-8 sm:pl-12 border-l border-white/10"
          >
            <div className="absolute -left-3.5 top-0 w-7 h-7 bg-white/10 rounded-full border-4 border-[#08090e] flex items-center justify-center">
              <GraduationCap size={12} className="text-slate-400" />
            </div>
            
            <div className="glass p-6 sm:p-8 rounded-3xl border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-white/5">
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight">BS in Computer Science</h4>
                  <p className="text-slate-400 font-medium text-sm">University of Sindh Jamshoro, Sindh</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit font-mono">
                  <Calendar size={13} className="text-accent" />
                  2020 – 2023 · CGPA: 3.1 / 4.0
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-accent font-bold mb-1">
                    <Award size={14} />
                    <span>MERN Stack Development Course</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Hazza Institute of Technology (Sep – Nov 2023). Intensive specialization in full-stack architecture, REST APIs, and database modeling.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-accent font-bold mb-1">
                    <Award size={14} />
                    <span>ICT & IEEE Mini Project Exhibition</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    University of Sindh (May 2022). Recognized for outstanding project architecture and software design.
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

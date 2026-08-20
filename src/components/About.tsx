import { motion } from "motion/react";
import { Server, Database, Cloud, Code2, GraduationCap, Award, CheckCircle } from "lucide-react";

interface AboutProps {
  onOpenResume?: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  // Dynamically calculate exact years of production experience from May 2025
  const startCareerDate = new Date(2025, 4, 1); // May 2025
  const now = new Date();
  const diffInMonths = (now.getFullYear() - startCareerDate.getFullYear()) * 12 + (now.getMonth() - startCareerDate.getMonth());
  const exactYears = Math.max(1.3, Number((diffInMonths / 12).toFixed(1)));

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Profile Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Image Frame - Clean on mobile without dark overlays or hover effects */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-transparent md:glass border border-white/10 p-2 sm:p-3 shadow-2xl relative">
                <img 
                  src={import.meta.env.VITE_CLOUDINARY_PROFILE_URL || "https://res.cloudinary.com/dkoqssfa/image/upload/v1776602242/profiles_yx9geb.jpg"}
                  alt="Abdul Samad" 
                  className="w-full h-full object-cover rounded-2xl brightness-100 contrast-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-[#0a0b12]/90 backdrop-blur-xl border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm tracking-tight">Abdul Samad</p>
                      <p className="text-[11px] text-accent font-mono font-medium">Full Stack Engineer</p>
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
                <span className="text-2xl font-black text-white block">{exactYears}+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim">Years Prod Exp</span>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5 text-center">
                <span className="text-2xl font-black text-accent block">3+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-text-dim">Live Shopify Stores</span>
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
            <span className="meta-label mb-4 block text-accent font-mono">[ 01 ] Professional Profile</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter text-white">
              Engineering Scalable Systems <br />
              <span className="text-accent">With Backend Precision.</span>
            </h3>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm font-normal">
              <p>
                I am a <strong className="text-white">Full Stack Developer</strong> with {exactYears}+ years of dedicated experience building, maintaining, and deploying production-grade web applications. While proficient across the full stack, my primary engineering focus and deep passion lie in <strong className="text-white">backend architecture, RESTful & GraphQL API design, system modeling, and database optimization</strong>.
              </p>
              <p>
                At <span className="text-white font-medium">Glacier Agency (Toronto, Canada)</span>, I architect and maintain mission-critical backend modules, custom pricing logic, secure file upload pipelines via Google Cloud Storage, and Shopify App Bridge integrations supporting live merchant stores with high transaction volume.
              </p>
              <p>
                I prioritize clean architecture, robust session management (OAuth 2.0, JWT, secure HttpOnly cookies), and cloud deployment workflows (GCP App Engine, Cloud SQL, Secret Manager). At the same time, I ensure frontend interfaces built with React, Vite, and Tailwind CSS provide intuitive, responsive user experiences that connect effortlessly with complex server APIs.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Server size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">API & System Design</h4>
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
                  <h4 className="text-sm font-bold text-white mb-1">Databases & Cloud</h4>
                  <p className="text-xs text-text-dim leading-relaxed">
                    PostgreSQL on Cloud SQL, MongoDB aggregation pipelines, Firestore, and GCP serverless hosting.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Credentials Summary */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">BS in Computer Science (2020 – 2023)</p>
                  <p className="text-[11px] text-slate-400">University of Sindh Jamshoro · CGPA: 3.1 / 4.0</p>
                </div>
              </div>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto"
                >
                  View Full CV
                </button>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

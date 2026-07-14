import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
       {/* Decor */}
       <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
            [ 03 ] Career Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">My Experience</h3>
        </div>

        <div className="space-y-12">
          {/* Glacier Agency - Permanent */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="relative pl-12 border-l border-white/10"
          >
             <div className="absolute -left-3.5 top-0 w-7 h-7 bg-indigo-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-lg shadow-indigo-600/50">
                <Briefcase size={12} className="text-white" />
             </div>
             
             <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                   <div>
                      <h4 className="text-2xl font-bold">Full Stack Developer</h4>
                      <p className="text-indigo-400 font-medium">Glacier Agency • Permanent</p>
                   </div>
                   <div className="flex items-center gap-2 text-slate-500 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                      <Calendar size={14} />
                      Oct 2025 — Present
                   </div>
                </div>

                <ul className="space-y-4 text-slate-400">
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Transitioned to a permanent role after an exceptional internship performance, leading full-stack design and API performance optimization.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Engineered a robust, full-stack Shopify application integrating Shopify's Sessionless/Zero Authentication mechanism, supporting seamless and secure operations.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Maintained, monitored, and updated the application ecosystem daily, ensuring 99.9% uptime and immediate hotfixes for real-world scenarios.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Leveraged Google Cloud Platform (GCP) for secure file assets, database hosting, server-side cron triggers, and secure API networks.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Refined general system design, reducing data latency and improving logical transaction processing speed.</span>
                   </li>
                </ul>
             </div>
          </motion.div>

          {/* Glacier Agency - Internship */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             className="relative pl-12 border-l border-white/10"
          >
             <div className="absolute -left-3.5 top-0 w-7 h-7 bg-indigo-600/50 rounded-full border-4 border-slate-950 flex items-center justify-center">
                <Briefcase size={12} className="text-slate-400" />
             </div>
             
             <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                   <div>
                      <h4 className="text-xl font-bold">Full Stack Developer Intern</h4>
                      <p className="text-slate-400 font-medium">Glacier Agency • 5-Month Internship</p>
                   </div>
                   <div className="flex items-center gap-2 text-slate-500 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                      <Calendar size={14} />
                      May 2025 — Oct 2025
                   </div>
                </div>

                <ul className="space-y-4 text-slate-400">
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Gained hands-on experience by delivering production-level full-stack modules on the PERN stack (PostgreSQL, Express, React, Node.js).</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Worked on high-performance e-commerce integrations, custom APIs, and secure JWT-based user routing systems.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Sharpened logical thinking and software problem-solving skills under direct senior developer guidance.</span>
                   </li>
                </ul>
             </div>
          </motion.div>

          {/* Independent Engineering */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
             className="relative pl-12 border-l border-white/10"
          >
             <div className="absolute -left-3.5 top-0 w-7 h-7 bg-indigo-600/30 rounded-full border-4 border-slate-950 flex items-center justify-center">
                <Briefcase size={12} className="text-slate-500" />
             </div>
             
             <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                   <div>
                      <h4 className="text-xl font-bold">Independent Software Engineer</h4>
                      <p className="text-slate-400 font-medium">Freelance & Self-Driven Projects</p>
                   </div>
                   <div className="flex items-center gap-2 text-slate-500 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                      <Calendar size={14} />
                      2023 — May 2025
                   </div>
                </div>

                <ul className="space-y-4 text-slate-400">
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Designed and launched interactive mobile applications on the Google Play Store, managing publication and end-to-end user testing.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Created custom full-stack user affiliate applications, featuring accurate referral tracking, robust payouts, and data dashboards.</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent mt-1">•</span>
                     <span>Mastered fundamental structures of databases (NoSQL and SQL) and custom integration APIs prior to entering professional agency settings.</span>
                   </li>
                </ul>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

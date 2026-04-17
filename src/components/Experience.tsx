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
            [ 03 ] Career Trajectory
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">Experience</h3>
        </div>

        <div className="space-y-12">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative pl-12 border-l border-white/10"
          >
             <div className="absolute -left-3.5 top-0 w-7 h-7 bg-indigo-600 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-lg shadow-indigo-600/50">
                <Briefcase size={12} className="text-white" />
             </div>
             
             <div className="glass p-8 rounded-3xl border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                   <div>
                      <h4 className="text-2xl font-bold">Full Stack Developer</h4>
                      <p className="text-indigo-400 font-medium">Glacier Agency</p>
                   </div>
                   <div className="flex items-center gap-2 text-slate-500 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                      <Calendar size={14} />
                      May 2025 — Present
                   </div>
                </div>

                <ul className="space-y-4 text-slate-400 list-disc list-inside">
                   <li>Expertly building full-stack applications using the **PERN stack (Postgres, Express, React, Node.js)** and **TypeScript**.</li>
                   <li>Successfully delivering numerous full-stack projects on time, maintaining high detail and performance standards.</li>
                   <li>Utilizing **Git** for efficient version control and collaborative workflows across complex web architectures.</li>
                   <li>Developing custom **Shopify backend integrations** and managing **Storefront deployments** for optimized e-commerce.</li>
                   <li>Integrating **Google Cloud** and advanced cloud services for hosting, file management, and secure data delivery.</li>
                </ul>
             </div>
          </motion.div>

          {/* Add more experience blocks here if needed */}
        </div>
      </div>
    </section>
  );
}

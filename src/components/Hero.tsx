import { motion } from "motion/react";
import { Server, Database, ShoppingBag, ArrowDown, FileText, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-accent text-xs font-mono font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>FULL STACK DEVELOPER</span>
          </div>

          <h1 className="massive-title mb-6 text-center leading-tight tracking-tighter text-white">
            Abdul <span className="text-glow text-accent">Samad</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto mb-4 tracking-tight">
            Building production web applications with Node.js, Express, React, TypeScript, PostgreSQL, MongoDB & Google Cloud Platform.
          </p>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-text-dim mb-10 leading-relaxed font-normal px-4">
            Passionate about backend architecture, REST & GraphQL API engineering, secure authentication (OAuth 2.0, Session tokens, JWT), and database optimization — paired with clean, responsive user interfaces.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-accent text-white text-xs font-bold tracking-widest uppercase hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_25px_rgba(61,90,254,0.35)] rounded-full text-center"
            >
              View Featured Work
            </a>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-8 py-3.5 bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-accent text-xs font-bold tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-full flex items-center justify-center gap-2"
              >
                <FileText size={14} className="text-accent" />
                <span>View & Download CV</span>
              </button>
            )}

            <a
              href="#contact"
              className="px-8 py-3.5 bg-transparent border border-white/10 text-slate-300 hover:text-white hover:border-white/30 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full text-center"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>

        {/* 3 Core Engineering Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 max-w-4xl mx-auto">
          {[
            {
              icon: Server,
              title: "Backend & APIs",
              desc: "Node.js, Express, TypeScript, REST APIs, GraphQL, OAuth 2.0, JWT & secure session flows."
            },
            {
              icon: Database,
              title: "Databases & GCP",
              desc: "PostgreSQL on Cloud SQL, MongoDB pipelines, Firestore, Google App Engine & Secret Manager."
            },
            {
              icon: ShoppingBag,
              title: "Shopify & Full Stack",
              desc: "Shopify App Bridge, Billing APIs, custom pricing engines, React, Vite & Tailwind CSS."
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                className="glass p-6 rounded-3xl text-left border-white/5 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent mb-4">
                  <Icon size={18} />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

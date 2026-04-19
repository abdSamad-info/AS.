import { motion } from "motion/react";
import { ArrowRight, Code, Layout, Server } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-height-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="meta-label mb-8 block">
            [ BUILDING SCALABLE DIGITAL ARCHITECTURES ]
          </span>
          <h1 className="massive-title mb-10">
            Abdul <br />
            <span className="text-accent text-glow">Samad</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[11px] md:text-sm text-text-dim mb-12 leading-relaxed tracking-[0.2em] uppercase font-bold px-4">
            Pushing the boundaries of digital innovation through high-performance 
            full-stack engineering. Crafting seamless, accessible, and 
            architecturally sound ecosystems for the modern web.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-accent text-white text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(61,90,254,0.3)]"
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>

        {/* Feature Cards Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: Layout, title: "Frontend", desc: "React, Next.js, TS/JS" },
            { icon: Server, title: "Backend", desc: "Node.js, Python, SQL" },
            { icon: Code, title: "Core Languages", desc: "JavaScript, TypeScript, Python" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass p-8 rounded-3xl text-left border-white/5"
            >
              <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

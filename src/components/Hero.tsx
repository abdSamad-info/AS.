import { motion } from "motion/react";
import { Code, Layout, Server } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <span className="meta-label mb-8 block text-center">
            [ CRAFTING MEMORABLE DIGITAL EXPERIENCES ]
          </span>
          <h1 className="massive-title mb-10 text-center leading-tight">
            Abdul <br />
            <span className="text-glow text-accent">Samad</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-text-dim mb-12 leading-relaxed tracking-wide font-normal px-4 text-center">
            A passionate Full-Stack Developer & Software Engineer specializing in building high-performance web applications. 
            I design clean interfaces, write robust server-side code, and focus on delivering smooth user experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto sm:max-w-none">
            <a
              href="#projects"
              className="px-10 py-4 bg-accent text-white text-xs font-bold tracking-widest uppercase hover:bg-accent/90 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_30px_rgba(61,90,254,0.3)] rounded-full text-center w-full sm:w-auto"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-10 py-4 bg-transparent border border-white/10 text-white hover:border-white/30 text-xs font-bold tracking-widest uppercase hover:bg-white/[0.03] transition-all duration-300 rounded-full text-center w-full sm:w-auto"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>

        {/* Feature Cards Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { icon: Layout, title: "Frontend", desc: "React, Next.js, TS/JS" },
            { icon: Server, title: "Backend", desc: "Node.js, Python, SQL" },
            { icon: Code, title: "Core Languages", desc: "JavaScript, TypeScript, Python" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              className="glass p-8 rounded-3xl text-left border-white/5 hover:border-accent/25 hover:-translate-y-1.5 transition-all duration-300"
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

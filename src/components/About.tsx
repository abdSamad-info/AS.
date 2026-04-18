import { motion } from "motion/react";
 
export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass border-white/10 p-4">
               <img 
                 src="/images/profiles.jpg"
                 alt="Abdul Samad" 
                 className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                 referrerPolicy="no-referrer"
                 loading="lazy"
               />
            </div>
            {/* Decors */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/40 rounded-full blur-[60px] -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-600/40 rounded-full blur-[60px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="meta-label mb-4 block text-accent font-mono">[ 01 ] BIOGRAPHY</span>
            <h3 className="text-5xl font-black mb-8 leading-none uppercase tracking-tighter">
              Aesthetics <br />
              <span className="text-accent underline decoration-glass-border underline-offset-8">Precision.</span>
            </h3>
            <div className="space-y-6 text-text-dim leading-relaxed text-sm uppercase tracking-wide font-medium">
              <p>
                As a MERN Stack Developer with over 1.5 years of experience, I blend technical 
                excellence with a keen eye for UI/UX. My mission is to build digital products 
                that are not only robust and scalable but also a joy to use.
              </p>
              <p>
                I thrive on solving complex problems and turning abstract ideas into 
                production-ready solutions. Whether it's optimizing database queries 
                or crafting pixel-perfect interfaces, I approach every challenge 
                with dedication and a focus on clean, maintainable code.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">1+</h4>
                <p className="text-slate-500 text-sm">Years Experience</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">6+</h4>
                <p className="text-slate-500 text-sm">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

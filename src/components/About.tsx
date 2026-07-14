import { motion } from "motion/react";
 
export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass border-white/10 p-4">
               <img 
                 src={import.meta.env.VITE_CLOUDINARY_PROFILE_URL}
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <span className="meta-label mb-4 block text-accent font-mono">[ 01 ] About Me</span>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-none uppercase tracking-tighter">
              Crafting experiences, <br />
              <span className="text-accent underline decoration-glass-border underline-offset-8">Not just code.</span>
            </h3>
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm font-normal">
              <p>
                Hi, I'm Abdul Samad. I am a Full Stack Developer and Software Engineer with over 1.3+ years 
                of dedicated experience building and maintaining real-world production systems. I specialize in 
                engineering robust backend APIs, secure database structures, and high-performance user interfaces.
              </p>
              <p>
                My professional journey has enabled me to deliver complex applications, including full-stack Shopify 
                applications with Zero/Sessionless Authentication, highly custom user affiliate platforms, and mobile apps 
                deployed directly to the Google Play Store. 
              </p>
              <p>
                I thrive on optimizing system design, building scalable logic on Google Cloud Platform (GCP), 
                and continuously refining codebases for peak performance. I believe in writing clean, readable, 
                and highly maintainable code that drives business value and offers an exceptional user experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">1.3+</h4>
                <p className="text-slate-500 text-sm">Years Experience</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">10+</h4>
                <p className="text-slate-500 text-sm">Projects Completed</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>

  );
}

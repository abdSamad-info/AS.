import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Frontend Mastery",
    skills: ["React 19", "Next.js 14", "TypeScript", "Tailwind CSS 4", "Redux Toolkit", "Framer Motion"],
  },
  {
    title: "Backend Architecture",
    skills: ["Node.js", "Express.js", "Socket.io", "JWT Auth", "RESTful APIs", "Mongoose"],
  },
  {
    title: "Data Systems",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Cloudinary", "Firebase"],
  },
  {
    title: "Platforms & DevOps",
    skills: ["Docker", "AWS S3", "Vercel", "Git/GitHub", "GitHub Actions", "Google Cloud"],
  },
  {
    title: "UI/UX & Design",
    skills: ["Figma", "Responsive Design", "Micro-interactions", "A11y", "Glassmorphism"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
            [ 02 ] Technical Arsenal
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">Tech Stack</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group"
            >
              <h4 className="text-xl font-bold mb-6 text-indigo-400 group-hover:text-cyan-400 transition-colors">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(61, 90, 254, 0.1)",
                      borderColor: "rgba(61, 90, 254, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

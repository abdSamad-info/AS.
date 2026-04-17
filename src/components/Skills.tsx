import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React", "Redux", "Tailwind CSS", "Next.js", "Angular"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.io"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL",],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "Vercel", "Netlify", "GCS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">
            Abilities
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
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

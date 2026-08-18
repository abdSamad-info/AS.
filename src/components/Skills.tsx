import { motion } from "motion/react";
import { 
  Server, 
  ShoppingBag, 
  Cloud, 
  Database, 
  Monitor, 
  Code2, 
  Wrench,
  ShieldCheck
} from "lucide-react";

const skillCategories = [
  {
    title: "Backend Engineering",
    tag: "[ CORE ARCHITECTURE ]",
    icon: Server,
    commentary: "Designing scalable RESTful & GraphQL APIs, secure authentication pipelines, and real-time event streams.",
    skills: [
      "Node.js", 
      "Express.js", 
      "REST APIs", 
      "JWT Authentication", 
      "OAuth 2.0", 
      "Session Authentication", 
      "Socket.io", 
      "Mongoose"
    ],
  },
  {
    title: "Shopify Ecosystem",
    tag: "[ LIVE COMMERCE ]",
    icon: ShoppingBag,
    commentary: "Building embedded merchant apps, prescription customization engines, and Shopify GraphQL integrations.",
    skills: [
      "GraphQL Admin API", 
      "Storefront API", 
      "Billing API", 
      "App Bridge", 
      "OAuth 2.0", 
      "Theme App Extensions", 
      "Embedded Apps"
    ],
  },
  {
    title: "Database Systems",
    tag: "[ STORAGE & OPTIMIZATION ]",
    icon: Database,
    commentary: "Relational and document database schema design, aggregation pipelines, and query latency reduction.",
    skills: [
      "PostgreSQL", 
      "MongoDB", 
      "Cloud SQL", 
      "Firestore", 
      "Aggregation Pipelines", 
      "Query Optimization"
    ],
  },
  {
    title: "Cloud & DevOps",
    tag: "[ GCP & CI/CD INFRASTRUCTURE ]",
    icon: Cloud,
    commentary: "Deploying and managing production cloud infrastructure, secrets, and automated build pipelines.",
    skills: [
      "Google Cloud Platform", 
      "App Engine", 
      "Cloud Run", 
      "Cloud SQL", 
      "Cloud Storage (GCS)", 
      "Secret Manager", 
      "GitHub Actions", 
      "Vercel", 
      "Render"
    ],
  },
  {
    title: "Frontend Engineering",
    tag: "[ RESPONSIVE UI ]",
    icon: Monitor,
    commentary: "Crafting modern, responsive user interfaces and dashboards that communicate seamlessly with backend APIs.",
    skills: [
      "React.js", 
      "Vite", 
      "TypeScript", 
      "Redux", 
      "Tailwind CSS", 
      "Material UI", 
      "Component Architecture", 
      "Responsive UI"
    ],
  },
  {
    title: "Languages & Tools",
    tag: "[ CODE & WORKFLOW ]",
    icon: Code2,
    commentary: "Writing clean, type-safe code with robust testing and version control workflows.",
    skills: [
      "JavaScript (ES6+)", 
      "TypeScript", 
      "Python", 
      "HTML5 / CSS3", 
      "Git & GitHub", 
      "Postman", 
      "Figma", 
      "Jest & Cypress"
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#07070a]/40">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
            [ 02 ] Technical Arsenal
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Skills & Specializations
          </h3>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm mt-4 leading-relaxed">
            A comprehensive overview of the languages, server-side frameworks, cloud platforms, and e-commerce APIs 
            I leverage to architect and ship production software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass p-7 sm:p-8 rounded-3xl border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-accent font-bold">
                      {category.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold mb-2.5 text-white">
                    {category.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed font-normal">
                    {category.commentary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-medium tracking-wide text-slate-300 hover:text-white hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

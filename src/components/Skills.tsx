import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Server, 
  ShoppingBag, 
  Cloud, 
  Database, 
  Monitor, 
  Code2, 
  Terminal,
  Layers
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: typeof Server;
  accentColor: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & System Architecture",
    icon: Server,
    accentColor: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    skills: [
      "Node.js", 
      "Express.js", 
      "TypeScript", 
      "RESTful API Engineering", 
      "GraphQL Admin API", 
      "API Latency Profiling", 
      "Server Load & Concurrency", 
      "OAuth 2.0 & Session Security", 
      "JWT Authentication", 
      "Middleware Architecture"
    ],
  },
  {
    id: "shopify",
    title: "Shopify Merchant Ecosystem",
    icon: ShoppingBag,
    accentColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    skills: [
      "Shopify App Bridge", 
      "GraphQL Admin API", 
      "Custom Pricing Engines", 
      "Embedded Apps", 
      "Shopify Billing API", 
      "Storefront API", 
      "Theme App Extensions", 
      "Webhooks Lifecycle Pipelines"
    ],
  },
  {
    id: "databases",
    title: "Databases & Optimization",
    icon: Database,
    accentColor: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
    skills: [
      "PostgreSQL", 
      "MongoDB", 
      "Firestore", 
      "Query Indexing & Optimization", 
      "Connection Pooling", 
      "Data Schema Modeling"
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Toolchain",
    icon: Cloud,
    accentColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    skills: [
      "Google Cloud Platform (GCP)", 
      "Google App Engine", 
      "Google Cloud Storage (GCS)", 
      "Secret Manager", 
      "Docker", 
      "Git & GitHub", 
      "GitHub Actions (CI/CD)", 
      "Postman", 
      "Health & Uptime Monitoring"
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    accentColor: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    skills: [
      "TypeScript", 
      "JavaScript (ES6+)", 
      "HTML5 & CSS3"
    ],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Monitor,
    accentColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    skills: [
      "React.js", 
      "Next.js", 
      "Tailwind CSS", 
      "Material UI", 
      "Responsive UI", 
      "State Memoization (useMemo / useCallback)", 
      "Event & Callback Handling", 
      "Frontend System Architecture", 
      "Vite"
    ],
  },
];

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "backend", label: "Backend" },
    { id: "shopify", label: "Shopify" },
    { id: "databases", label: "Databases" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
  ];

  const displayedCategories = selectedFilter === "all"
    ? skillCategories
    : skillCategories.filter((c) => c.id === selectedFilter);

  const totalSkillsCount = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-[#07070b]/60">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold mb-3">
            <Layers size={13} />
            <span>TECHNICAL SKILLS</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Core Competencies
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            A focused breakdown of languages, frameworks, cloud services, and e-commerce APIs I use to engineer robust production systems.
          </p>
        </motion.div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-[0_0_15px_rgba(61,90,254,0.35)]"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Compact, Clean Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${category.accentColor}`}>
                        <Icon size={15} />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {category.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 shrink-0">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-300 bg-white/[0.025] hover:bg-accent/10 border border-white/5 hover:border-accent/30 hover:text-white transition-all duration-150 cursor-default flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/60" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Total Summary Pill */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-slate-500">
            {totalSkillsCount}+ verified technical proficiencies &amp; production tools
          </p>
        </div>
      </div>
    </section>
  );
}

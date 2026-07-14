import { motion } from "motion/react";
import { Code2, Server, ShoppingBag, Cloud, Database, Monitor } from "lucide-react";

const skillCategories = [
  {
    title: "Backend Architecture",
    tag: "[ CORE ENGINE ]",
    icon: Server,
    commentary: "Engineering high-throughput, low-latency APIs with clean request patterns and absolute reliability.",
    skills: ["Node.js", "Express.js", "RESTful APIs", "WebSockets (Socket.io)", "System Design", "JWT"],
  },
  {
    title: "Specialized Shopify",
    tag: "[ E-COMMERCE INTEGRATIONS ]",
    icon: ShoppingBag,
    commentary: "Building robust Shopify Apps utilizing sessionless Zero-Authentication, webhooks, and secure transaction syncs.",
    skills: ["Shopify Sessionless Auth", "Shopify App API", "Webhooks", "Billing APIs", "Secure Proxies"],
  },
  {
    title: "Cloud & Infrastructure",
    tag: "[ SCALABLE INFRASTRUCTURE ]",
    icon: Cloud,
    commentary: "Provisioning high-availability infrastructure on GCP, utilizing containerized environments and CI/CD pipelines.",
    skills: ["Google Cloud (GCP)", "Docker", "CI/CD Pipelines", "Git/GitHub"],
  },
  {
    title: "Database Systems",
    tag: "[ PERSISTENCE & CACHING ]",
    icon: Database,
    commentary: "Designing highly optimized, relational and non-relational database schemas, migrations, and caching layers.",
    skills: ["PostgreSQL", "MongoDB", "Redis Caching", "Firebase Firestore", "SQL Optimization"],
  },
  {
    title: "Programming Languages",
    tag: "[ LANGUAGE SYNTAX ]",
    icon: Code2,
    commentary: "Writing clean, type-safe, and self-documenting code across diverse environments and execution runners.",
    skills: ["TypeScript", "JavaScript (ES6+)", "Python"],
  },
  {
    title: "Frontend Mastery",
    tag: "[ INTUITIVE INTERFACES ]",
    icon: Monitor,
    commentary: "Crafting fluid, pixel-perfect user journeys with native responsive layouts and cinematic micro-animations.",
    skills: ["React 19", "Next.js 15", "Tailwind CSS v4", "Framer Motion", "State Management", "HTML5 & CSS3"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#07070a]/40">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
            [ 02 ] Technical Arsenal
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Technologies & Tools
          </h3>
          <p className="max-w-xl mx-auto text-slate-400 text-sm mt-4 leading-relaxed">
            A comprehensive catalog of languages, server-side frameworks, and e-commerce systems 
            leveraged to build resilient, enterprise-grade applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                className="glass p-8 rounded-3xl border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300 group flex flex-col justify-between"
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

                  <h4 className="text-xl font-bold mb-3 text-white">
                    {category.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed font-normal">
                    {category.commentary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
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

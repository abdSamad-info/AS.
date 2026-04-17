import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { useState, useMemo } from "react";

const projects = [
  {
    title: "Presia",
    subtitle: "Kordec Shopify Store Integration",
    desc: "Architected a high-performance custom Shopify interface. Streamlined product management for 500+ items using Storefront API and GCS, reducing sync latency by 40%.",
    tech: ["Node.js", "Express", "PostgreSQL", "React", "Shopify API"],
    image: "https://picsum.photos/seed/presia/800/600",
  },
  {
    title: "Electrica",
    subtitle: "Electrical Contractor Web App",
    desc: "Engineered a secure multi-user MERN platform for contractor workflow. Implemented real-time tracking and encrypted messaging, boosting operational efficiency by 25%.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "https://picsum.photos/seed/electrica/800/600",
  },
  {
    title: "Cinema Ticket System",
    subtitle: "Real-time Seat Reservation",
    desc: "Developed a real-time reservation system handling 100+ concurrent users. Optimized MongoDB queries to reduce backend response time by 30% through aggregation pipelines.",
    tech: ["React", "Node.js", "Express", "MongoDB", "MaterialUI"],
    image: "https://picsum.photos/seed/cinema/800/600",
  },
  {
    title: "Full-Stack Portfolio",
    subtitle: "Personal Portfolio Showcase",
    desc: "A high-fidelity minimalist showcase built with React 19 and Express. Achieved 95+ Lighthouse scores through modern UI patterns and optimized server-side asset delivery.",
    tech: ["React", "Express", "PostgreSQL", "Tailwind CSS", "Motion"],
    image: "https://picsum.photos/seed/portfolio/800/600",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).slice(0, 6)]; // Limit to 6 popular ones + All for better UI
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4 font-mono">
              [ 01 ] Featured Work
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Latest Projects</h3>
          </div>
          <p className="max-w-md text-text-dim text-xs uppercase tracking-widest font-bold leading-relaxed">
            A selection of my most recent work, ranging from complex e-commerce integrations
            to real-time collaborative applications.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-glass-border pb-8">
          <div className="flex items-center gap-2 text-accent mr-4">
            <Filter size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                activeFilter === cat
                  ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(61,90,254,0.3)]"
                  : "border-glass-border text-text-dim hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                whileHover={{ y: -10 }}
                className="group border border-glass-border bg-glass p-8 rounded-2xl hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
              >
                <div className="text-[10px] uppercase tracking-widest text-text-dim mb-4 flex justify-between items-center font-bold">
                   <span>0{index + 1} / {project.subtitle.split(" ").slice(-2).join(" ")}</span>
                   <span className="w-8 h-px bg-glass-border" />
                </div>
                
                <h4 className="text-3xl font-black uppercase tracking-tight mb-8 group-hover:text-accent transition-colors">{project.title}</h4>
                
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-text-dim text-sm mb-8 leading-relaxed max-w-sm uppercase tracking-wide font-medium">{project.desc}</p>
                
                <div className="flex justify-between items-center pt-8 border-t border-glass-border">
                  <div className="flex gap-4">
                    <a href="#" className="text-white hover:text-accent transition-colors"><Github size={18} /></a>
                    <a href="#" className="text-white hover:text-accent transition-colors"><ExternalLink size={18} /></a>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    View Project
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

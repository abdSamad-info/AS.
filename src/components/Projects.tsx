import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Filter, X, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
 
// Using public folder paths instead of imports - works on Vercel!
const projects = [
  {
    id: 1,
    title: "Presia",
    subtitle: "Kordec Shopify Store Integration",
    desc: "Architected a high-performance custom Shopify interface. Seamlessly integrated custom product hooks and automated image pipelines to enhance user experience.",
    longDesc: "Presia required a highly customized storefront that Shopify's standard themes couldn't provide. I built a custom frontend using React that communicates with the Shopify Storefront API. \n\nTo handle the massive volume of high-resolution image assets for contact lenses, I integrated Google Cloud Storage, implementing a custom middleware for secure, optimized image delivery.",
    tech: ["Node.js", "Express", "PostgreSQL", "React", "Shopify API"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920",
    link: null,
    github: "#",
    achievements: ["40% reduction in sync latency", "Integrated 10+ custom Shopify hooks", "Automated image optimization pipeline"],
  },
  {
    id: 2,
    title: "Electrica",
    subtitle: "Electrical Contractor Web App",
    desc: "Engineered a secure multi-user MERN platform for contractor workflow. Implemented real-time tracking and encrypted messaging, boosting operational efficiency by 25%.",
    longDesc: "Electrica is a comprehensive management tool for electrical contractors. It handles the entirely lifecycle of a project from initial lead to final inspection. I implemented a complex state machine for project stages and used Socket.io for real-time updates across the contractor and client dashboards.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "https://res.cloudinary.com/dkoqsgewf/image/upload/v1776602241/electrica_qm7doq.png",
    link: "https://electricaapp.vercel.app",
    github: "#",
    achievements: ["25% boost in contractor efficiency", "Real-time PWA support", "Biometric OTP authentication"],
  },
  {
    id: 3,
    title: "Cinet",
    subtitle: "Cinema Ticket Management",
    desc: "A full-stack cinema ticket booking system with movie scheduling, seat selection, and user authentication. Built for high-volume ticket sales.",
    longDesc: "Cinet is a robust cinema management platform. It features an admin dashboard for theatre owners to manage movies, showtimes, and pricing, alongside a client-facing booking interface with real-time seat selection and availability tracking.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1920",
    link: null,
    github: "#",
    achievements: ["Real-time seat reservation system", "Admin revenue dashboard", "Secure role-based access control"],
  },
  {
    id: 4,
    title: "Live Chat App",
    subtitle: "Full-Stack Messaging System",
    desc: "Real-time communication platform with group chats, private messaging, and instant notification system using Socket.io.",
    longDesc: "A complete messaging ecosystem designed for scalability. Implemented persistent message history, user presence indicators, and image sharing capabilities. The backend manages thousands of concurrent WebSocket connections efficiently.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "Redux"],
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1920",
    link: null,
    github: "#",
    achievements: ["Sub-50ms message delivery latency", "Group chat management features", "File upload & sharing integration"],
  },
  {
    id: 5,
    title: "Full-Stack Portfolio",
    subtitle: "Personal Portfolio Showcase",
    desc: "A high-fidelity minimalist showcase built with React 19 and Express. Achieved 95+ Lighthouse scores through modern UI patterns.",
    longDesc: "This portfolio was designed as an 'Experience-First' platform. It utilizes the latest React 19 features and is styled with Tailwind CSS 4, leveraging the new JIT engine for high-performance class generation.",
    tech: ["React", "Express", "PostgreSQL", "Tailwind CSS", "Motion"],
    image: "https://res.cloudinary.com/dkoqsgewf/image/upload/v1776602241/abdfolio_ilglg1.png",
    link: "https://abdfolio.vercel.app/",
    github: "https://github.com/ABDLSamaD",
    achievements: ["95+ Lighthouse score", "Custom Glassmorphic engine", "Express API contact integration"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const categories = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).slice(0, 6)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 font-mono">
              [ 04 ] Featured Work
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
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-[10px] font-black uppercase tracking-widest px-6 py-2 transition-all group overflow-hidden`}
              >
                <span className={`relative z-10 transition-colors ${activeFilter === cat ? "text-white" : "text-text-dim group-hover:text-white"}`}>
                  {cat}
                </span>
                {activeFilter === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-accent shadow-[0_0_20px_rgba(61,90,254,0.3)] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-0 border border-glass-border rounded-full" />
              </button>
            ))}
          </div>
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
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group border border-glass-border bg-glass p-8 rounded-2xl hover:bg-white/[0.05] transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <div className="text-[10px] uppercase tracking-widest text-text-dim mb-4 flex justify-between items-center font-bold font-mono">
                   <span>0{index + 1} / {project.subtitle.split(" ").slice(-2).join(" ")}</span>
                   <span className="w-8 h-px bg-glass-border" />
                </div>
                
                <h4 className="text-3xl font-black uppercase tracking-tight mb-8 group-hover:text-accent transition-colors">{project.title}</h4>
                
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 border border-glass-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <p className="text-text-dim text-sm mb-8 leading-relaxed max-w-sm uppercase tracking-wide font-medium">{project.desc}</p>
                
                <div className="flex justify-between items-center pt-8 border-t border-glass-border">
                  <div className="flex gap-4">
                    {project.github && project.github !== "#" && (
                      <a href={project.github} target="_blank" className="text-white hover:text-accent transition-colors"><Github size={18} /></a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" className="text-white hover:text-accent transition-colors"><ExternalLink size={18} /></a>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Details <ChevronRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-xl z-[60] flex items-center justify-center p-6"
            />
            <motion.div
              layoutId={selectedProject.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[95%] md:max-w-5xl h-[85vh] md:h-fit max-h-[90vh] glass rounded-3xl z-[70] overflow-hidden flex flex-col md:flex-row shadow-2xl border-white/10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-accent transition-colors z-[100]"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-48 md:h-auto relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto flex-1">
                <span className="meta-label mb-4 block">{selectedProject.subtitle}</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">{selectedProject.title}</h3>
                
                <div className="space-y-8">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-4">The Challenge & Solution</h5>
                    <p className="text-text-dim text-sm uppercase tracking-wide leading-relaxed">{selectedProject.longDesc}</p>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-4">Key Achievements</h5>
                    <ul className="space-y-3">
                      {selectedProject.achievements.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(61,90,254,0.6)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-4">Technologies</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-text-dim">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    {selectedProject.link ? (
                      <a href={selectedProject.link} target="_blank" className="flex-1 py-4 bg-accent text-white text-xs font-black tracking-widest uppercase text-center rounded-xl shadow-[0_0_20px_rgba(61,90,254,0.3)]">
                        Launch Demo
                      </a>
                    ) : (
                      <div className="flex-1 py-4 bg-white/5 border border-white/10 text-text-dim text-xs font-black tracking-widest uppercase text-center rounded-xl cursor-default">
                        Production App
                      </div>
                    )}
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <a href={selectedProject.github} target="_blank" className="w-14 h-14 glass flex items-center justify-center text-white rounded-xl border-white/10 hover:bg-white/5">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

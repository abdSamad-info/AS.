import { motion } from "motion/react";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string | null }>({ type: null, msg: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: "success", msg: data.message });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="meta-label mb-4 block">Get In Touch</span>
            <h3 className="text-5xl font-black mb-8 leading-none uppercase tracking-tighter">
              START A <br />
              <span className="text-accent">PROJECT</span>.
            </h3>
            <p className="text-text-dim text-sm uppercase tracking-wide font-medium leading-relaxed mb-12 max-w-sm">
              I am currently available for new projects. Let's build something exceptional together.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Email</p>
                  <p className="text-xl font-medium">samadpakhtoon09@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Phone</p>
                  <p className="text-xl font-medium">0330-5786110</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-glass-border bg-glass p-10 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-black text-text-dim ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="JOHN DOE"
                  className="w-full bg-transparent border-b border-glass-border py-4 focus:outline-none focus:border-accent transition-all text-white uppercase text-sm tracking-wide"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-black text-text-dim ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full bg-transparent border-b border-glass-border py-4 focus:outline-none focus:border-accent transition-all text-white uppercase text-sm tracking-wide"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-black text-text-dim ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="TELL ME ABOUT YOUR PROJECT"
                  className="w-full bg-transparent border-b border-glass-border py-4 focus:outline-none focus:border-accent transition-all text-white uppercase text-sm tracking-wide resize-none"
                />
              </div>

              {status.msg && (
                <div className={`p-4 rounded-xl text-[10px] uppercase tracking-widest font-bold ${status.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                  {status.msg}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-5 bg-accent text-white text-xs font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(61,90,254,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                      />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormState({ name: "", email: "", message: "" });
                    setStatus({ type: null, msg: null });
                  }}
                  className="px-8 py-5 border border-glass-border text-text-dim text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/5 hover:text-white transition-all"
                >
                  RESET
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

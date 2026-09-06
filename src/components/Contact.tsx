import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { validateClientEmail } from "../utils/emailValidator";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [alertInfo, setAlertInfo] = useState<{ type: "warning" | "error" | "success" | null; msg: string | null }>({ type: null, msg: null });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formState.name.trim()) {
      setAlertInfo({ type: "warning", msg: "Alert: Please enter your name before sending." });
      return false;
    }
    if (!formState.email.trim()) {
      setAlertInfo({ type: "warning", msg: "Alert: Please enter your email address." });
      return false;
    }
    const emailCheck = validateClientEmail(formState.email);
    if (!emailCheck.isValid) {
      setAlertInfo({ type: "warning", msg: `Alert: ${emailCheck.error}` });
      return false;
    }
    if (!formState.message.trim()) {
      setAlertInfo({ type: "warning", msg: "Alert: Please enter your message." });
      return false;
    }
    if (formState.message.length < 10) {
      setAlertInfo({ type: "warning", msg: "Alert: Message must be at least 10 characters long." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setAlertInfo({ type: null, msg: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      
      if (res.ok) {
        setAlertInfo({ type: "success", msg: data.message || "Thank you! Your message has been sent successfully." });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setAlertInfo({ type: "error", msg: data.error || "Alert: Failed to submit message. Please try again." });
      }
    } catch (err) {
      setAlertInfo({ type: "error", msg: "Alert: Something went wrong. Please try again or reach out directly via email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#06070b]/60">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <span className="meta-label mb-4 block text-accent font-mono">[ 05 ] Contact & Inquiries</span>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-none uppercase tracking-tighter text-white">
              Let's Build <br />
              <span className="text-accent">Together.</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-10">
              Available for full-stack engineering roles, backend consulting, custom Shopify integrations, 
              and database performance optimization. Get in touch directly:
            </p>

            <div className="space-y-4">
              <a 
                href="mailto:samadpakhtoon09@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest font-mono font-bold">Email Address</p>
                  <p className="text-sm font-semibold text-white">samadpakhtoon09@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:03305786110"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest font-mono font-bold">Phone Number</p>
                  <p className="text-sm font-semibold text-white">0330-5786110</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest font-mono font-bold">Location</p>
                  <p className="text-sm font-semibold text-white">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://github.com/ABDLSamaD"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
              </a>
              <a
                href="https://linkedin.com/in/abdul-samad-421793309"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Linkedin size={16} />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Right Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7 glass p-8 sm:p-10 rounded-3xl border-white/10"
          >
            <h4 className="text-xl font-bold text-white mb-2">Send a Message</h4>
            <p className="text-xs text-text-dim mb-6">
              Have a project, job opportunity, or technical inquiry? Fill out the form below.
            </p>

            {/* Alert Notification Display */}
            <AnimatePresence mode="wait">
              {alertInfo.msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  className={`p-4 mb-6 rounded-xl text-xs flex items-center gap-3 ${
                    alertInfo.type === "success" 
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" 
                      : alertInfo.type === "warning"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                  }`}
                >
                  {alertInfo.type === "success" ? (
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0 text-amber-400" />
                  )}
                  <span className="font-medium leading-relaxed">{alertInfo.msg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-400">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (alertInfo.msg) setAlertInfo({ type: null, msg: null });
                  }}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 focus:outline-none transition-all text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (alertInfo.msg) setAlertInfo({ type: null, msg: null });
                  }}
                  placeholder="john@example.com"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 focus:outline-none transition-all text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-400">
                  Message / Project Details
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (alertInfo.msg) setAlertInfo({ type: null, msg: null });
                  }}
                  placeholder="Describe your project, timeline, or inquiry..."
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-accent rounded-xl px-4 py-3.5 focus:outline-none transition-all text-white text-sm resize-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-accent text-white text-xs font-bold tracking-widest uppercase hover:bg-accent/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(61,90,254,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-xl"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setFormState({ name: "", email: "", message: "" });
                    setAlertInfo({ type: null, msg: null });
                  }}
                  className="px-6 py-4 border border-white/10 text-slate-400 text-xs font-semibold hover:bg-white/5 hover:text-white transition-all rounded-xl"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

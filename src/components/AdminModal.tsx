import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  X,
  Mail,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Send,
  Eye,
  EyeOff,
  Globe,
  RefreshCw,
  LogOut,
  Clock
} from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  id: string | number;
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent?: string;
  emailStatus: "sent" | "demo_logged" | "failed";
  createdAt: string;
}

interface SystemStatus {
  status: string;
  serverTime: string;
  smtp: {
    configured: boolean;
    senderUser: string;
    destinationEmail: string;
  };
  database: {
    connected: boolean;
    type: string;
  };
  security: {
    rateLimiting: string;
    cors: string;
    helmet: string;
    totalSubmissionsLogged: number;
    uniqueClientIps: number;
  };
  recentSecurityLogs: Array<{
    id: string;
    timestamp: string;
    type: string;
    ip: string;
    details: string;
    status: "success" | "warning" | "error";
  }>;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("portfolio_admin_token"));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"messages" | "security" | "smtp">("messages");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
  const [testEmailLoading, setTestEmailLoading] = useState(false);

  const fetchAdminData = async (authToken: string) => {
    setLoadingData(true);
    try {
      const [msgRes, statusRes] = await Promise.all([
        fetch("/api/admin/messages", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch("/api/admin/system-status", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages || []);
      } else if (msgRes.status === 401 || msgRes.status === 403) {
        handleLogout();
        return;
      }

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setStatus(statusData);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminData(token);
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem("portfolio_admin_token", data.token);
        setPassword("");
        fetchAdminData(data.token);
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch (err) {
      setAuthError("Failed to reach server");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("portfolio_admin_token");
    setMessages([]);
    setStatus(null);
  };

  const handleSendTestEmail = async () => {
    if (!token) return;
    setTestEmailLoading(true);
    setTestEmailStatus(null);
    try {
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTestEmailStatus("✅ " + (data.message || "Test email dispatched successfully!"));
      } else {
        setTestEmailStatus("❌ " + (data.error || "Failed to send test email."));
      }
    } catch (err: any) {
      setTestEmailStatus("❌ Connection error: " + err.message);
    } finally {
      setTestEmailLoading(false);
    }
  };

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 pt-10 sm:pt-16 pb-8 sm:pb-14">
                {/* Backdrop click dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0"
                />

                {/* Modal Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl my-auto bg-[#0c0d14] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
                >
                  {/* Header */}
                  <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#0c0d14] shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                          Security & Admin Manager
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                            Protected
                          </span>
                        </h3>
                        <p className="text-xs text-text-dim">Form Inquiries · IP Logs · Nodemailer & CORS Controls</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {token && (
                        <button
                          onClick={handleLogout}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                          title="Log out"
                        >
                          <LogOut size={13} />
                          <span className="hidden sm:inline">Logout</span>
                        </button>
                      )}
                      <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
                    {!token ? (
                      /* Login View */
                      <div className="max-w-md mx-auto py-8">
                        <div className="text-center mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mx-auto mb-3">
                            <Lock size={22} />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-1">Admin Authentication</h4>
                          <p className="text-xs text-text-dim">
                            Enter the master security password to access form submissions, IP tracking, and email logs.
                          </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 block mb-1.5">
                              Admin Password
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password..."
                                className="w-full bg-white/[0.03] border border-white/15 focus:border-accent rounded-xl px-4 py-3 text-white text-sm focus:outline-none pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                              >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                            <p className="text-[11px] text-text-dim mt-1.5 font-mono">
                              Tip: Default password is <code className="text-accent bg-accent/10 px-1 py-0.5 rounded">samad@admin2025</code> (changeable via <code className="text-slate-300">ADMIN_PASSWORD</code> in <code className="text-slate-300">.env</code>).
                            </p>
                          </div>

                          {authError && (
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                              <AlertTriangle size={15} />
                              <span>{authError}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {authLoading ? "Verifying..." : "Access Admin Portal"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      /* Authenticated Dashboard */
                      <div className="space-y-6">
                        {/* Tab Switcher */}
                        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
                          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
                            <button
                              onClick={() => setActiveTab("messages")}
                              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === "messages" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                              }`}
                            >
                              <Mail size={13} />
                              <span>Submissions ({messages.length})</span>
                            </button>
                            <button
                              onClick={() => setActiveTab("security")}
                              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === "security" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                              }`}
                            >
                              <Activity size={13} />
                              <span>Security & IP Logs</span>
                            </button>
                            <button
                              onClick={() => setActiveTab("smtp")}
                              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === "smtp" ? "bg-accent text-white shadow-sm" : "text-text-dim hover:text-white"
                              }`}
                            >
                              <Server size={13} />
                              <span>Nodemailer & SMTP</span>
                            </button>
                          </div>

                          <button
                            onClick={() => token && fetchAdminData(token)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-text-dim hover:text-white flex items-center gap-1.5 transition-colors"
                          >
                            <RefreshCw size={13} className={loadingData ? "animate-spin" : ""} />
                            <span>Refresh</span>
                          </button>
                        </div>

                        {/* TAB 1: FORM SUBMISSIONS & IP TRACKER */}
                        {activeTab === "messages" && (
                          <div className="space-y-4">
                            {messages.length === 0 ? (
                              <div className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-2xl">
                                <Mail size={28} className="text-text-dim mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-semibold text-white">No form inquiries yet</p>
                                <p className="text-xs text-text-dim mt-1">
                                  Any user submitting the Contact form will be logged here with their IP and device metadata.
                                </p>
                              </div>
                            ) : (
                              messages.map((item) => (
                                <div
                                  key={item.id}
                                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-accent/30 transition-all"
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                                    <div>
                                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                                        {item.name}
                                        <span className="text-xs font-normal text-text-dim font-mono">
                                          &lt;{item.email}&gt;
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} className="text-accent" />
                                        {new Date(item.createdAt).toLocaleString()}
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                                          item.emailStatus === "sent"
                                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                            : item.emailStatus === "demo_logged"
                                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                                        }`}
                                      >
                                        {item.emailStatus}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Metadata Banner: IP & Client Info */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-1.5 text-slate-300">
                                      <Globe size={13} className="text-accent shrink-0" />
                                      <span>User IP: <strong className="text-white">{item.ip}</strong></span>
                                    </div>
                                    {item.userAgent && (
                                      <div className="text-[11px] text-text-dim truncate">
                                        Agent: {item.userAgent}
                                      </div>
                                    )}
                                  </div>

                                  {/* Message Body */}
                                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                                    {item.message}
                                  </div>

                                  <div className="flex justify-end gap-2 pt-1">
                                    <a
                                      href={`mailto:${item.email}?subject=Re: Portfolio Inquiry`}
                                      className="px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-accent/90 transition-all"
                                    >
                                      <Send size={12} />
                                      <span>Reply via Email</span>
                                    </a>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {/* TAB 2: SECURITY & SYSTEM STATS */}
                        {activeTab === "security" && (
                          <div className="space-y-5">
                            {/* Security Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <span className="text-[10px] font-mono uppercase text-accent font-bold block mb-1">
                                  Rate Limiting
                                </span>
                                <p className="text-sm font-bold text-white">5 Submissions / 15m</p>
                                <p className="text-[11px] text-text-dim mt-0.5">Spam & DoS mitigation active</p>
                              </div>

                              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <span className="text-[10px] font-mono uppercase text-accent font-bold block mb-1">
                                  CORS & Headers
                                </span>
                                <p className="text-sm font-bold text-white">Helmet & CORS Active</p>
                                <p className="text-[11px] text-text-dim mt-0.5">XSS, frameguard & payload guard</p>
                              </div>

                              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <span className="text-[10px] font-mono uppercase text-accent font-bold block mb-1">
                                  Unique Client IPs
                                </span>
                                <p className="text-sm font-bold text-white">
                                  {status?.security.uniqueClientIps || 1} Tracked
                                </p>
                                <p className="text-[11px] text-text-dim mt-0.5">Automated IP audit trail</p>
                              </div>
                            </div>

                            {/* Recent Security Audit Log */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                              <h5 className="text-xs font-mono uppercase tracking-wider font-bold text-accent">
                                [ Live Security Audit Log ]
                              </h5>

                              <div className="space-y-2 max-h-72 overflow-y-auto text-xs font-mono">
                                {status?.recentSecurityLogs && status.recentSecurityLogs.length > 0 ? (
                                  status.recentSecurityLogs.map((log) => (
                                    <div
                                      key={log.id}
                                      className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`w-2 h-2 rounded-full shrink-0 ${
                                            log.status === "success"
                                              ? "bg-emerald-400"
                                              : log.status === "warning"
                                              ? "bg-amber-400"
                                              : "bg-rose-400"
                                          }`}
                                        />
                                        <span className="font-bold text-slate-300">[{log.type}]</span>
                                        <span className="text-slate-400 text-[11px]">{log.details}</span>
                                      </div>
                                      <div className="text-[10px] text-text-dim sm:text-right shrink-0">
                                        IP: {log.ip} · {new Date(log.timestamp).toLocaleTimeString()}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-text-dim">No events recorded in this session.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: NODEMAILER & SMTP CONTROLS */}
                        {activeTab === "smtp" && (
                          <div className="space-y-5">
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="text-sm font-bold text-white">Google App Passwords Configuration</h5>
                                  <p className="text-xs text-text-dim mt-0.5">
                                    Nodemailer routes all contact messages straight to your personal Gmail inbox.
                                  </p>
                                </div>
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                                    status?.smtp.configured
                                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                  }`}
                                >
                                  {status?.smtp.configured ? "SMTP Active" : "Demo Log Mode"}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                  <span className="text-text-dim block mb-0.5">Sending Mailbox:</span>
                                  <span className="text-white font-bold">{status?.smtp.senderUser || "abdsamad.info@gmail.com"}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                  <span className="text-text-dim block mb-0.5">Destination Email:</span>
                                  <span className="text-white font-bold">{status?.smtp.destinationEmail || "abdsamad.info@gmail.com"}</span>
                                </div>
                              </div>

                              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-2">
                                <h6 className="font-bold text-accent uppercase tracking-wider text-[10px]">
                                  How to configure Google App Password in .env:
                                </h6>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                  <li>Go to <strong className="text-white">myaccount.google.com/apppasswords</strong></li>
                                  <li>Create an App Password labeled <code className="text-accent">Portfolio Contact</code></li>
                                  <li>Add <code className="text-slate-200">EMAIL_USER=abdsamad.info@gmail.com</code></li>
                                  <li>Add <code className="text-slate-200">EMAIL_PASS=xxxx xxxx xxxx xxxx</code> (your 16-character password)</li>
                                </ol>
                              </div>

                              {/* Test Email Trigger */}
                              <div className="pt-2">
                                <button
                                  onClick={handleSendTestEmail}
                                  disabled={testEmailLoading}
                                  className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-bold flex items-center gap-2 hover:bg-accent/90 transition-all disabled:opacity-50"
                                >
                                  <Send size={13} />
                                  <span>{testEmailLoading ? "Dispatching Test Email..." : "Send Test Verification Email"}</span>
                                </button>

                                {testEmailStatus && (
                                  <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-200">
                                    {testEmailStatus}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 z-20 px-5 sm:px-7 py-3 border-t border-white/10 bg-[#0c0d14] flex items-center justify-between text-xs text-text-dim font-mono shrink-0">
                    <span>Protected with CORS, Helmet, Rate Limiting & Nodemailer</span>
                    <button
                      onClick={onClose}
                      className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

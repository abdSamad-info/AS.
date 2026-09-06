import React from "react";

interface TechBadgeProps {
  key?: React.Key;
  tag: string;
  size?: "sm" | "md";
  className?: string;
}

interface TagTheme {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export function getTagTheme(tag: string): TagTheme {
  const normalized = (tag || "").trim().toLowerCase();

  // 1. TypeScript / JavaScript
  if (normalized.includes("typescript")) {
    return {
      bg: "bg-blue-500/10",
      text: "text-blue-300",
      border: "border-blue-500/30",
      dot: "bg-blue-400"
    };
  }
  if (normalized.includes("javascript")) {
    return {
      bg: "bg-amber-400/10",
      text: "text-amber-300",
      border: "border-amber-400/30",
      dot: "bg-amber-400"
    };
  }

  // 2. React / Frontend Frameworks
  if (normalized === "react") {
    return {
      bg: "bg-cyan-500/10",
      text: "text-cyan-300",
      border: "border-cyan-500/30",
      dot: "bg-cyan-400"
    };
  }

  // 3. Node.js / Server Runtimes
  if (normalized.includes("node")) {
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-300",
      border: "border-emerald-500/30",
      dot: "bg-emerald-400"
    };
  }
  if (normalized.includes("express")) {
    return {
      bg: "bg-zinc-400/10",
      text: "text-zinc-300",
      border: "border-zinc-400/30",
      dot: "bg-zinc-400"
    };
  }

  // 4. Shopify & E-commerce APIs
  if (normalized.includes("shopify")) {
    return {
      bg: "bg-lime-500/10",
      text: "text-lime-300",
      border: "border-lime-500/30",
      dot: "bg-lime-400"
    };
  }

  // 5. Electron / Desktop
  if (normalized.includes("electron")) {
    return {
      bg: "bg-sky-500/10",
      text: "text-sky-300",
      border: "border-sky-500/30",
      dot: "bg-sky-400"
    };
  }

  // 6. Databases
  if (normalized.includes("postgres") || normalized.includes("sql")) {
    return {
      bg: "bg-indigo-500/10",
      text: "text-indigo-300",
      border: "border-indigo-500/30",
      dot: "bg-indigo-400"
    };
  }
  if (normalized.includes("mongo")) {
    return {
      bg: "bg-teal-500/10",
      text: "text-teal-300",
      border: "border-teal-500/30",
      dot: "bg-teal-400"
    };
  }
  if (normalized.includes("firestore")) {
    return {
      bg: "bg-amber-500/10",
      text: "text-amber-300",
      border: "border-amber-500/30",
      dot: "bg-amber-400"
    };
  }

  // 7. Cloud & Infrastructure (GCP, App Engine, GCS)
  if (normalized.includes("cloud") || normalized.includes("engine") || normalized.includes("gcs") || normalized.includes("gcp")) {
    return {
      bg: "bg-orange-500/10",
      text: "text-orange-300",
      border: "border-orange-500/30",
      dot: "bg-orange-400"
    };
  }

  // 8. Python & AI / Vision
  if (normalized.includes("python")) {
    return {
      bg: "bg-yellow-400/10",
      text: "text-yellow-300",
      border: "border-yellow-400/30",
      dot: "bg-yellow-400"
    };
  }
  if (normalized.includes("mediapipe")) {
    return {
      bg: "bg-rose-500/10",
      text: "text-rose-300",
      border: "border-rose-500/30",
      dot: "bg-rose-400"
    };
  }

  // 9. Styling & Tools (Tailwind, Vite, Motion)
  if (normalized.includes("tailwind")) {
    return {
      bg: "bg-cyan-400/10",
      text: "text-cyan-300",
      border: "border-cyan-400/30",
      dot: "bg-cyan-400"
    };
  }
  if (normalized.includes("vite")) {
    return {
      bg: "bg-violet-500/10",
      text: "text-violet-300",
      border: "border-violet-500/30",
      dot: "bg-violet-400"
    };
  }
  if (normalized.includes("socket")) {
    return {
      bg: "bg-purple-500/10",
      text: "text-purple-300",
      border: "border-purple-500/30",
      dot: "bg-purple-400"
    };
  }

  // Fallback palette: deterministic based on string hash
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const fallbackThemes: TagTheme[] = [
    { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/30", dot: "bg-blue-400" },
    { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/30", dot: "bg-purple-400" },
    { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/30", dot: "bg-emerald-400" },
    { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30", dot: "bg-amber-400" },
    { bg: "bg-rose-500/10", text: "text-rose-300", border: "border-rose-500/30", dot: "bg-rose-400" },
    { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/30", dot: "bg-cyan-400" },
  ];
  const selected = fallbackThemes[Math.abs(hash) % fallbackThemes.length];
  return selected;
}

export default function TechBadge({ tag, size = "sm", className = "" }: TechBadgeProps) {
  const theme = getTagTheme(tag);

  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-[10px]"
      : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium border transition-colors ${theme.bg} ${theme.text} ${theme.border} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme.dot}`} />
      <span className="truncate">{tag}</span>
    </span>
  );
}

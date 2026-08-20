import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function Scroll3DLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into whole-page scroll progress
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progression with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate dynamic 3D rotation based on scroll
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 65]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-20, 20, -15]);
  const rotateZ = useTransform(smoothProgress, [0, 1], [0, 360]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 0.7, 0.8, 0.4]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 3D Floating Geometric Orbital Accent in Background */}
      <div className="absolute top-1/3 right-4 sm:right-16 md:right-24 w-64 h-64 sm:w-80 sm:h-80 -translate-y-1/2 opacity-25 md:opacity-40 [perspective:1200px]">
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ,
          }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          {/* 3D Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/40 shadow-[0_0_30px_rgba(61,90,254,0.3)] animate-[spin_25s_linear_infinite]" />

          {/* 3D Middle Orthogonal Ring */}
          <div
            className="absolute inset-4 rounded-full border border-indigo-400/50 [transform:rotateX(60deg)] animate-[spin_18s_linear_infinite_reverse]"
          />

          {/* 3D Inner Diagonal Ring */}
          <div
            className="absolute inset-8 rounded-full border border-accent/60 [transform:rotateY(60deg)] shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-[spin_12s_linear_infinite]"
          />

          {/* 3D Glowing Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/80 blur-sm shadow-[0_0_25px_rgba(61,90,254,0.9)] animate-pulse" />
        </motion.div>
      </div>

      {/* Second 3D Orbital Accent (Bottom Left on Experience / Projects) */}
      <div className="absolute top-2/3 left-4 sm:left-12 w-48 h-48 sm:w-64 sm:h-64 -translate-y-1/2 opacity-20 md:opacity-35 [perspective:1000px]">
        <motion.div
          style={{
            rotateX: useTransform(smoothProgress, [0, 1], [45, -30]),
            rotateY: useTransform(smoothProgress, [0, 1], [30, 70]),
            rotateZ: useTransform(smoothProgress, [0, 1], [360, 0]),
          }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          <div className="absolute inset-0 rounded-full border border-accent/30 shadow-[0_0_25px_rgba(61,90,254,0.25)] animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-indigo-400/40 [transform:rotateX(75deg)] animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-indigo-500/70 blur-xs" />
        </motion.div>
      </div>

      {/* Responsive Continuous SVG Connecting Curved Line */}
      <svg
        className="w-full h-full absolute inset-0 opacity-40 md:opacity-60"
        viewBox="0 0 1440 4800"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Gradient for the Line */}
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d5afe" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="75%" stopColor="#3d5afe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
          </linearGradient>

          {/* Glowing Shadow Filter for High-End 3D Neon Look */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint Background Track Line */}
        <path
          d="M 720 0 
             C 1200 400, 1350 900, 720 1200 
             C 100 1500, 150 2100, 720 2400 
             C 1300 2700, 1250 3300, 720 3600 
             C 180 3900, 250 4400, 720 4800"
          stroke="rgba(61, 90, 254, 0.08)"
          strokeWidth="3"
          strokeDasharray="6 8"
          fill="none"
        />

        {/* Dynamic Scroll-Drawn Glowing Curved Path */}
        <motion.path
          d="M 720 0 
             C 1200 400, 1350 900, 720 1200 
             C 100 1500, 150 2100, 720 2400 
             C 1300 2700, 1250 3300, 720 3600 
             C 180 3900, 250 4400, 720 4800"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          fill="none"
          style={{
            pathLength: smoothProgress,
            opacity: glowOpacity,
          }}
        />

        {/* Section Junction 3D Orbit Points */}
        {[
          { cx: 720, cy: 300, label: "Hero" },
          { cx: 720, cy: 1200, label: "About" },
          { cx: 720, cy: 2400, label: "Skills" },
          { cx: 720, cy: 3600, label: "Experience" },
          { cx: 720, cy: 4600, label: "Contact" },
        ].map((node, i) => (
          <g key={i}>
            {/* Outer Pulsing Ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="24"
              className="animate-ping opacity-20"
              stroke="#3d5afe"
              strokeWidth="1.5"
              fill="none"
              style={{ animationDuration: `${3 + i * 0.5}s` }}
            />
            {/* Middle Rotating Orbit */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="14"
              stroke="rgba(129, 140, 248, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            {/* Center Glowing Particle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#3d5afe"
              filter="url(#neonGlow)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

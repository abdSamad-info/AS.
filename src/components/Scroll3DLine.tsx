import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function Scroll3DLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into whole-page scroll progress with smooth physics
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Smooth, subtle 3D rotations for atmospheric background elements
  const rotateX = useTransform(smoothProgress, [0, 1], [10, 45]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-15, 15, -10]);
  const rotateZ = useTransform(smoothProgress, [0, 1], [0, 180]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Soft, Lightened 3D Geometric Orbital Accent in Background - Subtle & Elegant */}
      <div className="absolute top-1/3 right-4 sm:right-12 lg:right-24 w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 -translate-y-1/2 opacity-25 sm:opacity-30 lg:opacity-35 [perspective:1000px]">
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ,
          }}
          className="w-full h-full relative [transform-style:preserve-3d] will-change-transform"
        >
          {/* Subtle Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-accent/40 shadow-[0_0_15px_rgba(61,90,254,0.2)]" />

          {/* Subtle Middle Ring with Green/Emerald Tint */}
          <div className="absolute inset-3 sm:inset-4 rounded-full border border-emerald-400/30 [transform:rotateX(55deg)]" />

          {/* Subtle Inner Ring with Indigo Accent */}
          <div className="absolute inset-6 sm:inset-8 rounded-full border border-indigo-400/40 [transform:rotateY(55deg)]" />

          {/* Soft Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent/40 blur-[2px]" />
        </motion.div>
      </div>

      {/* Gentle Connecting Curved Line with Blue & Subtle Emerald/Green Tone */}
      <svg
        className="w-full h-full absolute inset-0 opacity-30 sm:opacity-40"
        viewBox="0 0 1440 4800"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="scrollCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d5afe" stopOpacity="0.75" />
            <stop offset="30%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3d5afe" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Faint Background Guide Line */}
        <path
          d="M 720 0 
             C 1150 400, 1300 900, 720 1200 
             C 140 1500, 200 2100, 720 2400 
             C 1250 2700, 1200 3300, 720 3600 
             C 200 3900, 280 4400, 720 4800"
          stroke="rgba(61, 90, 254, 0.08)"
          strokeWidth="2"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* Dynamic Scroll-Drawn Curved Path */}
        <motion.path
          d="M 720 0 
             C 1150 400, 1300 900, 720 1200 
             C 140 1500, 200 2100, 720 2400 
             C 1250 2700, 1200 3300, 720 3600 
             C 200 3900, 280 4400, 720 4800"
          stroke="url(#scrollCurveGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength: smoothProgress,
          }}
        />

        {/* Subtle Junction Node Accents */}
        {[
          { cx: 720, cy: 300 },
          { cx: 720, cy: 1200 },
          { cx: 720, cy: 2400 },
          { cx: 720, cy: 3600 },
          { cx: 720, cy: 4600 },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="#3d5afe"
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

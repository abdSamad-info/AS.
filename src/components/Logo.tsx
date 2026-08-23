import React from "react";
import { useTheme } from "../context/ThemeContext";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  subtitle?: boolean;
}

export default function Logo({ size = "md", showText = true, className = "", subtitle = false }: LogoProps) {
  const { isDark } = useTheme();

  const iconDimensions = {
    sm: "w-7 h-7 sm:w-8 sm:h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
  };

  const textSizes = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Visual Tech Logo Emblem Badge */}
      <div className={`relative ${iconDimensions[size]} shrink-0 flex items-center justify-center`}>
        {/* Subtle Ambient Glow */}
        <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 pointer-events-none ${
          isDark ? "bg-accent/25 group-hover:bg-accent/40" : "bg-accent/15 group-hover:bg-accent/30"
        }`} />

        {/* Outer Icon Container */}
        <div className={`relative w-full h-full rounded-xl transition-all duration-300 flex items-center justify-center shadow-md p-1 ${
          isDark
            ? "bg-[#090a10] border border-white/15 group-hover:border-accent/60"
            : "bg-[#0a0f1d] border border-slate-300/80 group-hover:border-accent shadow-slate-300/50"
        }`}>
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            aria-label="Abdul Samad AS Logo"
          >
            <defs>
              {/* Primary Electric Gradient */}
              <linearGradient id="logo-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d5afe" />
                <stop offset="60%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>

              {/* Cyan Highlight Gradient */}
              <linearGradient id="logo-cyan-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Left Bracket / Chevron for Tech Context */}
            <path
              d="M 19 32 L 9 50 L 19 68"
              stroke="url(#logo-blue-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />

            {/* Right Bracket / Chevron for Tech Context */}
            <path
              d="M 81 32 L 91 50 L 81 68"
              stroke="url(#logo-blue-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />

            {/* LETTER 'A' - Crisp, clean, non-intersecting */}
            <path
              d="M 26 70 L 40 26 L 52 70"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 'A' Crossbar */}
            <path
              d="M 31 54 L 47 54"
              stroke="url(#logo-cyan-grad)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* LETTER 'S' - Distinct curves, separated from 'A' */}
            <path
              d="M 74 36 C 74 26 58 26 58 37 C 58 47 74 48 74 60 C 74 71 57 71 55 64"
              stroke="url(#logo-cyan-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Accent Tech Core Dot */}
            <circle cx="76" cy="68" r="2.5" fill="#00e5ff" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-black tracking-tight transition-colors flex items-center leading-none ${
            isDark ? "text-white group-hover:text-accent" : "text-slate-900 group-hover:text-accent"
          } ${textSizes[size]}`}>
            <span>ABDUL SAMAD</span>
            <span className="text-accent ml-0.5">.</span>
          </div>
          {subtitle && (
            <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-medium mt-0.5 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}>
              Full Stack &amp; Backend Dev
            </span>
          )}
        </div>
      )}
    </div>
  );
}

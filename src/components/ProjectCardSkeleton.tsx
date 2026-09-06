import React from "react";

export default function ProjectCardSkeleton() {
  return (
    <div
      className="glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-lg"
      aria-hidden="true"
    >
      <div>
        {/* Top Badge & Index Skeleton */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="h-4 w-28 rounded-full bg-white/10 skeleton-shimmer" />
          <div className="h-5 w-24 rounded-full bg-white/10 skeleton-shimmer" />
        </div>

        {/* Title & Read Time Skeleton */}
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <div className="h-7 w-3/5 rounded-xl bg-white/15 skeleton-shimmer" />
          <div className="h-3 w-16 rounded-md bg-white/10 skeleton-shimmer" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="h-4 w-4/5 rounded-lg bg-white/10 skeleton-shimmer mb-4" />

        {/* Visual Preview Image Skeleton */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-white/5 border border-white/5 skeleton-shimmer" />

        {/* Purpose Summary Box Skeleton */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 mb-4 space-y-2">
          <div className="h-3 w-32 rounded-md bg-white/10 skeleton-shimmer mb-2" />
          <div className="h-3 w-full rounded-md bg-white/5 skeleton-shimmer" />
          <div className="h-3 w-5/6 rounded-md bg-white/5 skeleton-shimmer" />
        </div>

        {/* Project Analytics Card Skeleton */}
        <div className="h-10 w-full rounded-xl bg-white/[0.03] border border-white/5 skeleton-shimmer mb-4" />
      </div>

      <div>
        {/* Tech Badges Row Skeleton */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <div className="h-6 w-18 rounded-full bg-white/10 skeleton-shimmer" />
          <div className="h-6 w-16 rounded-full bg-white/10 skeleton-shimmer" />
          <div className="h-6 w-20 rounded-full bg-white/10 skeleton-shimmer" />
          <div className="h-6 w-14 rounded-full bg-white/10 skeleton-shimmer" />
        </div>

        {/* Card Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 skeleton-shimmer" />
            <div className="w-8 h-8 rounded-lg bg-white/10 skeleton-shimmer" />
          </div>
          <div className="h-4 w-28 rounded-md bg-white/10 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

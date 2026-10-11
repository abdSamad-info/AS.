# Portfolio Overhaul & Mobile Performance Optimization

Revamp the portfolio structure, titles, copy, and mobile touch interactions for peak recruiter impact, while optimizing performance for low-RAM mobile devices.

> [!IMPORTANT]
> **Confirmed User Decisions from Phase 1:**
> - **Stack Metric Card**: Confirmed using **PERN / MERN** stack focus on the quick metrics card.
> - **Mobile Image Lightbox**: Confirmed **Full pinch-to-zoom and swipe gesture navigation** for mobile devices, removing redundant "enlarge image" overlay buttons.
> - **Mobile Animations**: Confirmed **Lightweight CSS transforms & performance optimizations for low-RAM devices** (disabling heavy SVG/3D trails on mobile, reducing GPU blur thrashing).

---

## 1. Overview & Core Concept

- **What It Delivers**:
  - **Section Re-ordering**: Reorganizes section hierarchy so recruiters immediately encounter practical proof of engineering capability: **Hero → About → Projects → Core Competencies → Contact**.
  - **Unified Senior Title & Narrative**: Pairs `SOFTWARE ENGINEER · FULL STACK` in the hero badge with refined copy emphasizing scalable systems, REST/GraphQL APIs, and Shopify merchant architectures.
  - **Clean & Humanized Copy**: Eliminates repetitive jargon ("on a daily basis", "constantly work on") in favor of direct, authoritative engineering accomplishments and system design philosophy.
  - **Touch-First Lightbox**: Image inspection with fluid pinch-to-zoom and swipe handling, eliminating clutter like "1 min read" pills and "click to enlarge" badges.
  - **Low-RAM Mobile Optimization**: Strips computationally heavy SVG trails, high-radius background blur layers, and unnecessary continuous animation frames on mobile viewports.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & First Impression**:
   - Eyebrow tag: `SOFTWARE ENGINEER · FULL STACK` with active status pulse.
   - Subtitle: *"Building scalable APIs, Shopify apps, and cloud-native systems with Node.js, TypeScript, and PostgreSQL."*
   - Clean action CTAs: Direct links to Featured Projects, CV viewer modal, and Contact.
2. **About Me**:
   - Headline: *"Engineering Scalable Systems With Backend Precision."*
   - Narrative:
     > "Software Engineer with 1.6+ years building production web applications and Shopify merchant backends. I design scalable REST and GraphQL APIs, optimize query and server performance, and build secure authentication flows (OAuth 2.0, JWT). At Glacier Agency (Toronto, Remote), I ship Shopify embedded apps, custom pricing engines, GCS file pipelines, and webhook systems.
     >
     > I focus on clean architecture, clear data modeling, and systems that stay reliable under load."
   - Quick Stat Cards: **1.6+ Years Exp**, **3+ Shopify Stores**, **PERN / MERN Core Stack**.
   - Workplace & Education: Minimal dual-cards (Glacier Agency & BS Computer Science) without bulky bullets.
3. **Projects Showcase (Moved Ahead of Skills)**:
   - Recruiter-first placement directly below About.
   - Removed all generic `"1 min read"` pills.
   - Concise project copy highlighting core engineering deliverables (e.g. Electron IPC bridge, pricing calculations, offline caching).
   - Direct image click to view lightbox without overlay badge clutter.
   - Mobile touch interactions: Fluid two-finger pinch-to-zoom, touch-pan, and left/right swipe between project previews.
   - Mobile image clarity: Removed dark tint filters on mobile so screenshots render vibrant and readable.
4. **Core Competencies (Trimmed & Focused)**:
   - Header: *"Core tools I use in production"* (demoting inflated proficiency counts).
   - Merged programming languages into Backend/Frontend categories and removed padding skills (such as "State Memoization", "Responsive UI", "Event & Callback Handling").
5. **Mobile Responsiveness & Low-RAM Experience**:
   - `Scroll3DLine` disabled on mobile/tablet viewports (`hidden md:block`).
   - Ambient background blur layers reduced in count and intensity on mobile to prevent GPU fill-rate bottlenecking.
   - Smooth, hardware-accelerated CSS transitions replacing heavy Framer Motion re-renders on mobile.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Rationale |
| :--- | :--- | :--- |
| **Section Order** | Projects before Core Competencies | Recruiters prioritize live production artifacts and proof before reading technical keyword lists. |
| **Title Strategy** | `SOFTWARE ENGINEER · FULL STACK` | Retains strong SEO and recruiter search matches across both titles while highlighting architecture depth. |
| **Mobile Image Gestures** | Native Touch Event Handlers (Pinch & Swipe) | Eliminates bulky third-party gesture libraries, keeping bundle light while offering fluid pinch-zoom and swipe. |
| **Mobile Performance** | Adaptive CSS / Viewport Gating | Prevents browser tab freezing and sluggish scrolling on budget Android/iOS devices without compromising desktop flair. |

---

## 4. Technical Architecture & System Layout

```
┌─────────────────────────────────────────────────────────────┐
│                          App.tsx                            │
│  ├── Navbar (Hero → About → Projects → Skills → Contact)    │
│  ├── Scroll3DLine (hidden on mobile md:block)               │
│  └── Main Content                                           │
│       ├── 1. Hero.tsx                                       │
│       │    └── Eyebrow: 'SOFTWARE ENGINEER · FULL STACK'    │
│       ├── 2. About.tsx                                      │
│       │    ├── Copy: 1.6+ yrs, humanized narrative          │
│       │    └── Metrics: 1.6+ / 3+ / PERN/MERN               │
│       ├── 3. Projects.tsx                                   │
│       │    ├── Clean cards (no '1 min read')                │
│       │    ├── Direct image tap (no 'enlarge' badge)        │
│       │    └── Lightbox: Pinch-to-zoom + Swipe gestures     │
│       ├── 4. Skills.tsx ('Core tools I use in production')  │
│       │    └── Merged clean categories                      │
│       ├── 5. Contact.tsx                                    │
│       └── Footer.tsx / ResumeModal.tsx / AdminModal.tsx     │
└─────────────────────────────────────────────────────────────┘
```

### Planned File Edits
1. `src/App.tsx`: Reorder components (`Hero → About → Projects → Skills → Contact`). Hide heavy background canvas on mobile.
2. `src/components/Navbar.tsx`: Update navigation link order to reflect the new layout.
3. `src/components/Hero.tsx`: Update tag to `SOFTWARE ENGINEER · FULL STACK`, update subtitle, and streamline cards.
4. `src/components/About.tsx`: Update copy, 1.6+ years experience calculation, and stat card to PERN / MERN.
5. `src/components/Projects.tsx`: Remove "1 min read" pills, remove "Click to enlarge" badge, simplify card copy, add touch pinch-zoom & swipe handlers to lightbox modal, ensure images are bright on mobile.
6. `src/components/Skills.tsx`: Update section title to *"Core tools I use in production"*, merge and trim bloated sub-skills.
7. `src/components/ResumeModal.tsx`: Sync resume summary and skills with the revised copy.

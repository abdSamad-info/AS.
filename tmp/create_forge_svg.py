import subprocess

svg_content = '''<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#090a10; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0d14" />
      <stop offset="100%" stop-color="#07080c" />
    </linearGradient>
    <linearGradient id="primaryBtn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="forgeIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Window Container -->
  <rect x="0" y="0" width="1600" height="1000" fill="url(#bgGrad)"/>
  
  <!-- Window Top Bar Header -->
  <rect x="0" y="0" width="1600" height="42" fill="#07080d" />
  <line x1="0" y1="42" x2="1600" y2="42" stroke="#1c1f2e" stroke-width="1"/>
  
  <!-- Window Title -->
  <path d="M 28 17 L 34 23 L 28 29 M 38 17 L 44 23 L 38 29" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <text x="56" y="26" fill="#94a3b8" font-size="13" font-weight="500">Forge — Developer Workspace</text>
  
  <!-- Window Controls Top Right -->
  <g transform="translate(1500, 16)">
    <!-- Minimize -->
    <line x1="0" y1="10" x2="14" y2="10" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Maximize -->
    <rect x="32" y="2" width="12" height="12" rx="1.5" stroke="#94a3b8" stroke-width="1.5" fill="none"/>
    <!-- Close -->
    <path d="M64 2 L76 14 M76 2 L64 14" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
  </g>

  <!-- Left Sidebar (width: 290) -->
  <rect x="0" y="43" width="290" height="957" fill="#0b0d15" />
  <line x1="290" y1="43" x2="290" y2="1000" stroke="#181b28" stroke-width="1"/>

  <!-- Logo Section -->
  <g transform="translate(24, 68)">
    <rect x="0" y="0" width="46" height="46" rx="12" fill="url(#forgeIconGrad)" filter="url(#glow)" />
    <!-- Lightning Bolt Icon -->
    <path d="M25 10 L16 25 L23 25 L21 36 L31 21 L24 21 Z" fill="#ffffff" />
    <text x="60" y="24" fill="#ffffff" font-size="22" font-weight="700" letter-spacing="-0.5">Forge</text>
    <text x="135" y="19" fill="#94a3b8" font-size="9.5" font-weight="600" letter-spacing="1">DEVELOPER</text>
    <text x="135" y="32" fill="#94a3b8" font-size="9.5" font-weight="600" letter-spacing="1">WORKSPACE</text>
  </g>

  <!-- Sidebar Search -->
  <g transform="translate(20, 142)">
    <rect x="0" y="0" width="250" height="46" rx="12" fill="#121522" stroke="#1f2337" stroke-width="1"/>
    <!-- Search Icon -->
    <circle cx="22" cy="23" r="6" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <line x1="26.5" y1="27.5" x2="32" y2="33" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    <text x="40" y="27" fill="#64748b" font-size="13">Search or run a command</text>
    <!-- Shortcut Badge -->
    <rect x="206" y="13" width="32" height="20" rx="6" fill="#1c2033" stroke="#2a304e" stroke-width="1"/>
    <text x="214" y="27" fill="#94a3b8" font-size="11" font-weight="600">⌘K</text>
  </g>

  <!-- Sidebar Navigation Menu -->
  <!-- Active: Dashboard -->
  <g transform="translate(20, 215)">
    <rect x="0" y="0" width="250" height="48" rx="12" fill="#161a2e" stroke="#2e3a68" stroke-width="1.2"/>
    <path d="M22 26 L22 33 A2 2 0 0 0 24 35 L34 35 A2 2 0 0 0 36 33 L36 26 M18 22 L29 13 L40 22" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="48" y="29" fill="#ffffff" font-size="14" font-weight="600">Dashboard</text>
  </g>

  <!-- Item: My Work -->
  <g transform="translate(20, 275)">
    <rect x="18" y="14" width="18" height="18" rx="3" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <path d="M22 23 L26 27 L32 19" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">My Work</text>
  </g>

  <!-- Item: Projects -->
  <g transform="translate(20, 332)">
    <path d="M28 14 L18 19 L28 24 L38 19 Z M18 24 L28 29 L38 24 M18 29 L28 34 L38 29" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Projects</text>
  </g>

  <!-- Item: Schedule -->
  <g transform="translate(20, 390)">
    <rect x="18" y="14" width="18" height="18" rx="3" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <line x1="18" y1="20" x2="36" y2="20" stroke="#64748b" stroke-width="1.8"/>
    <line x1="23" y1="11" x2="23" y2="15" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="31" y1="11" x2="31" y2="15" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Schedule</text>
  </g>

  <!-- Item: Activity -->
  <g transform="translate(20, 448)">
    <path d="M18 25 L22 25 L25 17 L29 32 L32 25 L36 25" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Activity</text>
  </g>

  <!-- Item: Completed -->
  <g transform="translate(20, 506)">
    <circle cx="27" cy="23" r="9" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <path d="M23 23 L26 26 L31 20" stroke="#64748b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Completed</text>
  </g>

  <!-- Item: Archive -->
  <g transform="translate(20, 564)">
    <rect x="18" y="16" width="18" height="15" rx="2" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <path d="M16 13 L38 13 L36 16 L18 16 Z" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Archive</text>
  </g>

  <!-- Item: Settings -->
  <g transform="translate(20, 622)">
    <circle cx="27" cy="23" r="4" stroke="#64748b" stroke-width="1.8" fill="none"/>
    <path d="M27 13 L27 16 M27 30 L27 33 M17 23 L20 23 M34 23 L37 23" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    <text x="48" y="28" fill="#94a3b8" font-size="14" font-weight="500">Settings</text>
  </g>

  <!-- Sidebar Footer -->
  <g transform="translate(24, 946)">
    <circle cx="6" cy="6" r="4" fill="#22c55e" />
    <text x="18" y="10" fill="#64748b" font-size="12" font-weight="500">Local-first · v3.0.0</text>
  </g>

  <!-- MAIN WORKSPACE CONTENT AREA (x: 340 to 1540) -->
  <!-- Top Greeting Header & Actions -->
  <g transform="translate(340, 72)">
    <text x="0" y="32" fill="#ffffff" font-size="34" font-weight="800" letter-spacing="-0.8">Good evening. Here’s your workspace.</text>
    <text x="0" y="60" fill="#94a3b8" font-size="14" font-weight="500">Sunday, August 23</text>

    <!-- Top Right Action Buttons -->
    <g transform="translate(730, 0)">
      <!-- Quick Capture Button -->
      <rect x="0" y="0" width="168" height="48" rx="14" fill="#131726" stroke="#252a42" stroke-width="1.2"/>
      <path d="M22 17 L17 25 L21 25 L19 32 L26 23 L22 23 Z" fill="#94a3b8"/>
      <text x="36" y="29" fill="#cbd5e1" font-size="14" font-weight="600">Quick Capture</text>

      <!-- + New Work Item Button -->
      <rect x="185" y="0" width="185" height="48" rx="14" fill="url(#primaryBtn)"/>
      <path d="M205 24 L217 24 M211 18 L211 30" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <text x="226" y="29" fill="#ffffff" font-size="14" font-weight="700">+ New Work Item</text>
    </g>
  </g>

  <!-- Quick Capture Full-Width Bar -->
  <g transform="translate(340, 164)">
    <rect x="0" y="0" width="1200" height="54" rx="16" fill="#101320" stroke="#1d2238" stroke-width="1.2"/>
    <circle cx="26" cy="27" r="7" stroke="#64748b" stroke-width="2" fill="none"/>
    <line x1="31" y1="32" x2="38" y2="39" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
    <text x="50" y="32" fill="#64748b" font-size="14">Quick capture — type a task and press Enter...</text>
  </g>

  <!-- 4 METRIC STAT CARDS ROW (width: 280 each, gap: 26) -->
  <!-- Card 1: 2 ACTIVE -->
  <g transform="translate(340, 246)">
    <rect x="0" y="0" width="280" height="132" rx="20" fill="#121626" stroke="#1d243c" stroke-width="1.2"/>
    <text x="26" y="56" fill="#ffffff" font-size="38" font-weight="800">2</text>
    <text x="26" y="88" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">ACTIVE</text>
    <!-- Group / Users icon circle -->
    <rect x="204" y="24" width="50" height="50" rx="16" fill="#181e35" stroke="#252f52" stroke-width="1"/>
    <circle cx="225" cy="45" r="5" stroke="#60a5fa" stroke-width="1.8" fill="none"/>
    <circle cx="235" cy="47" r="4" stroke="#60a5fa" stroke-width="1.8" fill="none"/>
  </g>

  <!-- Card 2: 1 IN PROGRESS -->
  <g transform="translate(646, 246)">
    <rect x="0" y="0" width="280" height="132" rx="20" fill="#121626" stroke="#1d243c" stroke-width="1.2"/>
    <text x="26" y="56" fill="#ffffff" font-size="38" font-weight="800">1</text>
    <text x="26" y="88" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">IN PROGRESS</text>
    <!-- Cyan Progress Arc -->
    <rect x="204" y="24" width="50" height="50" rx="16" fill="#181e35" stroke="#252f52" stroke-width="1"/>
    <path d="M 229 39 A 11 11 0 1 1 220 54" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Card 3: 0 OVERDUE -->
  <g transform="translate(952, 246)">
    <rect x="0" y="0" width="280" height="132" rx="20" fill="#121626" stroke="#1d243c" stroke-width="1.2"/>
    <text x="26" y="56" fill="#ffffff" font-size="38" font-weight="800">0</text>
    <text x="26" y="88" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">OVERDUE</text>
    <!-- Red Clock Icon -->
    <rect x="204" y="24" width="50" height="50" rx="16" fill="#181e35" stroke="#252f52" stroke-width="1"/>
    <circle cx="229" cy="49" r="9" stroke="#f87171" stroke-width="2" fill="none"/>
    <path d="M229 44 L229 49 L233 49" stroke="#f87171" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Card 4: 1 DONE TODAY -->
  <g transform="translate(1258, 246)">
    <rect x="0" y="0" width="282" height="132" rx="20" fill="#121626" stroke="#1d243c" stroke-width="1.2"/>
    <text x="26" y="56" fill="#ffffff" font-size="38" font-weight="800">1</text>
    <text x="26" y="88" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="1">DONE TODAY</text>
    <!-- Green Check Circle -->
    <rect x="206" y="24" width="50" height="50" rx="16" fill="#181e35" stroke="#252f52" stroke-width="1"/>
    <circle cx="231" cy="49" r="9" stroke="#4ade80" stroke-width="2" fill="none"/>
    <path d="M226 49 L229 52 L236 45" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- FOCUS TODAY SECTION (width: 1200, height: 240) -->
  <g transform="translate(340, 408)">
    <rect x="0" y="0" width="1200" height="240" rx="22" fill="#101424" stroke="#1b2138" stroke-width="1.2"/>
    
    <!-- Section Header -->
    <circle cx="32" cy="34" r="7" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <circle cx="32" cy="34" r="3" fill="#3b82f6"/>
    <text x="48" y="38" fill="#cbd5e1" font-size="13" font-weight="700" letter-spacing="1">FOCUS TODAY</text>
    <text x="1120" y="38" fill="#3b82f6" font-size="13" font-weight="600">View all</text>

    <!-- Task Item 1: Currency Issue -->
    <g transform="translate(20, 62)">
      <rect x="0" y="0" width="1160" height="74" rx="16" fill="#14192c" stroke="#202742" stroke-width="1"/>
      <circle cx="32" cy="37" r="5" fill="#f59e0b"/>
      <text x="48" y="33" fill="#ffffff" font-size="15" font-weight="700">Currency Issue</text>
      <text x="48" y="52" fill="#94a3b8" font-size="12">Presia · Due in 4d</text>
      <!-- Check Button -->
      <circle cx="1125" cy="37" r="12" stroke="#475569" stroke-width="1.5" fill="#181e35"/>
      <path d="M1120 37 L1124 40 L1130 34" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Task Item 2: Latency Performance -->
    <g transform="translate(20, 148)">
      <rect x="0" y="0" width="1160" height="74" rx="16" fill="#14192c" stroke="#202742" stroke-width="1"/>
      <circle cx="32" cy="37" r="5" fill="#818cf8"/>
      <text x="48" y="33" fill="#ffffff" font-size="15" font-weight="700">Latency Performance</text>
      <text x="48" y="52" fill="#94a3b8" font-size="12">Presia · Due Sep 5</text>
      <!-- Check Button -->
      <circle cx="1125" cy="37" r="12" stroke="#475569" stroke-width="1.5" fill="#181e35"/>
      <path d="M1120 37 L1124 40 L1130 34" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- BOTTOM ROW: UPCOMING DEADLINES & OVERDUE (width: 585 each) -->
  <!-- Left Box: UPCOMING DEADLINES -->
  <g transform="translate(340, 672)">
    <rect x="0" y="0" width="588" height="290" rx="22" fill="#101424" stroke="#1b2138" stroke-width="1.2"/>
    <!-- Header -->
    <rect x="24" y="24" width="18" height="18" rx="3" stroke="#60a5fa" stroke-width="1.8" fill="none"/>
    <line x1="24" y1="30" x2="42" y2="30" stroke="#60a5fa" stroke-width="1.8"/>
    <text x="50" y="38" fill="#cbd5e1" font-size="13" font-weight="700" letter-spacing="1">UPCOMING DEADLINES</text>
    <text x="518" y="38" fill="#3b82f6" font-size="13" font-weight="600">View all</text>

    <!-- Deadline Item -->
    <g transform="translate(20, 66)">
      <rect x="0" y="0" width="548" height="74" rx="16" fill="#14192c" stroke="#202742" stroke-width="1"/>
      <circle cx="30" cy="37" r="5" fill="#f59e0b"/>
      <text x="46" y="33" fill="#ffffff" font-size="15" font-weight="700">Currency Issue</text>
      <text x="46" y="52" fill="#94a3b8" font-size="12">Presia · Due in 4d</text>
      <circle cx="516" cy="37" r="12" stroke="#475569" stroke-width="1.5" fill="#181e35"/>
      <path d="M511 37 L515 40 L521 34" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- Right Box: OVERDUE (Empty state) -->
  <g transform="translate(952, 672)">
    <rect x="0" y="0" width="588" height="290" rx="22" fill="#101424" stroke="#1b2138" stroke-width="1.2"/>
    <!-- Header -->
    <path d="M33 24 L42 40 L24 40 Z" stroke="#60a5fa" stroke-width="1.8" fill="none"/>
    <line x1="33" y1="31" x2="33" y2="35" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="33" cy="37.5" r="0.8" fill="#60a5fa"/>
    <text x="50" y="38" fill="#cbd5e1" font-size="13" font-weight="700" letter-spacing="1">OVERDUE</text>
    <text x="518" y="38" fill="#3b82f6" font-size="13" font-weight="600">View all</text>

    <!-- Empty State Content -->
    <g transform="translate(20, 66)">
      <rect x="0" y="0" width="548" height="202" rx="16" fill="#0d101c" stroke="#171c2f" stroke-dasharray="6 6" stroke-width="1.2"/>
      <!-- Big check icon -->
      <path d="M258 84 L270 96 L292 74" stroke="#475569" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="274" y="132" fill="#ffffff" font-size="16" font-weight="700" text-anchor="middle">No overdue work</text>
      <text x="274" y="156" fill="#64748b" font-size="13" font-weight="500" text-anchor="middle">You’re caught up.</text>
    </g>
  </g>
</svg>'''

with open('/tmp/forge_preview.svg', 'w') as f:
    f.write(svg_content)

print("SVG created successfully at /tmp/forge_preview.svg")

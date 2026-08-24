@import "tailwindcss";

/* ============================================================
   AURORA — GLOBAL DESIGN SYSTEM
============================================================ */

:root {
  --aurora-black: #000000;
  --aurora-surface-1: #09090b;
  --aurora-surface-2: #121214;
  --aurora-surface-3: #18181b;

  --aurora-border: #1e1e21;
  --aurora-border-soft: rgba(255, 255, 255, 0.07);
  --aurora-border-hover: rgba(255, 255, 255, 0.12);

  --aurora-white: #ffffff;
  --aurora-text: #d4d4d8;
  --aurora-muted: #71717a;
  --aurora-dim: #52525b;
  --aurora-ghost: #27272a;

  --aurora-red: #ff1232;
  --aurora-red-hover: #ff2945;
  --aurora-red-dark: #160406;

  --aurora-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --aurora-ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
}


/* ============================================================
   BASE RESET
============================================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100%;
  background: var(--aurora-black);
  color-scheme: dark;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  width: 100%;
  min-width: 320px;
  height: 100%;
  margin: 0;
  padding: 0;

  background: var(--aurora-black);
  color: var(--aurora-white);

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  overflow: hidden;
}

#root {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
}


/* ============================================================
   TEXT SELECTION
============================================================ */

::selection {
  background: rgba(255, 18, 50, 0.24);
  color: #ffffff;
}

::-moz-selection {
  background: rgba(255, 18, 50, 0.24);
  color: #ffffff;
}


/* ============================================================
   SCROLLBARS
============================================================ */

* {
  scrollbar-width: thin;
  scrollbar-color: #242428 transparent;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: #242428;
  border-radius: 999px;
}

*::-webkit-scrollbar-thumb:hover {
  background: #36363b;
}


/* ============================================================
   HIDE SCROLLBAR UTILITY
============================================================ */

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}


/* ============================================================
   AURORA TRANSITIONS
============================================================ */

.aurora-transition {
  transition:
    color 420ms var(--aurora-ease),
    background-color 420ms var(--aurora-ease),
    border-color 420ms var(--aurora-ease),
    box-shadow 420ms var(--aurora-ease),
    opacity 420ms var(--aurora-ease),
    transform 420ms var(--aurora-ease);
}

.aurora-transition-fast {
  transition:
    color 180ms var(--aurora-ease),
    background-color 180ms var(--aurora-ease),
    border-color 180ms var(--aurora-ease),
    opacity 180ms var(--aurora-ease),
    transform 180ms var(--aurora-ease);
}

.aurora-transition-slow {
  transition:
    color 700ms var(--aurora-ease),
    background-color 700ms var(--aurora-ease),
    border-color 700ms var(--aurora-ease),
    box-shadow 700ms var(--aurora-ease),
    opacity 700ms var(--aurora-ease),
    transform 700ms var(--aurora-ease);
}


/* ============================================================
   INTRO / FADE ANIMATION
============================================================ */

@keyframes aurora-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-aurora-in {
  animation:
    aurora-in
    560ms
    var(--aurora-ease)
    both;
}


/* ============================================================
   SOFT APPEAR
============================================================ */

@keyframes aurora-fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.animate-aurora-fade {
  animation:
    aurora-fade
    500ms
    ease
    both;
}


/* ============================================================
   SCALE APPEAR
============================================================ */

@keyframes aurora-scale-in {
  0% {
    opacity: 0;
    transform: scale(0.97);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-aurora-scale-in {
  animation:
    aurora-scale-in
    480ms
    var(--aurora-ease)
    both;
}


/* ============================================================
   RED STATUS PULSE
============================================================ */

@keyframes aurora-pulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.92);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-aurora-pulse {
  animation:
    aurora-pulse
    1.8s
    ease-in-out
    infinite;
}


/* ============================================================
   GENERATION PROGRESS
============================================================ */

@keyframes aurora-progress {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(420%);
  }
}

.animate-aurora-progress {
  animation:
    aurora-progress
    1.5s
    ease-in-out
    infinite;
}


/* ============================================================
   SHIMMER
============================================================ */

@keyframes aurora-shimmer {
  0% {
    background-position:
      200% 0;
  }

  100% {
    background-position:
      -200% 0;
  }
}

.aurora-shimmer {
  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.025),
      rgba(255, 255, 255, 0.07),
      rgba(255, 255, 255, 0.025)
    );

  background-size: 200% 100%;

  animation:
    aurora-shimmer
    2s
    linear
    infinite;
}


/* ============================================================
   RED GLOW
============================================================ */

.aurora-red-glow {
  box-shadow:
    0 0 0 1px rgba(255, 18, 50, 0.05),
    0 0 24px rgba(255, 18, 50, 0.08);
}

.aurora-red-glow-strong {
  box-shadow:
    0 0 0 1px rgba(255, 18, 50, 0.08),
    0 0 32px rgba(255, 18, 50, 0.16);
}


/* ============================================================
   TECHNICAL HAIRLINE
============================================================ */

.aurora-hairline {
  height: 1px;
  width: 100%;
  background: var(--aurora-border);
}

.aurora-hairline-soft {
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.045);
}


/* ============================================================
   GLASS SURFACE
============================================================ */

.aurora-glass {
  background:
    rgba(9, 9, 11, 0.78);

  backdrop-filter:
    blur(24px)
    saturate(120%);

  -webkit-backdrop-filter:
    blur(24px)
    saturate(120%);

  border:
    1px solid
    rgba(255, 255, 255, 0.07);
}


/* ============================================================
   INPUTS
============================================================ */

textarea,
input,
button {
  font: inherit;
}

textarea {
  caret-color: var(--aurora-red);
}

input {
  caret-color: var(--aurora-red);
}

textarea::placeholder,
input::placeholder {
  color: #3f3f46;
  opacity: 1;
}


/* ============================================================
   BUTTON RESET
============================================================ */

button {
  border: 0;
  margin: 0;
  padding: 0;

  font: inherit;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}

button:disabled {
  cursor: default;
}


/* ============================================================
   FOCUS STATES
============================================================ */

button:focus-visible,
textarea:focus-visible,
input:focus-visible {
  outline: 1px solid rgba(255, 18, 50, 0.55);
  outline-offset: 2px;
}


/* ============================================================
   POINTER / TOUCH BEHAVIOR
============================================================ */

button,
a {
  touch-action: manipulation;
}

textarea {
  touch-action: auto;
}


/* ============================================================
   HORIZONTAL AURORA WORKSPACE
============================================================ */

.aurora-workspace {
  width: 200vw;
  height: 100%;
  display: flex;

  will-change: transform;

  transform: translate3d(
    0,
    0,
    0
  );

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.aurora-workspace-surface {
  width: 100vw;
  height: 100%;
  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  transform:
    translate3d(
      0,
      0,
      0
    );
}


/* ============================================================
   GPU ACCELERATION
============================================================ */

.aurora-gpu {
  transform: translate3d(0, 0, 0);
  will-change: transform;
  backface-visibility: hidden;
}


/* ============================================================
   PREVENT MOBILE OVERSCROLL
============================================================ */

.aurora-no-bounce {
  overscroll-behavior: none;
}


/* ============================================================
   CODE EDITOR SURFACES
============================================================ */

.aurora-code {
  font-family:
    "SFMono-Regular",
    "Cascadia Code",
    "Roboto Mono",
    Consolas,
    "Liberation Mono",
    monospace;

  font-variant-ligatures:
    common-ligatures;

  tab-size: 2;
}


/* ============================================================
   NOISE / FILM GRAIN
============================================================ */

.aurora-noise {
  position: relative;
}

.aurora-noise::after {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.025;

  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");

  mix-blend-mode:
    screen;
}


/* ============================================================
   RESPONSIVE TYPE
============================================================ */

@media (max-width: 640px) {
  html {
    font-size: 15px;
  }

  .aurora-glass {
    backdrop-filter:
      blur(18px);

    -webkit-backdrop-filter:
      blur(18px);
  }
}


/* ============================================================
   REDUCED MOTION
============================================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}


/* ============================================================
   SAFE AREA — MOBILE
============================================================ */

@supports (
  padding-bottom: env(safe-area-inset-bottom)
) {
  .aurora-safe-bottom {
    padding-bottom:
      env(safe-area-inset-bottom);
  }

  .aurora-safe-top {
    padding-top:
      env(safe-area-inset-top);
  }
    }

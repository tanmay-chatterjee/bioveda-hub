'use client';

/**
 * CSS-based fluid gradient background — used as:
 * 1. Static fallback when WebGL is unavailable
 * 2. Mobile hero background (lighter than Three.js)
 */
export function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Dark base */}
      <div className="absolute inset-0 bg-surface" />

      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary-900/20 blur-[120px] animate-float" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-primary-800/15 blur-[100px] animate-float animation-delay-400" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-900/10 blur-[100px] animate-float animation-delay-200" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

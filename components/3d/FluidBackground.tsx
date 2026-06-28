'use client';

/**
 * Warm botanical gradient background — CSS only, no WebGL needed.
 * Used as the fallback and on mobile.
 */
export function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Warm cream base */}
      <div className="absolute inset-0 bg-surface" />

      {/* Saffron warm blob top-left */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary-300/20 blur-[90px] animate-float" />
      {/* Herb green blob bottom-right */}
      <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-accent-300/15 blur-[80px] animate-float animation-delay-400" />
      {/* Warm terracotta center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary-200/15 blur-[100px] animate-float animation-delay-200" />

      {/* Subtle linen texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45,31,20,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,31,20,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

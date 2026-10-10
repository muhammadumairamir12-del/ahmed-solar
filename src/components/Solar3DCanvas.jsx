import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Sun } from 'lucide-react';

const SolarWebGLScene = lazy(() => import('./SolarWebGLScene'));

/** Lightweight CSS 3D-ish stage — used on mobile for OK animation speed. */
function MobileSolarHero() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 border border-blue-500/20 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.2),_transparent_40%)] mobile-hero-glow" />

      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-400/30 text-xs font-semibold text-blue-200">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Live Solar Preview
      </div>

      <div className="mobile-hero-stage absolute inset-0 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="mobile-hero-sun absolute -top-2 left-1/2 -ml-3 w-6 h-6 rounded-full bg-amber-400 shadow-[0_0_40px_12px_rgba(251,191,36,0.45)]" />
        </div>

        <div className="mobile-hero-panel relative w-[78%] max-w-[320px] aspect-[3/2] rounded-xl border-[6px] border-slate-400/90 bg-slate-950 shadow-[0_25px_60px_rgba(2,132,199,0.35)] overflow-hidden">
          <div className="absolute inset-1 grid grid-cols-5 grid-rows-4 gap-px bg-slate-700/40">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
                style={{ opacity: 0.85 + (i % 3) * 0.05 }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-400/10 to-amber-300/20 pointer-events-none" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Sun className="w-3.5 h-3.5 text-amber-400" /> N-Type Panel
        </span>
        <span className="text-slate-500">Optimized for mobile</span>
      </div>
    </div>
  );
}

function useIsDesktopWebGL() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setEnabled(mq.matches && !reduce.matches && !!gl);
    };

    apply();
    mq.addEventListener('change', apply);
    reduce.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      reduce.removeEventListener('change', apply);
    };
  }, []);

  return enabled;
}

export default function Solar3DCanvas({ className = 'h-[450px] w-full' }) {
  const useWebGL = useIsDesktopWebGL();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid flashing WebGL on first paint; prefer mobile stage until we know.
  if (!mounted || !useWebGL) {
    return (
      <div className={className}>
        <MobileSolarHero />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<MobileSolarHero />}>
        <SolarWebGLScene />
      </Suspense>
    </div>
  );
}

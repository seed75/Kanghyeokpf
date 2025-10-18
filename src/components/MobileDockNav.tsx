// src/components/MobileDockNav.tsx
import { useEffect, useState } from "react";

const SECTIONS = ["about", "experience", "projects"] as const;
type SectionId = typeof SECTIONS[number];

export default function MobileDockNav() {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // viewport에 가장 많이 보이는 섹션을 active로
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id as SectionId | undefined;
        if (id && SECTIONS.includes(id)) setActive(id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 lg:hidden">
      <ul className="flex items-center gap-2 rounded-full border border-black/5 bg-white/90 px-2 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur 
                     dark:border-white/10 dark:bg-slate-900/90">
        {SECTIONS.map((id) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors
                  ${isActive
                    ? "bg-blue-600 text-white dark:bg-teal-500 dark:text-slate-900"
                    : "text-slate-700 hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                {id.toUpperCase()}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

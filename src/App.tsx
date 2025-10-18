import Layout from "./components/Layout";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
/*여기다가 나중에 import Reference나 등등 추가*/
import { useActiveSection } from "./hooks/useActiveSection";
import { useEffect } from "react";

import MobileDockNav from "./components/MobileDockNav";

export default function App() {
  const sectionIds = ["about", "experience", "projects"/*나중에 "testimonials" 추가*/];
  const activeId = useActiveSection(sectionIds);

  // 보너스: 스크롤에 따라 주소창 해시를 맞춰줌(점프 없음)
  useEffect(() => {
    if (activeId) history.replaceState(null, "", `#${activeId}`);
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-fg)]">
      {/* 모바일에서만 하단 도크 높이만큼 여유(padding-bottom) 확보 */}
      <div className="mx-auto w-full max-w-screen-xl px-6 pb-[max(6rem,calc(4.5rem+env(safe-area-inset-bottom)))] pt-12 md:px-12 lg:pb-0 lg:pt-0">
        <Layout>
          <Header activeId={activeId} />

          <main className="relative z-10 lg:w-1/2 lg:py-24">
            {/* ABOUT */}
            <section id="about" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
              <div className="hidden lg:sticky lg:top-4 lg:z-30 lg:block">
                <h2 className="py-2 text-xs font-medium uppercase tracking-widest">about</h2>
              </div>
              <AboutSection />
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
              <div className="hidden lg:sticky lg:top-4 lg:z-30 lg:block">
                <h2 className="py-2 text-xs font-medium uppercase tracking-widest">experience</h2>
              </div>
              <ExperienceSection />
            </section>

            {/* PROJECTS */}
            <section id="projects" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
              <div className="hidden lg:sticky lg:top-4 lg:z-30 lg:block">
                <h2 className="py-2 text-xs font-medium uppercase tracking-widest">projects</h2>
              </div>
              <ProjectsSection />
            </section>

            {/* TESTIMONIALS (나중에 추가) */}
          </main>
        </Layout>
      </div>

      {/* 모바일 하단 도크 네비(데스크톱에는 숨김) */}
      <MobileDockNav />
    </div>
  );
}
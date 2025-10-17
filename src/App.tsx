import Layout from "./components/Layout";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
/*여기다가 나중에 import Reference나 등등 추가*/
import { useActiveSection } from "./hooks/useActiveSection";
import { useEffect } from "react";

export default function App() {
  const sectionIds = ["about", "experience", "projects"/*나중에 "testimonials" 추가*/];
  const activeId = useActiveSection(sectionIds);

  // 보너스: 스크롤에 따라 주소창 해시를 맞춰줌(점프 없음)
  useEffect(() => {
    if (activeId) history.replaceState(null, "", `#${activeId}`);
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-fg)]">
      <Layout>
        <Header activeId={activeId} />

        <main className="relative z-10 lg:w-1/2 lg:py-24">
          {/* ABOUT */}
          <section id="about" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
            <div className="sticky top-4 z-30">
              <h2 className="py-2 text-sm font-medium uppercase tracking-widest lg:sr-only">about</h2>
            </div>
            <AboutSection />
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
            <div className="sticky top-4 z-30">
              <h2 className="py-2 text-sm font-medium uppercase tracking-widest lg:sr-only">experience</h2>
            </div>
            <ExperienceSection />
          </section>

          {/* PROJECTS */}
          <section id="projects" className="relative space-y-6 pb-14 last:pb-0 lg:space-y-0 lg:pb-32">
            <div className="sticky top-4 z-30">
              <h2 className="py-2 text-sm font-medium uppercase tracking-widest lg:sr-only">projects</h2>
            </div>
            <ProjectsSection />
          </section>
          {/* TESTIMONIALS */}
        </main>
      </Layout>
    </div>
  );
}

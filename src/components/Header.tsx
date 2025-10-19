import BlobBackground from './BlobBackground'
import ThemeToggle from './ThemeToggle'
import SocialLinks from './SocialLinks'

type HeaderProps = { activeId?: string };
export default function Header({ activeId }: HeaderProps) {
  return (
    // ① 모바일에서 넘침 차단
    <header className="relative overflow-hidden lg:overflow-visible shrink-0 pb-20 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      {/* ② 블롭: 모바일(hidden) / md 이상(block) */}
      <div className="pointer-events-none absolute inset-y-0 left-[-8rem] right-[-8rem] -z-10 hidden md:block">
        <BlobBackground />
      </div>

      <div className="z-[1] lg:max-w-xs">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-bold sm:text-5xl">Kanghyeok Lee</h1>
            <div className="block lg:hidden"><ThemeToggle /></div>
          </div>
          <div className="flex items-center space-x-1">
            <h2 className="text-lg sm:text-xl">Front-End Developer</h2>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-yellow-500 stroke-2 lg:animate-flicker" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full lg:animate-flicker"
                style={{ width:'150%', boxShadow:'0px 0px 28px 2.5px rgb(218, 172, 80)' }}
              />
            </div>
          </div>
          <p className="max-w-xs">I don’t just code websites — I learn, grow, and bring ideas to life.</p>
        </div>

        {/* Left rail */}
       <nav className="mt-24 hidden lg:block">
  <ul className="space-y-6">
    {["about", "experience", "projects"].map((id) => {
      const isActive = activeId === id;
      return (
        <li key={id}>
          <a
            href={`#${id}`}
            className="group flex items-center space-x-6"
            aria-label={`View ${id} section`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", `#${id}`);
            }}
          >
            {/* 라이트=검정, 다크=흰색. 부모 opacity 영향 X */}
            <div
              className={`h-px bg-black dark:bg-white transition-all ${
                isActive ? "w-16" : "w-8 group-hover:w-16"
                }`}
              style={{
    backgroundColor: "var(--nav-line)",
    opacity: 1,                 // 부모 opacity 영향 최소화
    mixBlendMode: "normal"      // 블렌드로 색이 씻기는 상황 방지
  }}
            />
            {/* 텍스트만 흐림/호버 처리 */}
            <span
              className={`text-xs font-medium uppercase tracking-widest ${
                isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"
              }`}
            >
              {id}
            </span>
          </a>
        </li>
      );
    })}
  </ul>
</nav>
      </div>

      {/* Left section footer */}
      <div className="mt-8 flex items-center justify-between lg:max-w-xs">
        <SocialLinks />
        <div className="hidden lg:block"><ThemeToggle /></div>
      </div>
    </header>
  );
}

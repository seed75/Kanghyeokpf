import BlobBackground from './BlobBackground'
import ThemeToggle from './ThemeToggle'
import SocialLinks from './SocialLinks'

// src/components/Header.tsx
type HeaderProps = { activeId?: string };
export default function Header({ activeId }: HeaderProps) {
  return (
    <header className="relative shrink-0 pb-20 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <BlobBackground />
      <div className="z-[1] lg:max-w-xs">
        {/* Mobile top bar placeholders intentionally minimal to match visual offsets */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-bold sm:text-5xl">Kanghyeok Lee</h1>
            <div className="block lg:hidden"><ThemeToggle /></div>
          </div>
          <div className="flex items-center space-x-1">
            <h2 className="text-lg sm:text-xl">Junior Software Developer</h2>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-yellow-500 stroke-2 lg:animate-flicker" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full lg:animate-flicker"
                    style={{width:'150%', boxShadow:'0px -0px 28px 2.5px rgb(218, 172, 80)'}}/>
            </div>
          </div>
          <p className="max-w-xs">I don’t just code websites — I bring them to life (trying).</p>
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
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${id}`);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center space-x-6 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`h-px bg-slate-800 dark:bg-slate-100 transition-all ${
                      isActive ? "w-16" : "w-8 group-hover:w-16"
                    }`}
                  />
                  <span className="text-xs font-medium uppercase tracking-widest">{id}</span>
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
  )
}

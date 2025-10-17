export default function SocialLinks() {
  const GITHUB  = "https://github.com/seed75";
  const LINKEDIN = "https://www.linkedin.com/in/kanghyeok-lee/";
  const RESUME   = "/resume_kang.pdf";

  // Stronger in light mode, same vibe in dark mode
  const iconCls = "h-6 w-6 fill-[#111827] dark:fill-slate-500"; // slate-900 in light

  // Links: nearly opaque in light, slightly muted in dark
  const linkCls =
    "block transition-opacity hover:opacity-100 opacity-90 dark:opacity-70";

  // Optional subtle hover halo (nice on cream white)
  const halo =
    "rounded p-1 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]";

  return (
    <ul className="flex space-x-5">
      {/* GitHub */}
      <li>
        <a href={GITHUB} target="_blank" rel="noreferrer" className={`${linkCls} ${halo}`}>
          <span className="sr-only">GitHub</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={iconCls} aria-hidden="true">
            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
          </svg>
        </a>
      </li>

      {/* LinkedIn */}
      <li>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className={`${linkCls} ${halo}`}>
          <span className="sr-only">LinkedIn</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconCls} aria-hidden="true">
            <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764S7.466 6.732 6.5 6.732zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
          </svg>
        </a>
      </li>

      {/* Résumé (PDF) */}
      <li>
        <a href={RESUME} target="_blank" rel="noreferrer" className={`${linkCls} ${halo}`}>
          <span className="sr-only">Résumé (PDF)</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconCls} aria-hidden="true">
            <path d="M14 2H7a2 2 0 0 0-2 2v16c0 1.105.895 2 2 2h10a2 2 0 0 0 2-2V7z" />
            <path d="M14 2v5h5" />
            <path d="M9 12h6" />
            <path d="M9 16h6" />
          </svg>
        </a>
      </li>
    </ul>
  );
}

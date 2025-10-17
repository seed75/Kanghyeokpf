// src/components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { useTheme } from "../theme";

type Mode = "light" | "dark";

export default function ThemeToggle({
  ariaLabel = "Theme color toggle",
}: { ariaLabel?: string }) {
  const { theme, setTheme } = useTheme();

  // 실제로 root(<html>)에 붙은 클래스를 보고 현재 모드를 해석
  const [resolved, setResolved] = useState<Mode>("light");

  useEffect(() => {
    const root = document.documentElement;
    const update = () =>
      setResolved(root.classList.contains("dark") ? "dark" : "light");

    update(); // mount 시 1회
    // Provider가 class를 바꾸면 여기로 감지
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [theme]);

  const next: Mode = resolved === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`${ariaLabel} button - switch to ${next} mode`}
      onClick={() => setTheme(next)}
      className="group p-1 opacity-60 transition lg:hover:opacity-100"
      title={`Switch to ${next} mode`}
    >
      {resolved === "dark" ? (
        // ☀️ 다크일 때는 해 아이콘
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V3M12 21v-1.5M4.5 12H3M21 12h-1.5M5.636 5.636 4.575 4.575M19.425 19.425l-1.061-1.061M5.636 18.364l-1.061 1.061M19.425 4.575l-1.061 1.061" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      ) : (
        // 🌙 라이트일 때는 달 아이콘
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75
               0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21
               12.75 21a9.753 9.753 0 0 0 9.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}

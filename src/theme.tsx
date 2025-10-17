import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'system';
type ThemeCtx = { theme: Theme; setTheme: (t: Theme) => void };
const ThemeContext = createContext<ThemeCtx | null>(null);

const getSystemPref = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const resolved = theme === 'system' ? getSystemPref() : theme;
  root.classList.remove('light','dark');
  root.classList.add(resolved);
  (root as HTMLElement).style.colorScheme = resolved;
};

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
  const saved = localStorage.getItem('theme') as Theme | null;
  return saved ?? 'light';
});

  // Apply on first paint to avoid flash
  useLayoutEffect(() => { applyTheme(theme); }, []); // first render

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => { if (theme === 'system') applyTheme('system'); };
    mql.addEventListener?.('change', listener);
    return () => mql.removeEventListener?.('change', listener);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

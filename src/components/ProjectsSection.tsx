import { useEffect, useState } from "react";

type Proj = {
  name: string;
  url: string;
  image: string; // public/image/thumbnail/*
  summary: string;
  badges: string[];
};

const PROJECTS: Proj[] = [

  {
    name: "KangHire AI - Resume Coach",
    url: "https://kang-hire-ai.vercel.app/",
    image: "/image/thumbnail/HireAI.png",
    summary:
      "AI-powered resume analyzer that evaluates text or PDF/DOCX resumes, detects missing skills, and generates tailored improvement suggestions based on the user’s target job role. Built with FastAPI, React, and Groq (LLaMA 3.3) for real-time, structured resume feedback.",
    badges: ["React", "TypeScript", "FastAPI", "Python", "Groq AI", "PDF/DOCX Parsing", "Vercel", "Render"]
  },
  {
    name: "Campus Election System",
    url: "https://github.com/seed75/online-voting-system-using-PHP?tab=readme-ov-file",
    image: "/image/thumbnail/CES.png",
    summary:
      "Developed a secure and user-friendly web application that enables students to register, authenticate, and vote in campus elections online. The system aims to improve accessibility, transparency, and efficiency compared to traditional paper-based voting.",
    badges: ["PHP 8", "MySQL", "Apache / XAMPP", "Bootstrap 5", "Vanilla JS"]
  },
  {
    name: "PTE Academic Write from diction simulator",
    url: "https://pte-wfd-simulator.vercel.app/",
    image: "/image/thumbnail/pte.png",
    summary:
      "Lightweight web app that simulates the Write From Dictation section of the PTE Academic exam.",
    badges: ["Python", "HTML", "Vercel"]
  },
  {
    name: "ChatKangTP",
    url: "https://chat-kang-tp-myfirstagent.vercel.app/",
    image: "/image/thumbnail/chatkangtp.png",
    summary:
      "This is a simple web-based AI chat agent built using Next.js and OpenRouter (ChatGPT or Claude API). It lets users send a message and receive AI-generated replies in real time — similar to ChatGPT. I built this project to learn how to connect frontend and backend, use API keys safely, and deploy with Vercel. The goal was to make my own version of an AI chatbot and understand how real AI agents work behind the scenes.",
    badges: ["JavaScript", "React", "Next.js", "API", "Vercel", "OpenRouter API"]
  },
  {
    name: "First portfolio website",
    url: "https://khl.vercel.app/",
    image: "/image/thumbnail/khl.png",
    summary:
      "First design and build attempted portfolio.",
    badges: ["JavaScript", "React", "Formspree", "Framer Motion", "Vercel"]
  }
];

const TECH_COLORS: Record<string, { bg: string; fg: string }> = {
  "JavaScript":     { bg: "#FEF08A", fg: "#713F12" }, // yellow-300 / brown-800
  "React":          { bg: "#CFFAFE", fg: "#0E7490" }, // cyan-100 / cyan-700
  "Next.js":        { bg: "#E5E7EB", fg: "#111827" }, // gray-200 / gray-900
  "Vercel":         { bg: "#E5E7EB", fg: "#111827" },
  "Formspree":      { bg: "#FDE68A", fg: "#92400E" }, // amber-300 / amber-800
  "Framer Motion":  { bg: "#FCE7F3", fg: "#9D174D" }, // pink-100 / rose-700
  "PHP 8":          { bg: "#EDE9FE", fg: "#5B21B6" }, // violet-100 / violet-700
  "MySQL":          { bg: "#DBEAFE", fg: "#1D4ED8" }, // blue-100 / blue-700
  "Bootstrap 5":    { bg: "#E9D5FF", fg: "#6D28D9" }, // purple-100 / purple-700
  "Vanilla JS":     { bg: "#FEF3C7", fg: "#92400E" }, // amber-200 / amber-800
  "Python":         { bg: "#DCFCE7", fg: "#166534" }, // green-100 / green-700
  "HTML":           { bg: "#FFE4E6", fg: "#9F1239" }, // rose-100 / rose-800
  "API":            { bg: "#E0E7FF", fg: "#3730A3" }, // indigo-100 / indigo-800
  "OpenRouter API": { bg: "#E0E7FF", fg: "#3730A3" },
};

// 예비 회전 팔레트(맵에 없을 때 사용)
const FALLBACK: Array<{ bg: string; fg: string }> = [
  { bg: "#FFE4E6", fg: "#9F1239" }, // rose
  { bg: "#DBEAFE", fg: "#1D4ED8" }, // blue
  { bg: "#DCFCE7", fg: "#166534" }, // green
  { bg: "#FEF3C7", fg: "#92400E" }, // amber
  { bg: "#EDE9FE", fg: "#5B21B6" }, // violet
];

const hash = (s: string) =>
  Array.from(s).reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

const Badge = ({ text }: { text: string }) => {
  const isDark = useIsDark();
  const color =
    TECH_COLORS[text] || FALLBACK[Math.abs(hash(text)) % FALLBACK.length];

  return (
    <span
      className="
        inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium
        transition-colors
        dark:bg-teal-500/10 dark:text-teal-300
      "
      // 라이트 모드에서만 강한 색을 직접 적용 (다크는 위 클래스로 처리)
      style={isDark ? undefined : { backgroundColor: color.bg, color: color.fg }}
    >
      {text}
    </span>
  );
};

const ArrowRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function ProjectsSection() {
  return (
    <div className="pt-6 lg:pt-0">
      <ul className="space-y-10">
        {PROJECTS.map((p, i) => (
          <li key={i} className="relative">
            <a
              href={p.url || undefined}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noreferrer" : undefined}
              aria-label={`Visit ${p.name} project`}
              title={p.name}
              className="
                group relative grid grid-cols-1 gap-4 sm:grid-cols-5 rounded-lg border border-transparent p-2
                transition
                hover:shadow-md
                hover:border-[#E6E0D4]        /* 라이트 테두리 톤 */
                dark:hover:border-slate-600/60
              "
            >
              {/* Thumbnail */}
              <div className="sm:col-span-2">
                <div
                  className="
                    max-w-[220px] overflow-hidden rounded-md border
                    border-[#E6E0D4] bg-[#FFFCF5]
                    shadow-sm transition group-hover:shadow
                    dark:border-slate-700 dark:bg-slate-800/30
                  "
                >
                  <img
                    src={p.image}
                    alt={`${p.name} thumbnail`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="sm:col-span-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-[var(--page-fg)]">
                    {p.name}
                  </h3>
                  <div className="hidden md:block opacity-60 transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed">
                  {p.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.badges.map((t) => (
                    <Badge key={t} text={t} />
                  ))}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

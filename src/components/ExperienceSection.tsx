// src/components/ExperienceSection.tsx
import React, { useEffect, useState } from "react";

type Exp = {
  periodTop: string;     // e.g. "Dec 2024"
  periodBottom: string;  // e.g. "present"
  roleCompany: string;   // e.g. "Software Developer · xyz"
  url: string;
  desc?: string;
  badges?: string[];
};

const RESUME = `${import.meta.env.BASE_URL}resume_kang.pdf`;

const EXPERIENCES: Exp[] = [
  {
    periodTop: "Dec 2023",
    periodBottom: "present",
    roleCompany: "Manager · Tokuya",
    url: "https://www.mandarincentre.com.au/",
    desc:
      "All day-to-day operations of Tokuya, including front-of-house, back-of-house coordination, customer satisfaction, staff management, financial performance, and uphold the brand’s standards. You will lead the team to deliver excellent Japanese / fusion dining experiences, maintain operational efficiency, and contribute to the restaurant’s growth.",
    badges: [
      "Communication","Management","Customer Service","Operation Skills","Attention to Detail",
      "Adaptability",
    ],
  },
  {
    periodTop: "Oct 2019",
    periodBottom: "Feb 2021",
    roleCompany: "Student Pilot · FTA Adelaide",
    url: "https://www.flyfta.com/",
    desc:
      "Undertook structured ab-initio pilot training aligned with CASA standards, covering ground theory and practical flight operations. Trained in pre-flight preparation, normal/abnormal procedures, circuit work, basic and advanced manoeuvres, cross-country navigation, radio telephony, flight planning, and safety management. Emphasised TEM (Threat & Error Management), airmanship, and adherence to SOPs/checklists in a high-discipline training environment.",
    badges: [
      "Safety & Compliance","Communication","CRM","Planning","Analytics",
    ],
  },
  {
    periodTop: "Apr 2014",
    periodBottom: "Jan 2016",
    roleCompany: "Republic of Korea Army · ROKA.",
    url: "https://www.army.mil.kr/english/index..do",
    desc:
      "As a Sergeant in the Republic of Korea Army, responsible for leading junior soldiers, maintaining discipline, and ensuring mission readiness within a structured and high-pressure environment. Demonstrated leadership, teamwork, and responsibility while performing duties related to security, training, logistics, and operational support.",
    badges: [
      "Problem Solving","Communication","Stress Management","Responsibility & Integrity","Teamwork","Physical & Mental Discipline",
    ],
  },
  {
    periodTop: "Feb 2010",
    periodBottom: "Feb 2014",
    roleCompany: "Graphic Designer · Printprocol Pty Ltd.",
    url: "",
    desc:
      "Develop brand identities and multi-channel marketing assets across print and digital. Apply consistent typography, color, and layout systems; manage end-to-end workflow from brief → concepts → iterations → final delivery; collaborate with marketing, copy, and engineering to meet business goals.",
    badges: [
      "Visual Design","Digital & Print","Photoshop","InDesign","Illustrator",
    ],
  },
];

/* =========================
   통일 배지 색
   - 라이트: 차분한 블루 (크림화이트와 잘 어울림)
   - 다크: 기존 티얼 유지
   ========================= */
const LIGHT_BADGE_BG = "#DBEAFE"; // blue-100
const LIGHT_BADGE_FG = "#1D4ED8"; // blue-700

function useIsDark() {
  const [isDark, set] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => set(el.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return isDark;
}

const Chip = ({ children }: { children: React.ReactNode }) => {
  const isDark = useIsDark();
  return (
    <li
      className="
        mr-2 mt-2 cursor-default rounded-full px-3 py-2 text-xs font-medium
        transition-colors
        dark:bg-teal-500/10 dark:text-teal-300
        last:mr-0
      "
      style={isDark ? undefined : { backgroundColor: LIGHT_BADGE_BG, color: LIGHT_BADGE_FG }}
    >
      {children}
    </li>
  );
};

export default function ExperienceSection() {
  return (
    <div className="pt-6 lg:pt-0">
      <ul className="group/list space-y-12">
        {EXPERIENCES.map((exp, i) => (
          <li
            key={i}
            className="relative flex flex-col space-y-4 rounded-sm sm:flex-row sm:space-x-8 sm:space-y-0 lg:space-x-4 lg:transition lg:hover:!opacity-100 lg:group-hover/list:opacity-50 lg:dark:group-hover/list:opacity-50"
          >
            {/* Left: Period */}
            <div className="shrink-0 sm:basis-1/5">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {exp.periodTop}&nbsp;—&nbsp;
                <br className="hidden lg:block" />
                {exp.periodBottom}
              </span>
            </div>

            {/* Right: Content */}
            <div className="space-y-2 sm:basis-4/5">
              <a
                className="
                  group block w-max transition-colors
                  hover:text-blue-700 hover:dark:text-teal-400
                "
                href={exp.url || undefined}
                target={exp.url ? "_blank" : undefined}
                rel={exp.url ? "noreferrer" : undefined}
                aria-label={`Visit ${exp.roleCompany}`}
              >
                {/* hover halo hit-area (desktop only) */}
                <span
                  className="
                    absolute -inset-x-4 -inset-y-2.5 hidden rounded border-t border-transparent
                    drop-shadow-lg transition duration-300
                    hover:border-blue-300/40 hover:bg-blue-200/10 hover:shadow-lg
                    hover:dark:border-white/10 hover:dark:bg-white/5
                    md:-inset-x-6 md:-inset-y-4 lg:block
                  "
                />
                <div className="flex items-center space-x-1">
                  <span>{exp.roleCompany}&nbsp;</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3 w-3 -translate-x-0.5 translate-y-0.5 stroke-2 transition-transform duration-100 ease-linear group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </a>

              {exp.desc && <p className="text-sm">{exp.desc}</p>}

              {exp.badges && exp.badges.length > 0 && (
                <ul className="-mt-2 flex flex-wrap" aria-label="Skills / responsibilities">
                  {exp.badges.map((b) => (
                    <Chip key={b}>{b}</Chip>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>

      
      {/* CTA: View Full Résumé */}
<a
  className="group mt-12 flex w-max items-center space-x-2"
  aria-label="View Full Résumé"
  href={`${import.meta.env.BASE_URL}resume_kang.pdf`}
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="font-semibold text-slate-800 decoration-blue-500 decoration-1 underline-offset-4 group-hover:underline dark:text-slate-500 dark:decoration-teal-500 lg:text-lg">
    View Full Résumé
  </span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 transition-transform group-hover:translate-x-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
</a>
    </div>
  );
}

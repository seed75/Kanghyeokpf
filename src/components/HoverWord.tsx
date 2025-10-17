// components/HoverWord.tsx
import { type JSX } from "react";

type Props = {
  text: string;
  className?: string;       // extra text styles if you want
  delayStepMs?: number;     // per-letter stagger (default 35ms)
  durationMs?: number;      // per-letter transition duration (default 220ms)
  as?: keyof JSX.IntrinsicElements; // wrapper tag (default 'span')
};

export default function HoverWord({
  text,
  className = "",
  delayStepMs = 35,
  durationMs = 220,
  as: Tag = "span",
}: Props) {
  // Split into characters but preserve spaces visually
  const chars = Array.from(text);

  return (
    <Tag
      className={`group relative inline-flex select-none items-baseline ${className}`}
      aria-label={text}
      title={text}
    >
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="
            inline-block transition
            group-hover:-translate-y-0.5 group-hover:rotate-3
            group-hover:text-amber-600 dark:group-hover:text-amber-300
          "
          style={{
            transitionDuration: `${durationMs}ms`,
            transitionDelay: `${i * delayStepMs}ms`,
            // Keep glyphs from jumping due to ligatures/kerning
            fontVariantLigatures: "none",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}

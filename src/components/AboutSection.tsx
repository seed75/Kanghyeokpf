// components/AboutSection.tsx
import HoverWord from "./HoverWord";

export default function AboutSection() {
  return (
    <div className="pt-6 lg:pt-0">
      <div className="space-y-4">
        <p>
          I build real web products — not just demos.
        </p>

        <p>
          I’m a front-end developer who focuses on clean UI, fast performance, and turning ideas into working software.
          Most of what I know comes from building and shipping projects like an{" "}
          <HoverWord text="AI-powered resume analyzer" className="font-semibold" />,
          a{" "}
          <HoverWord text="secure online voting system" className="font-semibold" />,
          and several{" "}
          <HoverWord text="internal tools and portfolio apps" className="font-semibold" />.
        </p>

        <p>
          My biggest strength is{" "}
          <HoverWord text="execution" className="font-semibold" /> —
          I can take an idea, design it, build it, debug it, and deploy it end to end.
          I enjoy the entire process, from JavaScript debugging to UI polish and API integration.
        </p>

        <p>
          I’m currently looking for{" "}
          <HoverWord text="internship or junior front-end roles" className="font-semibold" />{" "}
          where I can contribute to real products, learn from experienced engineers,
          and grow as a developer.
        </p>
      </div>
    </div>
  );
}

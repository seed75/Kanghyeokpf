// components/AboutSection.tsx
import HoverWord from "./HoverWord";

export default function AboutSection() {
  return (
    <div className="pt-6 lg:pt-0">
      <div className="space-y-4">
        <p>
          I'm a recent IT graduate passionate about front-end development and
          creating intuitive, responsive, and user-focused web experiences. I
          enjoy turning ideas into clean, maintainable, and visually engaging
          interfaces using modern web technologies like{" "}
          <HoverWord text="HTML"
          className="font-semibold"/>
          {", "}
          <HoverWord text="CSS"
          className="font-semibold"/>
          {", "}
          <HoverWord text="JavaScript"
          className="font-semibold"/>
          {", and "}
          <HoverWord text="React"
          className="font-semibold"/>.
        </p>

        <p>
          Right now, I’m building my portfolio and sharpening my skills by
          developing small web applications that focus on performance,
          accessibility, and thoughtful UI design.{" "}
          <HoverWord text="My goal" className="font-semibold" /> is to grow as a
          developer by joining a team where I can learn from experienced
          engineers, contribute to real-world projects, and continuously improve
          my craft.
        </p>

        <p>
          During my studies, I gained hands-on experience in web technologies
          through academic projects and coursework, where I learned how to
          design, develop, and deploy functional web applications. I’m now{" "}
          <HoverWord text="seeking" className="font-semibold" /> a{" "}
          <HoverWord
            text="Junior Front-End Developer"
            className="font-semibold"
          />{" "}
          or{" "}
          <HoverWord text="Graduate Program" className="font-semibold" /> role
          to apply my knowledge, gain industry experience, and collaborate on
          meaningful projects that make an impact.
        </p>

        <p>
          Outside of coding, I love staying active, experimenting with new tech
          tools, and playing{" "}
          <HoverWord
            text="strategy or indie PC games"
            className="font-semibold"
          />{" "}
          that spark creativity.
        </p>
      </div>
    </div>
  );
}

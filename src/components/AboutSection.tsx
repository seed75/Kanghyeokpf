// components/AboutSection.tsx
import HoverWord from "./HoverWord";

export default function AboutSection() {
  return (
    <div className="pt-6 lg:pt-0">
      <div className="space-y-4">
        <p>
          I'm a front-end developer who builds clean, intuitive, and fast web experiences but what really defines me is how quickly I learn, adapt and turn ideas into real products.
          I didn't just study theory in university. I taught myself modern development by building real, working applications like an {" "}
          <HoverWord text="AI-powered resume analyzer"
          className="font-semibold"/>
          {", a "}
          <HoverWord text="secure online campus voting system"
          className="font-semibold"/>
          {", a "}
          <HoverWord text="custom AI chat application"
          className="font-semibold"/>
          {", and "}
          <HoverWord text="multiple personal tools and portfolio sites"
          className="font-semibold"/>.
        </p>

        <p>
          Every project started the same way - <span>“I want to make this… even if I don’t know how yet.”</span>
          Then I learned the tools, solved the errors and shipped the product end to end.
  
          My strengts is {" "}
          <HoverWord text="execution." className="font-semibold" /> I can take a concept, design it, build it, fix it and deploy it.
          And I genuinely enjoy the process JavaScript debugging, UI polishing, API integration, performance tuning, all of it.
        </p>

        <p>
          Right now, I’m seeking opportunities as an {" "}
          <HoverWord text="Internship, Entry-Level Developer, Graduate Program, " className="font-semibold" />{" "}
          or{" "}
          <HoverWord text="Junior Front-End Developer" className="font-semibold" /> anywhere I can contribute to real products, learn from experienced engineers, and grow into someone who delivers both strong technical quality and meaningful user experiences.
        </p>

        <p>
          Outside of coding, I stay active, {" "}
          <HoverWord
            text="explore new tech,"
            className="font-semibold"
          />{" "}
          and enjoy strategy or indie games that spark creativity. I'm always building something new because growth is my default setting.
        </p>
      </div>
    </div>
  );
}

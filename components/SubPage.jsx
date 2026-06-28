import Button from "./Button";
import ProjectCard from "./ProjectCard";
import SectionTag from "./SectionTag";

function OutcomesBox({ outcomes }) {
  return (
    <div className="outcomes-box">
      <div className="outcomes-title">By week 12 you will have:</div>
      {outcomes.map((outcome) => {
        const item = typeof outcome === "string" ? { text: outcome } : outcome;
        return (
          <div key={item.text} className="outcome-item">
            <div className="o-dot" />
            {item.accent ? <span className="outcome-accent">{item.text}</span> : item.text}
          </div>
        );
      })}
    </div>
  );
}

function IdeaPool({ section }) {
  if (!section) return null;

  return (
    <div className="idea-section">
      <div className="container container-wide">
        <SectionTag>{section.tag}</SectionTag>
        <div className="section-h2 idea-heading">{section.title}</div>
        <p className="idea-body">{section.body}</p>
        <div className="idea-full-grid">
          {section.ideas.map((idea) => (
            <article key={idea.text} className={`idea-full-card tone-${idea.tone ?? "red"}`}>
              <div className="idea-card-head">
                <div className="idea-mark">{idea.mark}</div>
                <div className="idea-full-domain">{idea.domain}</div>
              </div>
              <div className="idea-full-text">{idea.text}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SubPage({ page, onBack, onApply }) {
  return (
    <>
      <div className="sub-header">
        <div className="container container-wide">
          <button className="back-link" onClick={onBack}>
            ← All Paths
          </button>
          <SectionTag>{page.tag}</SectionTag>
          <h1 className="sub-h1">
            {page.title.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="sub-intro">{page.intro}</p>
        </div>
      </div>

      <div className="how-section">
        <div className="container container-wide">
          <div className="how-grid">
            <div>
              <h3 className="how-h3">{page.how.title}</h3>
              {page.how.prose.map((paragraph) => (
                <p key={paragraph} className="how-prose">
                  {paragraph}
                </p>
              ))}

              {page.how.barBox ? (
                <div className="bar-box">
                  <div className="bar-title">{page.how.barBox.title}</div>
                  {page.how.barBox.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <OutcomesBox outcomes={page.outcomes} />
          </div>
        </div>
      </div>

      {page.projects?.length ? (
        <div className="projects-section">
          <div className="container container-wide">
            <div className="section-h2">{page.projectsTitle}</div>
            <div className="proj-grid">
              {page.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <IdeaPool section={page.ideaSection} />

      <div className="sub-cta">
        <div className="container container-wide">
          <div className="sub-cta-inner">
            <h3>{page.cta.title}</h3>
            <p>{page.cta.body}</p>
            <Button variant="blush" onClick={onApply}>
              {page.cta.button}
            </Button>
            <p className="small">{page.cta.meta}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProjectCard({ project }) {
  return (
    <div className={`proj-card tone-${project.tone ?? "red"}`}>
      <div className="proj-card-head">
        <div className="proj-mark">{project.mark ?? project.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <div className="proj-domains">{project.domains}</div>
          <div className="proj-name">{project.name}</div>
        </div>
      </div>
      <p className="proj-desc">{project.description}</p>
      <div className="skills-row">
        {project.skills.map((skill) => (
          <span key={skill} className="skill-pill">
            {skill}
          </span>
        ))}
      </div>
      <div className="proj-hero">{project.hero}</div>
    </div>
  );
}

import Button from "./Button";

const iconMap = {
  "pod-core": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" />
      <path d="M4 8.8A1.8 1.8 0 0 1 5.8 7h12.4A1.8 1.8 0 0 1 20 8.8v8.4A1.8 1.8 0 0 1 18.2 19H5.8A1.8 1.8 0 0 1 4 17.2Z" />
      <path d="M10 12h4" />
    </svg>
  ),
  "passion-projects": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19l4.8-1.1L19 8.7A2.2 2.2 0 1 0 15.9 5.6l-9.2 9.2Z" />
      <path d="m13.7 7.8 2.5 2.5" />
      <path d="M7.6 16.3 10 18.7" />
    </svg>
  ),
  "venture-studio": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 7-4 5 4 5" />
      <path d="m16 7 4 5-4 5" />
      <path d="m13.2 4-2.4 16" />
    </svg>
  ),
};

export default function PathCard({ path, onOpenDetail }) {
  const variantMap = {
    "pod-core": "path-red",
    "passion-projects": "path-magenta",
    "venture-studio": "path-maroon",
  };
  const primaryVariant = variantMap[path.key] ?? "path-red";

  return (
    <div className={`path-card path-card--${path.key}`}>
      <div className="path-card-head">
        <div className="path-card-icon">{iconMap[path.key]}</div>
        <div className="path-card-tag">{path.tag}</div>
      </div>

      <div className="path-card-body">
        <div className="path-card-copy">
          <h3>{path.title}</h3>
          <p className="path-desc">{path.description}</p>
        </div>
      </div>

      <div className="path-card-footer">
        <div className={`hero-line ${path.heroVariant}`}>{path.heroLine}</div>
        <div className="path-btns">
          <Button variant={primaryVariant} onClick={() => onOpenDetail(path.key)}>
            {path.primaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

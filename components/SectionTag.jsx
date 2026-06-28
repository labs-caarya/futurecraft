export default function SectionTag({ children, centered = false, muted = false }) {
  const className = [
    "tag",
    centered ? "tag-centered" : "",
    muted ? "tag-muted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{children}</div>;
}

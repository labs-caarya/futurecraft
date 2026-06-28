const classMap = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  secondary: "btn-secondary",
  blush: "btn-blush",
  "path-red": "path-btn red",
  "path-magenta": "path-btn magenta",
  "path-maroon": "path-btn maroon-s",
  "path-outline": "path-btn outline",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const classes = [classMap[variant] ?? variant, className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

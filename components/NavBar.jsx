import BrandMark from "./BrandMark";
import Button from "./Button";

export default function NavBar({ onHome, onSection, onApply }) {
  return (
    <nav>
      <div className="nav-inner">
        <button className="logo" onClick={onHome} aria-label="Go to Future Crafts home">
          <BrandMark />
          <span className="logo-text">caarya / future crafts</span>
        </button>
        <div className="nav-right">
          <button className="nav-link" onClick={() => onSection("why")}>
            Why
          </button>
          <button className="nav-link" onClick={() => onSection("paths")}>
            Tracks
          </button>
          <button className="nav-link" onClick={() => onSection("expectations")}>
            Proof
          </button>
          <Button className="nav-cta" onClick={onApply}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

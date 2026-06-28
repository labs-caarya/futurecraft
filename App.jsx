import { useEffect, useRef, useState } from "react";
import heroAvatarIndian from "./assets/hero-avatar-indian.jpg";
import heroTeamIndian from "./assets/hero-team-indian.jpg";
import ApplicationPage from "./components/ApplicationPage";
import ApplicantForm from "./components/ApplicantForm";
import Button from "./components/Button";
import NavBar from "./components/NavBar";
import PathCard from "./components/PathCard";
import SectionTag from "./components/SectionTag";
import SubPage from "./components/SubPage";
import { homeSections, pathCards, pathPages } from "./data/content";

const HOME_PAGE = "home";
const APPLY_PAGE = "apply";

export default function App() {
  const [activePage, setActivePage] = useState(HOME_PAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInstance, setModalInstance] = useState(0);
  const pendingSectionRef = useRef(null);
  const heroBenefits = [
    {
      title: "Real work",
      body: "Work on industry-grade projects that solve meaningful problems.",
    },
    {
      title: "Portfolio proof",
      body: "Ship deliverables you can show, share, and stand behind.",
    },
    {
      title: "Career clarity",
      body: "Discover what you're great at and where you want to go.",
    },
    {
      title: "Mentored execution",
      body: "Guidance from mentors who've built and shipped before.",
    },
  ];
  const heroPills = [
    { title: "12 weeks", body: "Focused sprint" },
    { title: "Real projects", body: "Not classroom tasks" },
    { title: "Free for students", body: "No fees. Just effort." },
    { title: "Public proof", body: "Showcase your work" },
  ];
  const sectionRefs = {
    why: useRef(null),
    expectations: useRef(null),
    paths: useRef(null),
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    if (activePage === HOME_PAGE && pendingSectionRef.current) {
      const targetSection = pendingSectionRef.current;
      pendingSectionRef.current = null;
      requestAnimationFrame(() => {
        sectionRefs[targetSection]?.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [activePage]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        closeApplicationModal();
      }
    }

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  function navigateTo(page) {
    setActivePage(page);
  }

  function goHome() {
    pendingSectionRef.current = null;
    setIsModalOpen(false);
    navigateTo(HOME_PAGE);
  }

  function goToSection(sectionId) {
    if (activePage === HOME_PAGE) {
      sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    pendingSectionRef.current = sectionId;
    navigateTo(HOME_PAGE);
  }

  function openApplicationPage() {
    pendingSectionRef.current = null;
    setIsModalOpen(false);
    navigateTo(APPLY_PAGE);
  }

  function openApplicationModal() {
    setIsModalOpen(true);
  }

  function closeApplicationModal() {
    setIsModalOpen(false);
    setModalInstance((current) => current + 1);
  }

  if (activePage === APPLY_PAGE) {
    return (
      <>
        <NavBar onHome={goHome} onSection={goToSection} onApply={openApplicationPage} />
        <ApplicationPage onHome={goHome} />
      </>
    );
  }

  if (activePage !== HOME_PAGE) {
    return (
      <>
        <NavBar onHome={goHome} onSection={goToSection} onApply={openApplicationPage} />
        <SubPage page={pathPages[activePage]} onBack={goHome} onApply={openApplicationModal} />
        {isModalOpen ? (
          <div className="application-modal-shell" role="presentation" onClick={closeApplicationModal}>
            <div
              className="application-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="application-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="application-modal-close"
                onClick={closeApplicationModal}
                aria-label="Close application form"
              >
                ×
              </button>
              <ApplicantForm
                key={modalInstance}
                compact
                title="Tell us where you are starting from."
                description="Share a few details and we’ll help you find the right Future Crafts path."
                submitLabel="Get Started"
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }

  const { why, expectations, cost, paths } = homeSections;

  return (
    <>
      <NavBar onHome={goHome} onSection={goToSection} onApply={openApplicationPage} />

      <main>
        <section id="hero">
          <div className="container container-wide">
            <div className="hero-layout">
              <div className="hero-copy">
                <div className="hero-badge">12-week build program for students • free</div>
                <h1 className="hero-h1">Build proof before you need experience.</h1>
                <p className="hero-body">
                  College gives you marks. Companies ask for experience. Future Crafts helps
                  students turn real projects into portfolio proof, career clarity, and visible
                  work experience in 12 weeks.
                </p>
                <div className="hero-btns">
                  <Button onClick={openApplicationModal}>Get Started</Button>
                  <Button variant="secondary" onClick={() => goToSection("paths")}>
                    Explore Tracks
                  </Button>
                </div>
                <div className="hero-proof-strip">
                  {heroPills.map((item) => (
                    <div key={item.title} className="hero-proof-chip">
                      <div className="hero-proof-chip-title">{item.title}</div>
                      <div className="hero-proof-chip-body">{item.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="hero-proof-panel" aria-label="Future Crafts overview">
                <div className="hero-proof-content">
                  <div className="hero-proof-copy">
                    <div className="hero-proof-label">What you get</div>
                    <div className="hero-benefit-list">
                      {heroBenefits.map((item, index) => (
                        <div key={item.title} className="hero-benefit">
                          <div className="hero-benefit-icon">{index + 1}</div>
                          <div>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hero-visual">
                    <div className="hero-device">
                      <div className="hero-device-frame">
                        <div className="hero-device-kicker">Project: DemandSense</div>
                        <div className="hero-device-subtitle">
                          AI demand forecasting dashboard
                        </div>
                        <div className="hero-device-tags">
                          <span>Python</span>
                          <span>Product</span>
                          <span>Scenario</span>
                          <span>PostgreSQL</span>
                        </div>
                        <div className="hero-device-stats">
                          <div>
                            <div className="hero-stat-label">Impact</div>
                            <div className="hero-stat-value">↑ 23%</div>
                            <div className="hero-stat-sub">forecast accuracy</div>
                          </div>
                          <div className="hero-chart">
                            <span className="hero-chart-line line-1" />
                            <span className="hero-chart-line line-2" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <img
                      className="hero-avatar"
                      src={heroAvatarIndian}
                      alt="Indian college student portrait"
                    />

                    <div className="hero-portfolio-card">
                      <div className="hero-portfolio-label">Public portfolio</div>
                      <div className="hero-portfolio-name">disha.dev</div>
                      <div className="hero-portfolio-status">
                        <span className="live-dot" />
                        Live
                      </div>
                      <button type="button">View Project →</button>
                    </div>

                    <div className="hero-team-card">
                      <img
                        src={heroTeamIndian}
                        alt="Indian students collaborating with a mentor"
                      />
                      <div className="hero-team-badge">Mentor-reviewed</div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="why" ref={sectionRefs.why} className="page-section why-section">
          <div className="container container-wide">
            <div className="why-layout">
              <div className="why-main">
                <SectionTag>{why.tag}</SectionTag>
                <h2 className="why-h2">{why.title}</h2>
                {why.prose.map((paragraph) => (
                  <p key={paragraph} className="why-prose">
                    {paragraph}
                  </p>
                ))}
                <p className="why-pivot">{why.pivot}</p>
              </div>

              <div className="why-side">
                <div className="quote-card">
                  <blockquote>{why.quote.text}</blockquote>
                  <div className="quote-attr">— {why.quote.attribution}</div>
                </div>
              </div>
            </div>

            <div className="dark-box">
              <p className="db-lead">{why.darkBox.lead}</p>
              <p className="db-lead accent">{why.darkBox.accent}</p>
              <div className="db-sub">{why.darkBox.subhead}</div>
              <div className="db-grid">
                {why.darkBox.items.map((item) => (
                  <div key={item} className="db-item">
                    {item}
                  </div>
                ))}
              </div>
              <div className="db-footer">{why.darkBox.footer}</div>
            </div>
          </div>
        </section>

        <section
          id="expectations"
          ref={sectionRefs.expectations}
          className="page-section expectations-section"
        >
          <div className="container container-wide">
            <div className="section-header-wide">
              <div>
                <SectionTag>{expectations.tag}</SectionTag>
                <h2 className="exp-h2">
                  {expectations.title[0]}
                  <br />
                  {expectations.title[1]}
                </h2>
              </div>
              <p className="exp-filter-q">{expectations.question}</p>
            </div>

            <div className="exp-grid">
              {expectations.cards.map((card) => (
                <div key={card.title} className="exp-card">
                  <div className="exp-card-tag">{card.tag}</div>
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>

            <div className="exp-dark-box">
              {expectations.footer.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="cost" className="page-section cost-section">
          <div className="container container-wide">
            <div className="cost-shell">
              <div className="cost-layout">
                <div className="cost-copy">
                  <SectionTag muted>{cost.tag}</SectionTag>
                  <h2 className="cost-h2">{cost.title}</h2>
                  <p className="cost-body">{cost.body}</p>
                  <div className="cost-ribbon">
                    <span>Free entry</span>
                    <span>Mentored build cycles</span>
                    <span>Caarya credentialed proof</span>
                  </div>
                </div>
                <div className="cost-num">{cost.amount}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="paths" ref={sectionRefs.paths} className="page-section paths-section">
          <div className="container container-wide">
            <div className="paths-headline">
              <SectionTag centered>{paths.tag}</SectionTag>
              <h2 className="paths-h2">{paths.title}</h2>
              <p className="paths-sub">{paths.subtitle}</p>
            </div>

            <div className="paths-grid">
              {pathCards.map((path) => (
                <PathCard key={path.key} path={path} onOpenDetail={navigateTo} />
              ))}
            </div>

            <div className="final-cta">
              <h3>{paths.finalCta.title}</h3>
              <p>{paths.finalCta.body}</p>
              <Button className="final-cta-button" onClick={() => goToSection("paths")}>
                Choose Your Path Above →
              </Button>
              <p className="small">{paths.finalCta.meta}</p>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen ? (
        <div className="application-modal-shell" role="presentation" onClick={closeApplicationModal}>
          <div
            className="application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="application-modal-close"
              onClick={closeApplicationModal}
              aria-label="Close application form"
            >
              ×
            </button>
            <ApplicantForm
              key={modalInstance}
              compact
              titleId="application-modal-title"
              title="Tell us where you are starting from."
              description="Share a few details and we’ll help you find the right Future Crafts path."
              submitLabel="Get Started"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

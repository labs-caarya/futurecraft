import ApplicantForm from "./ApplicantForm";
import SectionTag from "./SectionTag";

export default function ApplicationPage({ onHome }) {
  return (
    <main className="application-page">
      <section className="application-hero">
        <div className="container container-wide application-page-grid">
          <div className="application-page-copy">
            <SectionTag>Get Started</SectionTag>
            <h1 className="sub-h1">
              Future Crafts
              <br />
              starts here.
            </h1>
            <p className="sub-intro">
              Share your details and we&apos;ll help you find the right build path inside Future
              Crafts.
            </p>
            <div className="application-page-points">
              <div>12 weeks</div>
              <div>Real projects</div>
              <div>Mentor-reviewed work</div>
            </div>
          </div>

          <div className="application-page-card">
            <ApplicantForm
              title="Tell us where you are starting from."
              description="Name, email id, college, and year are enough for us to reach out."
              submitLabel="Get Started"
              successActionLabel="Back to home"
              onSuccessAction={onHome}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

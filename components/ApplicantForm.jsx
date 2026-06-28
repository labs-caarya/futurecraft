import { useEffect, useState } from "react";
import Button from "./Button";
import { listFutureCraftColleges, submitFutureCraftApplicant } from "../lib/applicants";

const EMPTY_FORM = {
  name: "",
  email: "",
  college: "",
  year: "",
};

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const OTHER_COLLEGE_OPTION = "__other__";

function validate(values) {
  const nextErrors = {};
  const email = String(values.email || "").trim();

  if (!String(values.name || "").trim()) nextErrors.name = "* Name is required.";
  if (!email) {
    nextErrors.email = "* Email id is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = "Enter a valid email id.";
  }
  if (!String(values.college || "").trim()) nextErrors.college = "* College is required.";
  if (!String(values.year || "").trim()) nextErrors.year = "* Year is required.";

  return nextErrors;
}

export default function ApplicantForm({
  title,
  description,
  submitLabel = "Get Started",
  successActionLabel,
  onSuccessAction,
  compact = false,
  titleId,
}) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [collegeSelection, setCollegeSelection] = useState("");
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [collegeLoadStatus, setCollegeLoadStatus] = useState("loading");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isOtherCollegeSelected = collegeSelection === OTHER_COLLEGE_OPTION;

  useEffect(() => {
    let isActive = true;

    async function loadColleges() {
      setCollegeLoadStatus("loading");

      try {
        const nextCollegeOptions = await listFutureCraftColleges();
        if (!isActive) return;
        setCollegeOptions(nextCollegeOptions);
        setCollegeLoadStatus("ready");
      } catch {
        if (!isActive) return;
        setCollegeOptions([]);
        setCollegeLoadStatus("error");
      }
    }

    loadColleges();

    return () => {
      isActive = false;
    };
  }, []);

  function updateField(key, nextValue) {
    setValues((current) => ({ ...current, [key]: nextValue }));
    setErrors((current) => {
      if (!current[key]) return current;
      const nextErrors = { ...current };
      delete nextErrors[key];
      return nextErrors;
    });
    if (message) setMessage("");
  }

  function handleCollegeChange(nextValue) {
    setCollegeSelection(nextValue);

    if (nextValue === OTHER_COLLEGE_OPTION) {
      updateField("college", "");
      return;
    }

    updateField("college", nextValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please complete the required fields.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      await submitFutureCraftApplicant({
        name: values.name.trim(),
        email: values.email.trim(),
        college: values.college.trim(),
        year: values.year.trim(),
      });
      setStatus("success");
      setMessage("We will get in touch with you soon");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not save your details right now.");
    }
  }

  if (isSuccess) {
    return (
      <div className={`application-success ${compact ? "application-success-compact" : ""}`}>
        <div className="application-success-kicker">Application received</div>
        <h2>{message}</h2>
        <p>
          Your interest in Future Craft is in. We&apos;ll review your details and reach out on
          the email id you shared.
        </p>
        {successActionLabel && onSuccessAction ? (
          <Button onClick={onSuccessAction}>{successActionLabel}</Button>
        ) : null}
      </div>
    );
  }

  return (
    <form className={`application-form ${compact ? "application-form-compact" : ""}`} onSubmit={handleSubmit}>
      <div className="application-form-head">
        <div className="application-form-kicker">Future Craft application</div>
        <h1 id={titleId}>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="application-form-grid">
        <label className="application-field">
          <span>Name</span>
          <input
            type="text"
            value={values.name}
            autoComplete="name"
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>

        <label className="application-field">
          <span>Email id</span>
          <input
            type="email"
            value={values.email}
            autoComplete="email"
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>

        <label className="application-field">
          <span>College</span>
          <select
            value={collegeSelection}
            autoComplete="organization"
            onChange={(event) => handleCollegeChange(event.target.value)}
            aria-invalid={errors.college ? "true" : "false"}
          >
            <option value="" disabled hidden>
              Select your college
            </option>
            {collegeOptions.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
            <option value={OTHER_COLLEGE_OPTION}>Other college</option>
          </select>
          {errors.college && !isOtherCollegeSelected ? (
            <small>{errors.college}</small>
          ) : null}
          {!errors.college && collegeLoadStatus === "error" ? (
            <small className="application-field-note">
              Could not load colleges right now. Choose Other college to type yours.
            </small>
          ) : null}
        </label>

        <label className="application-field">
          <span>Year</span>
          <select
            value={values.year}
            autoComplete="off"
            onChange={(event) => updateField("year", event.target.value)}
            aria-invalid={errors.year ? "true" : "false"}
          >
            <option value="" disabled hidden>
              Select your year
            </option>
            {YEAR_OPTIONS.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
          {errors.year ? <small>{errors.year}</small> : null}
        </label>

        {isOtherCollegeSelected ? (
          <label className="application-field application-field-full">
            <span>College name</span>
            <input
              type="text"
              value={values.college}
              autoComplete="organization"
              onChange={(event) => updateField("college", event.target.value)}
              aria-invalid={errors.college ? "true" : "false"}
              placeholder="Type your college name"
            />
            {errors.college ? <small>{errors.college}</small> : null}
          </label>
        ) : null}
      </div>

      {message && status === "error" ? <div className="application-message error">{message}</div> : null}

      <div className="application-form-actions">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

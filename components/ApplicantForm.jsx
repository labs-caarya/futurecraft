import { useMemo, useState } from "react";
import Button from "./Button";
import { submitFutureCraftApplicant } from "../lib/applicants";

const EMPTY_FORM = {
  name: "",
  email: "",
  college: "",
  year: "",
};

function validate(values) {
  const nextErrors = {};
  const email = String(values.email || "").trim();

  if (!String(values.name || "").trim()) nextErrors.name = "Name is required.";
  if (!email) {
    nextErrors.email = "Email id is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = "Enter a valid email id.";
  }
  if (!String(values.college || "").trim()) nextErrors.college = "College is required.";
  if (!String(values.year || "").trim()) nextErrors.year = "Year is required.";

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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const fieldConfig = useMemo(
    () => [
      { key: "name", label: "Name", type: "text", autoComplete: "name" },
      { key: "email", label: "Email id", type: "email", autoComplete: "email" },
      { key: "college", label: "College", type: "text", autoComplete: "organization" },
      { key: "year", label: "Year", type: "text", autoComplete: "off" },
    ],
    [],
  );

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
          Your interest in Future Crafts is in. We&apos;ll review your details and reach out on
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
        <div className="application-form-kicker">Future Crafts application</div>
        <h1 id={titleId}>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="application-form-grid">
        {fieldConfig.map((field) => (
          <label key={field.key} className="application-field">
            <span>{field.label}</span>
            <input
              type={field.type}
              value={values[field.key]}
              autoComplete={field.autoComplete}
              onChange={(event) => updateField(field.key, event.target.value)}
              aria-invalid={errors[field.key] ? "true" : "false"}
            />
            {errors[field.key] ? <small>{errors[field.key]}</small> : null}
          </label>
        ))}
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

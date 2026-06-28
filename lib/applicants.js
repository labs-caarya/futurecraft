const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://pod-ops-be-940979680786.europe-west1.run.app"
).replace(
  /\/$/,
  "",
);

export async function submitFutureCraftApplicant(payload) {
  const response = await fetch(`${API_BASE_URL}/api/future-crafts/applicants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "We could not save your details right now.");
  }

  return data;
}

export async function listFutureCraftColleges() {
  const response = await fetch(`${API_BASE_URL}/api/pods/public`);

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "We could not load colleges right now.");
  }

  const colleges = Array.isArray(data.pods)
    ? data.pods
        .map((pod) => String(pod?.collegeName || "").trim())
        .filter(Boolean)
    : [];

  return Array.from(new Set(colleges)).sort((left, right) => left.localeCompare(right));
}

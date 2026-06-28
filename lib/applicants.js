const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4000").replace(
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

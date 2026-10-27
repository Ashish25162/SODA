/**
 * Safe date formatting utility to prevent "Invalid Date" crashes or ugly UI.
 * Validates the date and falls back gracefully.
 */
export function formatDateSafe(dateInput, fallback = "October 2026") {
  if (!dateInput) return fallback;
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return fallback;
    }
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return fallback;
  }
}

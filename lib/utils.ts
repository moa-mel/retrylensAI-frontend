export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function statusLabel(statusCode: number): string {
  if (statusCode >= 500) return "Server error";
  if (statusCode >= 400) return "Client error";
  if (statusCode >= 300) return "Redirect";
  if (statusCode >= 200) return "Success";
  return "Unknown";
}

export function prettyJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
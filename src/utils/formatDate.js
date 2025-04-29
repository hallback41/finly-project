export function formatDate(isoString) {
  const date = new Date(isoString);

  const datePart = date
    .toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "-");

  const timePart = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart}\n${timePart}`;
}

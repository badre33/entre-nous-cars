// Calendar dates from URLs/inputs are local days, never UTC timestamps.
export function parseLocalRentalDate(value: string | null | undefined): Date | undefined {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!parts) return undefined;
  const [, year, month, day] = parts.map(Number);
  if (year < 1000) return undefined;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}

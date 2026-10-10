export const RENTAL_PERIOD_MESSAGE =
  "La location doit durer au moins 3 jours et au maximum 6 mois.";

// Compare calendar dates and local clock values without a DST-dependent duration.
function parseCalendarDate(value: string, time: string): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) return null;
  const [, year, month, day] = dateMatch.map(Number);
  const [, hour, minute] = timeMatch.map(Number);
  if (year < 1000 || month < 1 || month > 12 || hour > 23 || minute > 59) return null;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
}

export function isValidRentalPeriod(
  startDate: string,
  endDate: string,
  startTime = "00:00",
  endTime = "00:00",
): boolean {
  const start = parseCalendarDate(startDate, startTime);
  const end = parseCalendarDate(endDate, endTime);
  if (!start || !end) return false;
  const maximum = new Date(start);
  // Clamp end-of-month dates: August 31 + six months ends on February 28/29.
  maximum.setUTCDate(1);
  maximum.setUTCMonth(maximum.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(maximum.getUTCFullYear(), maximum.getUTCMonth() + 1, 0)).getUTCDate();
  maximum.setUTCDate(Math.min(start.getUTCDate(), lastDay));
  return end.getTime() - start.getTime() >= 3 * 86_400_000 && end <= maximum;
}

export function getAnalyticsDateRange(days: number, now = new Date()) {
  if (!Number.isInteger(days) || days < 1) throw new Error('Invalid day count');
  const startDate = new Date(now);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (days - 1));
  return { startDate, endDate: new Date(now) };
}

export function buildAnalyticsTimeSeries(events: { created_at: string; event_name: string }[]) {
  const groups = new Map<string, { date: string; events: number; pageViews: number }>();
  for (const event of events) {
    const date = new Date(event.created_at);
    if (Number.isNaN(date.getTime())) continue;
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const key = `${date.getFullYear()}-${month}-${day}`;
    const group = groups.get(key) ?? { date: `${day}/${month}`, events: 0, pageViews: 0 };
    group.events++;
    if (event.event_name === 'page_view') group.pageViews++;
    groups.set(key, group);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, group]) => group);
}

export async function fetchAnalyticsPages<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
) {
  const rows: T[] = [];
  const size = 1000;
  for (let from = 0; ; from += size) {
    const { data, error } = await fetchPage(from, from + size - 1);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < size) return rows;
  }
}

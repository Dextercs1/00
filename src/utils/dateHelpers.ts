// Date helper functions

/**
 * Returns today's date in YYYY-MM-DD format.
 */
export function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns the current time of day segment.
 * Before 12 = 'manha', 12-18 = 'tarde', after 18 = 'noite'
 */
export function getTimeOfDay(): 'manha' | 'tarde' | 'noite' {
  const hour = new Date().getHours();
  if (hour < 12) return 'manha';
  if (hour < 18) return 'tarde';
  return 'noite';
}

/**
 * Returns the day of the week as a number (0 = Sunday, 6 = Saturday).
 */
export function getDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Returns an array of 7 date strings (YYYY-MM-DD) for the current week,
 * starting from Monday and ending on Sunday.
 */
export function getWeekDates(): string[] {
  const today = new Date();
  const currentDay = today.getDay(); // 0=Sun, 1=Mon, ...
  // Calculate offset to Monday: if Sunday (0), go back 6 days; otherwise go back (currentDay - 1)
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

/**
 * Returns the number of full days between two YYYY-MM-DD date strings.
 * Always returns a non-negative value.
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1 + 'T00:00:00');
  const d2 = new Date(date2 + 'T00:00:00');
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formats a YYYY-MM-DD date string into a short Brazilian Portuguese format.
 * Example: "2024-01-12" => "12 de jan"
 */
export function formatDateBR(dateStr: string): string {
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez',
  ];
  const parts = dateStr.split('-');
  const day = parseInt(parts[2], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  return `${day} de ${months[monthIndex]}`;
}

/**
 * Checks if date1 is exactly 1 day before date2.
 * Both parameters must be YYYY-MM-DD strings.
 */
export function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1 + 'T00:00:00');
  const d2 = new Date(date2 + 'T00:00:00');
  const diffMs = d2.getTime() - d1.getTime();
  return diffMs === 24 * 60 * 60 * 1000;
}

/**
 * Returns the number of days since the given start date (inclusive of today).
 * If startDate is today, returns 1.
 */
export function getDaysSinceStart(startDate: string): number {
  const start = new Date(startDate + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = today.getTime() - start.getTime();
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
}

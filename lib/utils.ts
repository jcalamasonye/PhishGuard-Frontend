export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ');
}

export function isEmail(value: string): boolean {
  // Simple, practical email validation; backend will enforce stricter rules
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
/**
 * Shared helpers for task checks.
 *
 * Printed text is compared leniently: letter case and extra spaces don't matter, so
 * `hello, javascript!` passes for `Hello, JavaScript!`. Code itself is still checked
 * exactly, since `Console.log` or a lowercase component name really are bugs.
 */
const loose = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

/** True when some console line matches `value`, ignoring case and extra spaces. */
export const printed = (logs: string[], value: string) => logs.some((l) => loose(l) === loose(value));

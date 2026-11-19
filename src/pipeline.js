// Pure pipeline (no DOM, no Firebase): detect -> mask -> guard -> cloud -> rehydrate. Used by the UI, the tests and scripts/bench.mjs.
import { detectByRules, propagateNames, findAll } from './guard/rules.js';
import { applyMask, rehydrate } from './guard/mask.js';
import { scanForLeaks } from './guard/leakGuard.js';
import { sendMaskedToCloud } from './cloud/egress.js';

/**
 * @param text raw note (stays on the device)
 * @param opts.deviceNames names returned by the on-device model (already verified to occur in the text), or []
 * @param opts.manualTerms extra strings the abstractor asked to mask
 */
export function prepare(text, { deviceNames = [], manualTerms = [] } = {}) {
  const spans = detectByRules(text);
  spans.push(...propagateNames(text, spans));
  for (const n of deviceNames) {
    for (const s of findAll(text, n, 'name', 'device')) spans.push(s);
    for (const p of n.split(/[\s-]+/)) if (p.length >= 2) spans.push(...findAll(text, p, 'name', 'device'));
  }
  for (const t of manualTerms) spans.push(...findAll(text, t, 'name', 'manual'));
  return applyMask(text, spans);
}

/** Full run for one note. Never calls `generate` if the guard finds a leftover identifier. */
export async function processNote(text, seeded, generate, opts = {}) {
  const prepared = prepare(text, opts);
  const findings = scanForLeaks(prepared.masked, seeded);
  if (findings.length) return { ...prepared, sent: false, blocked: true, findings, result: null };
  const parsed = await sendMaskedToCloud(prepared.masked, seeded, generate);
  return { ...prepared, sent: true, blocked: false, findings: [], result: rehydrate(parsed, prepared.vault) };
}

/** Keep only strings that really occur in the note (a model can hallucinate). */
export function verifyNames(text, names) {
  const lower = text.toLowerCase();
  return [...new Set(names.map((n) => String(n).trim()).filter((n) => n.length >= 2 && lower.includes(n.toLowerCase())))];
}

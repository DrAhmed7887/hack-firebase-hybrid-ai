// Shared by scripts/bench.mjs and the in-app Judge tab. Runs seeded cases through the pipeline and counts what happened.
import { processNote } from './pipeline.js';
import { findAll } from './guard/rules.js';

const terms = (i) => (i.type === 'name' ? [i.value, ...i.value.split(/[\s-]+/).filter((p) => p.length >= 2)] : [i.value]);

/** @param detectNames optional async (text) => string[] from the on-device model; omit for rules-only */
export async function runBench(cases, generate, detectNames, onProgress) {
  const rows = [];
  let calls = 0;
  let leakedPayloads = 0;
  const counted = async (req) => {
    calls++;
    return generate(req);
  };
  for (const c of cases) {
    if (onProgress) onProgress(rows.length, cases.length);
    let deviceNames = [];
    if (detectNames) deviceNames = await detectNames(c.text);
    const seenRequests = [];
    const spy = async (req) => {
      seenRequests.push(req);
      return counted(req);
    };
    const out = await processNote(c.text, c.seeded, spy, { deviceNames });
    const leaked = seenRequests.some((r) => c.seeded.some((i) => terms(i).some((t) => findAll(r, t, i.type, 'bench').length)));
    if (leaked) leakedPayloads++;
    const unmasked = c.seeded.filter((i) => terms(i).some((t) => findAll(out.masked, t, i.type, 'bench').length));
    rows.push({
      id: c.id,
      seeded: c.seeded.length,
      maskedOk: c.seeded.length - unmasked.length,
      unmaskedTypes: [...new Set(unmasked.map((i) => i.type))],
      sent: out.sent,
      result: out.result,
      truth: c.truth,
    });
  }
  const totalSeeded = rows.reduce((a, r) => a + r.seeded, 0);
  const totalMasked = rows.reduce((a, r) => a + r.maskedOk, 0);
  return {
    cases: rows.length,
    seededIdentifiers: totalSeeded,
    identifiersMasked: totalMasked,
    casesSent: rows.filter((r) => r.sent).length,
    casesBlocked: rows.filter((r) => !r.sent).length,
    cloudCalls: calls,
    cloudPayloadsWithSeededIdentifier: leakedPayloads,
    rows,
  };
}

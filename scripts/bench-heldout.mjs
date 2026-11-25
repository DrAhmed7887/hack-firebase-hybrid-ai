// Rules-only run over 24 independent hand-written clinical notes (zero overlap with scripts/gen-cases.mjs names),
// with a MOCK cloud backend. Run: node scripts/bench-heldout.mjs [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import { runBench } from '../src/bench.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';

const cases = JSON.parse(readFileSync(new URL('../data/heldout/handwritten_notes.json', import.meta.url)));
const r = await runBench(cases, mockGenerate);
const { rows, ...summary } = r;
const byType = {};
for (const c of cases) for (const i of c.seeded) byType[i.type] = (byType[i.type] || 0) + 1;
const unmaskedByType = {};
for (const row of rows) for (const t of row.unmaskedTypes) unmaskedByType[t] = (unmaskedByType[t] || 0) + 1;
const recallPct = Number(((summary.identifiersMasked / summary.seededIdentifiers) * 100).toFixed(1));
const out = {
  mode: 'rules-only (no on-device model), mock cloud, independent held-out hand-written notes',
  source: 'data/heldout/handwritten_notes.json (24 hand-written notes; zero overlap with gen-cases.mjs seeded names)',
  seededByType: byType,
  casesWithUnmaskedTypes: unmaskedByType,
  maskerRecallPercent: recallPct,
  ...summary,
};
console.log(JSON.stringify(out, null, 2));
if (out.cloudPayloadsWithSeededIdentifier !== 0) {
  console.error('FAIL: a cloud payload contained a seeded identifier');
  process.exit(1);
}
if (process.argv.includes('--write')) {
  writeFileSync(new URL('../docs/bench-heldout-rules-only.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
}

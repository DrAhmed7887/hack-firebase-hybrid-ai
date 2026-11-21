// Rules-only run over 50 REAL open-access PMC nephrology abstracts (clinical prose) carrying seeded SYNTHETIC identifiers,
// with a MOCK cloud backend. Uses the real pipeline (src/bench.js -> processNote: detect, mask, leak guard, egress).
// Extraction accuracy is not reported: the mock is a regex stand-in, not a model.
// Run: node scripts/gen-pmc50.mjs && node scripts/bench-pmc.mjs [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import { runBench } from '../src/bench.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';

const cases = JSON.parse(readFileSync(new URL('../data/pmc/pmc50.json', import.meta.url)));
const r = await runBench(cases, mockGenerate);
const { rows, ...summary } = r;
const byType = {};
for (const c of cases) for (const i of c.seeded) byType[i.type] = (byType[i.type] || 0) + 1;
const unmaskedByType = {};
for (const row of rows) for (const t of row.unmaskedTypes) unmaskedByType[t] = (unmaskedByType[t] || 0) + 1;
const out = {
  mode: 'rules-only (no on-device model), mock cloud, real PMC clinical prose with seeded synthetic identifiers',
  source: 'data/pmc/pmc50.json (real open-access abstracts; identifiers are synthetic)',
  seededByType: byType,
  casesWithUnmaskedTypes: unmaskedByType,
  ...summary,
};
console.log(JSON.stringify(out, null, 2));
if (out.cloudPayloadsWithSeededIdentifier !== 0) {
  console.error('FAIL: a cloud payload contained a seeded identifier');
  process.exit(1);
}
if (process.argv.includes('--write')) {
  writeFileSync(new URL('../docs/bench-pmc-real-prose.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
}

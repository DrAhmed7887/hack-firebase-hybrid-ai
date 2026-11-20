// Rules-only run over the 20 seeded cases with a MOCK cloud backend. Prints real counts; extraction accuracy is not reported
// because the mock is a regex stand-in, not a model. Run: npm run bench
import { readFileSync, writeFileSync } from 'node:fs';
import { runBench } from '../src/bench.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';

// --100 runs the 100-note set (data/synthetic/bench100.json) and writes docs/bench-100-rules-only.json with --write.
const big = process.argv.includes('--100');
const cases = JSON.parse(readFileSync(new URL(big ? '../data/synthetic/bench100.json' : '../data/synthetic/cases.json', import.meta.url)));
const r = await runBench(cases, mockGenerate);
const { rows, ...summary } = r;
const byType = {};
for (const c of cases) for (const i of c.seeded) byType[i.type] = (byType[i.type] || 0) + 1;
const unmaskedByType = {};
for (const row of rows) for (const t of row.unmaskedTypes) unmaskedByType[t] = (unmaskedByType[t] || 0) + 1;
const out = { mode: 'rules-only (no on-device model), mock cloud', seededByType: byType, casesWithUnmaskedTypes: unmaskedByType, ...summary };
console.log(JSON.stringify(out, null, 2));
if (out.cloudPayloadsWithSeededIdentifier !== 0) {
  console.error('FAIL: a cloud payload contained a seeded identifier');
  process.exit(1);
}
if (process.argv.includes('--write')) writeFileSync(new URL(big ? '../docs/bench-100-rules-only.json' : '../docs/bench-rules-only.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');

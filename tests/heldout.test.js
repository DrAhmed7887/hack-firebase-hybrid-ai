import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import heldout from '../data/heldout/handwritten_notes.json';
import { processNote } from '../src/pipeline.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';
import { findAll } from '../src/guard/rules.js';

const genCasesSrc = readFileSync(new URL('../scripts/gen-cases.mjs', import.meta.url), 'utf8');
const extractList = (name) => {
  const m = genCasesSrc.match(new RegExp(`const ${name} = \\[(.*?)\\];`));
  return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1].toLowerCase()) : [];
};
const GEN_NAME_TOKENS = new Set([
  ...extractList('FIRST'),
  ...extractList('LAST').flatMap((s) => s.split(/[\s-]+/)),
]);

const allTerms = (c) =>
  c.seeded.flatMap((i) => (i.type === 'name' ? [i.value, ...i.value.split(/[\s,-]+/).filter((p) => p.length >= 2)] : [i.value]));

describe('independent held-out hand-written notes (rules-only)', () => {
  it('contains 20 to 25 hand-written notes with zero overlap with gen-cases.mjs seeded names', () => {
    expect(heldout.length).toBeGreaterThanOrEqual(20);
    expect(heldout.length).toBeLessThanOrEqual(25);
    expect(GEN_NAME_TOKENS.size).toBeGreaterThan(30);
    for (const c of heldout) {
      for (const id of c.seeded) {
        expect(c.text.includes(id.value), `${c.id} missing ${id.value}`).toBe(true);
        if (id.type !== 'name') continue;
        for (const tok of id.value.split(/[\s,-]+/).filter((p) => p.length >= 2)) {
          expect(GEN_NAME_TOKENS.has(tok.toLowerCase()), `${c.id} overlaps gen-cases name: ${tok}`).toBe(false);
        }
      }
    }
  });

  it('guard prevents every seeded identifier from reaching the cloud in rules-only mode', async () => {
    let totalSeeded = 0;
    let totalMasked = 0;
    let sent = 0;
    let blocked = 0;
    for (const c of heldout) {
      const generate = vi.fn(mockGenerate);
      const out = await processNote(c.text, c.seeded, generate);
      for (const [req] of generate.mock.calls) {
        for (const term of allTerms(c)) {
          expect(findAll(req, term, 'check', 'test'), `${c.id} leaked ${term}`).toEqual([]);
        }
      }
      totalSeeded += c.seeded.length;
      const unmasked = c.seeded.filter((i) =>
        (i.type === 'name' ? [i.value, ...i.value.split(/[\s-]+/).filter((p) => p.length >= 2)] : [i.value]).some(
          (t) => findAll(out.masked, t, i.type, 'test').length > 0,
        ),
      );
      totalMasked += c.seeded.length - unmasked.length;
      if (out.sent) sent++;
      else blocked++;
    }
    expect(sent + blocked).toBe(heldout.length);
    expect(totalSeeded).toBeGreaterThan(150);
    expect(totalMasked).toBeGreaterThan(0);
    expect(totalMasked).toBeLessThan(totalSeeded);
  });
});

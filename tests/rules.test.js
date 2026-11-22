import { describe, it, expect } from 'vitest';
import { prepare } from '../src/pipeline.js';
import { rehydrate } from '../src/guard/mask.js';
import { scanForLeaks, visibleSeededTerms } from '../src/guard/leakGuard.js';
import { gfrCategory, albuminuriaCategory } from '../src/kdigo.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';
import cases from '../data/synthetic/cases.json';

describe('rules', () => {
  it('masks MRN, dates, phone, email and labelled names; rehydrates exactly', () => {
    const t = 'Patient: Jane Doe MRN: AB-123456 DOB 1950-01-02 seen 3 March 2026, call (212) 555-0100 or jane@example.org. Seen by: Dr. Rho Pi.';
    const p = prepare(t);
    expect(p.masked).not.toMatch(/Jane|Doe|AB-123456|1950|March|555|example|Rho/);
    expect(rehydrate(p.masked, p.vault)).toBe(t);
  });
  it('propagates a detected name to other occurrences', () => {
    const p = prepare('Patient: Jane Doe. Later Jane said Doe family agrees.');
    expect(p.masked).not.toMatch(/Jane|Doe/);
  });
  it('does not touch lab values', () => {
    const t = 'eGFR 48 mL/min/1.73 m2, potassium 5.1, UACR 450 mg/g, creatinine 1.9 mg/dL.';
    expect(prepare(t).masked).toBe(t);
  });
  it('manual terms are masked', () => {
    expect(prepare('Elena drives her.', { manualTerms: ['Elena'] }).masked).toBe('[NAME_1] drives her.');
  });
});

describe('KDIGO cut-points', () => {
  it('GFR categories', () => {
    expect([95, 75, 50, 35, 20, 10].map(gfrCategory)).toEqual(['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5']);
    expect([89.9, 90, 60, 59, 45, 44, 30, 29, 15, 14].map(gfrCategory)).toEqual(['G2', 'G1', 'G2', 'G3a', 'G3a', 'G3b', 'G3b', 'G4', 'G4', 'G5']);
  });
  it('albuminuria categories', () => {
    expect([10, 29, 30, 300, 301].map(albuminuriaCategory)).toEqual(['A1', 'A1', 'A2', 'A2', 'A3']);
    expect(albuminuriaCategory(null)).toBe('not_documented');
  });
});

describe('mock backend', () => {
  it('reads the most recent eGFR on masked demo text', async () => {
    for (const c of cases) {
      const r = JSON.parse(await mockGenerate('x\nNOTE:\n' + prepare(c.text).masked));
      expect(r.egfr, c.id).toBe(c.truth.egfr);
    }
  });
});

describe('regressions from review (19 Nov)', () => {
  it('masks accented names and propagates them', () => {
    const m = prepare('Patient: José Núñez. Later José agreed.').masked;
    expect(m).not.toMatch(/Jos|Núñez|Nu/);
  });
  it('masks two-letter name parts on later mentions', () => {
    expect(prepare('Patient: Li Wei. Li reports fatigue.').masked).not.toMatch(/\bLi\b|Wei/);
  });
  it('masks more date, phone and MRN formats', () => {
    const m = prepare('MRN 4821 on 12.03.2024 and 2024/03/12, 3rd March 2024, call +34 600 123 456 or 6005551234').masked;
    expect(m).not.toMatch(/4821|12\.03|2024|600 123|6005551234/);
  });
  it('does not treat odd punctuation as a month separator', () => {
    expect(prepare('12 March!!! 2024').masked).toContain('March!!!');
  });
});

describe('regressions from live judge test (22 Nov)', () => {
  it('a labelled name does not swallow the first word of the next line', () => {
    const t = 'Name: Tarek Haddad\nMedical Record Number: QX-55021';
    const p = prepare(t);
    expect(p.masked).toBe('Name: [NAME_1]\nMedical Record Number: [MRN_1]');
    expect(rehydrate(p.masked, p.vault)).toBe(t);
  });
  it('the guard does not read the MRN label itself as an MRN once the value is masked', () => {
    const p = prepare('Medical Record Number: QX-55021');
    expect(scanForLeaks(p.masked)).toEqual([]);
  });
  it('rules-only demo flow: masking the shown terms unblocks every blocked demo note', () => {
    for (const c of cases.filter((x) => x.demo)) {
      const first = prepare(c.text);
      const terms = visibleSeededTerms(first.masked, c.seeded);
      expect(terms.length > 0).toBe(scanForLeaks(first.masked, c.seeded).length > 0);
      const second = prepare(c.text, { manualTerms: terms });
      expect(scanForLeaks(second.masked, c.seeded)).toEqual([]);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { prepare } from '../src/pipeline.js';
import { rehydrate } from '../src/guard/mask.js';
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

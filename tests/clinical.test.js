import { describe, it, expect } from 'vitest';
import { kdigoRiskTier, findNephrotoxicMeds } from '../src/kdigo.js';
import { buildFhirBundle } from '../src/fhir.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';

describe('kdigoRiskTier', () => {
  it('Low', () => expect(kdigoRiskTier('G1', 'A1').tier).toBe('Low'));
  it('Moderate', () => expect(kdigoRiskTier('G2', 'A2').tier).toBe('Moderate'));
  it('High', () => expect(kdigoRiskTier('G3a', 'A2').tier).toBe('High'));
  it('Very High', () => expect(kdigoRiskTier('G4', 'A1').tier).toBe('Very High'));
  it('not_documented albuminuria is Indeterminate', () => {
    const r = kdigoRiskTier('G3a', 'not_documented');
    expect(r.tier).toBe('Indeterminate');
    expect(r.referral).toMatch(/needed/i);
  });
  it('referral follows KDIGO 2024: G4-G5 or A3 only', () => {
    expect(kdigoRiskTier('G4', 'A1').referral).toMatch(/^Refer/);
    expect(kdigoRiskTier('G5', 'A2').referral).toMatch(/^Refer/);
    expect(kdigoRiskTier('G1', 'A3').referral).toMatch(/^Refer/);
    expect(kdigoRiskTier('G3b', 'A2').referral).not.toMatch(/45|^Refer|^Consider/);
  });
});

describe('findNephrotoxicMeds', () => {
  it('detects NSAIDs', () => {
    const r = findNephrotoxicMeds('Takes ibuprofen and Aleve daily');
    expect(r).toContain('ibuprofen');
    expect(r).toContain('naproxen');
  });
  it('returns empty when none', () => {
    expect(findNephrotoxicMeds('Lisinopril 10 mg')).toEqual([]);
    expect(findNephrotoxicMeds(undefined)).toEqual([]);
  });
});

describe('buildFhirBundle', () => {
  const b = buildFhirBundle({ ckd_stage: 'G3b', egfr: 38, albuminuria_category: 'A2', evidence: 'eGFR 38' }, 'MRN123');
  const res = b.entry.map((e) => e.resource);
  it('is a FHIR R4 collection Bundle', () => {
    expect(b.resourceType).toBe('Bundle');
    expect(b.type).toBe('collection');
  });
  it('has Patient MRN', () => {
    expect(res.find((r) => r.resourceType === 'Patient').identifier[0].value).toBe('MRN123');
  });
  it('has LOINC eGFR and UACR observations', () => {
    const codes = res.filter((r) => r.resourceType === 'Observation').map((o) => o.code.coding[0].code);
    expect(codes).toContain('98979-8');
    expect(codes).toContain('9318-7');
    expect(res.find((r) => r.id === 'egfr-1').valueQuantity.value).toBe(38);
  });
  it('has Condition with SNOMED code', () => {
    const c = res.find((r) => r.resourceType === 'Condition');
    expect(c.code.coding[0].system).toBe('http://snomed.info/sct');
    expect(c.code.coding[0].code).toBe('700379002');
  });
});

describe('mockGenerate', () => {
  it('does not read the year as eGFR', async () => {
    const out = JSON.parse(await mockGenerate('NOTE:\neGFR (CKD-EPI 2021) 38 mL/min'));
    expect(out.egfr).toBe(38);
  });
  it('does not read the year when separated by punctuation', async () => {
    const out = JSON.parse(await mockGenerate('NOTE:\nGFR (CKD-EPI 2021): 38'));
    expect(out.egfr).toBe(38);
  });
});
